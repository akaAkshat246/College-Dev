/**
 * SwachhRoute Delhi - Dynamic Landfill Load Balancer (Feature F4)
 * Multi-objective optimization for selecting optimal dump destination
 * Evaluates: Distance, Weighbridge Queue Wait Times, Spare Daily Capacity, and Methane Alerts.
 */

export class LandfillBalancer {
  constructor(landfillsData, cityGraph) {
    this.landfills = landfillsData || [];
    this.cityGraph = cityGraph;
  }

  /**
   * Selects the optimal landfill for a loaded collection truck
   * @param {String} currentPositionNodeId - Current truck location node ID
   * @param {Number} wastePayloadKg - Weight in kg on board
   * @param {Object} options - Custom weightings and priority overrides
   */
  selectOptimalLandfill(currentPositionNodeId, wastePayloadKg = 4000, options = {}) {
    if (!this.landfills || this.landfills.length === 0) {
      return null;
    }

    const {
      weightDistance = 0.40,
      weightQueue = 0.35,
      weightCapacity = 0.25
    } = options;

    const scoredLandfills = this.landfills.map(lf => {
      // 1. Calculate travel distance & time from current truck node
      let distanceKm = lf.distanceFromDepotKm || 10;
      let driveTimeMinutes = 20;

      if (this.cityGraph && currentPositionNodeId) {
        const route = this.cityGraph.getShortestPath(currentPositionNodeId, lf.id);
        if (route.reachable && route.distance > 0) {
          distanceKm = route.distance;
          driveTimeMinutes = route.durationMinutes;
        }
      }

      // 2. Queue and unloading duration
      const queueWaitMinutes = lf.weighbridgeQueueMinutes || 20;
      const unloadTimeMinutes = lf.avgUnloadTimeMinutes || 12;
      const totalTurnaroundMinutes = Number((driveTimeMinutes + queueWaitMinutes + unloadTimeMinutes).toFixed(1));

      // 3. Capacity utilization ratio (0 - 100)
      const utilization = (lf.currentLoadTons / lf.capacityTonsPerDay) * 100;
      const remainingCapacityTons = lf.capacityTonsPerDay - lf.currentLoadTons;

      // 4. Methane & environmental penalty
      let penalty = 0;
      if (lf.methaneAlert === 'HIGH') penalty += 25;
      if (lf.status === 'NEAR_CAPACITY') penalty += 30;

      // 5. Composite Cost Score (Lower is better)
      const normalizedDistance = (distanceKm / 20) * 100;
      const normalizedQueue = (queueWaitMinutes / 60) * 100;
      const normalizedCapacity = utilization;

      const compositeScore = Number((
        (normalizedDistance * weightDistance) +
        (normalizedQueue * weightQueue) +
        (normalizedCapacity * weightCapacity) +
        penalty
      ).toFixed(2));

      return {
        ...lf,
        distanceFromTruckKm: distanceKm,
        driveTimeMinutes,
        queueWaitMinutes,
        unloadTimeMinutes,
        totalTurnaroundMinutes,
        remainingCapacityTons,
        utilizationPercent: Number(utilization.toFixed(1)),
        compositeScore
      };
    });

    // Sort by lowest composite score (optimal)
    scoredLandfills.sort((a, b) => a.compositeScore - b.compositeScore);

    const optimal = scoredLandfills[0];
    const naiveNearest = [...scoredLandfills].sort((a, b) => a.distanceFromTruckKm - b.distanceFromTruckKm)[0];

    const timeSavedVsNaive = Number(Math.max(0, naiveNearest.totalTurnaroundMinutes - optimal.totalTurnaroundMinutes).toFixed(1));

    return {
      optimalLandfill: optimal,
      allEvaluated: scoredLandfills,
      naiveNearestLandfill: naiveNearest,
      timeSavedMinutesVsNearest: timeSavedVsNaive,
      decisionExplanation: optimal.id === naiveNearest.id
        ? `${optimal.name} is both geographically nearest (${optimal.distanceFromTruckKm} km) and has manageable queues (${optimal.queueWaitMinutes} min).`
        : `Diverting from nearest site ${naiveNearest.name} (${naiveNearest.queueWaitMinutes} min queue) to ${optimal.name} saves ~${timeSavedVsNaive} mins total turnaround time.`
    };
  }
}
