/**
 * SwachhRoute Delhi - Lane-Aware Routing & Vehicle Sizing Engine (Feature F3)
 * Maps street widths, tight turns, and pedestrian heritage zones to vehicle types
 */

export const VEHICLE_PROFILES = {
  E_RICKSHAW: {
    id: 'E_RICKSHAW',
    name: 'Electric Mini-Tipper (E-Rickshaw)',
    capacityKg: 1200,
    maxLaneWidthRestriction: 'NARROW', // Can enter <3m gallis
    suitedFor: ['Old Delhi (Chandni Chowk)', 'Shahdara Chhota Bazaar', 'Hauz Khas Village', 'Gali corridors'],
    avgSpeedKmH: 18,
    fuelType: 'EV (Zero Emission)',
    co2PerKmKg: 0.0
  },
  LIGHT_TIPPER: {
    id: 'LIGHT_TIPPER',
    name: 'Medium Commercial Tipper (3-Ton)',
    capacityKg: 3500,
    maxLaneWidthRestriction: 'MEDIUM', // Can enter 3-7m roads
    suitedFor: ['Karol Bagh', 'Lajpat Nagar', 'Janakpuri', 'Laxmi Nagar'],
    avgSpeedKmH: 28,
    fuelType: 'CNG',
    co2PerKmKg: 0.18
  },
  HEAVY_COMPACTOR: {
    id: 'HEAVY_COMPACTOR',
    name: 'Heavy Compactor Unit (10-Ton)',
    capacityKg: 8000,
    maxLaneWidthRestriction: 'BROAD', // Only for >7m broad avenues
    suitedFor: ['Connaught Place', 'Saket', 'Dwarka', 'Rohini', 'Pitampura', 'Vasant Kunj'],
    avgSpeedKmH: 38,
    fuelType: 'BS-VI Diesel',
    co2PerKmKg: 0.35
  }
};

export class LaneAwareRouter {
  constructor(graphData) {
    this.graphData = graphData;
    this.nodes = new Map();
    if (graphData?.nodes) {
      graphData.nodes.forEach(n => this.nodes.set(n.id, n));
    }
  }

  /**
   * Recommends optimal vehicle type based on bin lane widths
   * @param {Array} binsToCollect
   */
  recommendVehicleForStops(binsToCollect) {
    const hasNarrow = binsToCollect.some(b => b.laneWidth === 'NARROW');
    const hasMedium = binsToCollect.some(b => b.laneWidth === 'MEDIUM');
    const totalEstWeightKg = binsToCollect.reduce((sum, b) => {
      const weight = Math.round((b.currentFill / 100) * (b.capacityLiters * 0.4));
      return sum + weight;
    }, 0);

    if (hasNarrow) {
      return {
        recommendedProfile: VEHICLE_PROFILES.E_RICKSHAW,
        reason: 'Route contains narrow Delhi gallis (<3m width) such as Chandni Chowk or Shahdara. Compactor trucks restricted.',
        totalPayloadKg: totalEstWeightKg,
        multipleTripsNeeded: totalEstWeightKg > VEHICLE_PROFILES.E_RICKSHAW.capacityKg
      };
    }

    if (hasMedium || totalEstWeightKg <= VEHICLE_PROFILES.LIGHT_TIPPER.capacityKg) {
      return {
        recommendedProfile: VEHICLE_PROFILES.LIGHT_TIPPER,
        reason: 'Optimal vehicle size for mixed commercial corridors with medium street widths (3-7m).',
        totalPayloadKg: totalEstWeightKg,
        multipleTripsNeeded: totalEstWeightKg > VEHICLE_PROFILES.LIGHT_TIPPER.capacityKg
      };
    }

    return {
      recommendedProfile: VEHICLE_PROFILES.HEAVY_COMPACTOR,
      reason: 'High volume route traversing broad arterial roads with high compactor efficiency.',
      totalPayloadKg: totalEstWeightKg,
      multipleTripsNeeded: false
    };
  }

  /**
   * Validates if a chosen vehicle can service the specified bin
   */
  validateVehicleForBin(vehicleType, bin) {
    if (bin.laneWidth === 'NARROW' && vehicleType === 'HEAVY_COMPACTOR') {
      return {
        allowed: false,
        warning: `⚠️ Width Violation: Heavy compactor cannot enter narrow street at ${bin.name}. Use E-Rickshaw Mini-Tipper.`
      };
    }
    return { allowed: true, warning: null };
  }
}
