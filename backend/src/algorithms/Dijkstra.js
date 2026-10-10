import { PriorityQueue } from './PriorityQueue.js';

/**
 * SwachhRoute Delhi - Production Dijkstra's Shortest Path Algorithm
 * Supports vehicle width constraints, real-time traffic congestion,
 * and travel time matrix generation on the Delhi road network.
 */
export class CityGraph {
  constructor(graphData) {
    this.nodes = new Map();
    this.adjacencyList = new Map();
    this.edgeList = [];
    this.depotId = graphData?.depot?.id || 'DEPOT';
    this.landfills = graphData?.landfills || [];

    if (graphData) {
      this._initGraph(graphData);
    }
  }

  _initGraph(graphData) {
    if (graphData.nodes) {
      for (const node of graphData.nodes) {
        this.nodes.set(node.id, node);
        this.adjacencyList.set(node.id, []);
      }
    }

    if (graphData.edges) {
      for (const edge of graphData.edges) {
        this.addEdge(edge.from, edge.to, edge.distance, edge);
      }
    }
  }

  addEdge(u, v, weight, metadata = {}) {
    if (!this.adjacencyList.has(u)) this.adjacencyList.set(u, []);
    if (!this.adjacencyList.has(v)) this.adjacencyList.set(v, []);

    const edgeData = {
      from: u,
      to: v,
      weight,
      distanceKm: weight,
      laneWidth: metadata.laneWidth || 'BROAD',
      avgSpeed: metadata.avgSpeed || 35,
      roadName: metadata.roadName || 'Delhi Arterial Road',
      ...metadata
    };

    this.edgeList.push(edgeData);
    this.adjacencyList.get(u).push({ node: v, weight, ...edgeData });
    this.adjacencyList.get(v).push({ node: u, weight, ...edgeData, from: v, to: u });
  }

  /**
   * Checks if an edge is traversable for the given vehicle type
   * @param {Object} edge
   * @param {String} vehicleType - 'E_RICKSHAW' | 'LIGHT_TIPPER' | 'HEAVY_COMPACTOR'
   */
  isEdgeTraversable(edge, vehicleType = 'HEAVY_COMPACTOR') {
    if (!vehicleType || vehicleType === 'E_RICKSHAW') return true;
    if (vehicleType === 'LIGHT_TIPPER') {
      return edge.laneWidth !== 'VERY_NARROW';
    }
    if (vehicleType === 'HEAVY_COMPACTOR') {
      // Heavy compactor trucks cannot enter narrow Old Delhi / Shahdara gallis
      return edge.laneWidth !== 'NARROW';
    }
    return true;
  }

  /**
   * Runs Dijkstra's algorithm with binary min-heap priority queue
   * @param {String} startNodeId
   * @param {Object} options - { vehicleType, trafficMultiplier }
   */
  dijkstra(startNodeId, options = {}) {
    const { vehicleType = null, trafficMultiplier = 1.0 } = options;

    const distances = {};
    const travelTimes = {};
    const previous = {};
    const visited = new Set();

    for (const [nodeId] of this.nodes) {
      distances[nodeId] = Infinity;
      travelTimes[nodeId] = Infinity;
      previous[nodeId] = null;
    }

    distances[startNodeId] = 0;
    travelTimes[startNodeId] = 0;

    // Min-Heap Priority Queue comparing distances
    const pq = new PriorityQueue((a, b) => b.distance - a.distance);
    pq.enqueue({ id: startNodeId, distance: 0, timeMinutes: 0 });

    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      const u = current.id;

      if (visited.has(u)) continue;
      visited.add(u);

      const neighbors = this.adjacencyList.get(u) || [];
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.node)) continue;

        // Check vehicle road width compatibility
        if (vehicleType && !this.isEdgeTraversable(neighbor, vehicleType)) {
          continue;
        }

        const effectiveSpeed = Math.max(10, (neighbor.avgSpeed || 30) / trafficMultiplier);
        const edgeTimeMinutes = (neighbor.weight / effectiveSpeed) * 60;

        const newDistance = distances[u] + neighbor.weight;
        const newTime = travelTimes[u] + edgeTimeMinutes;

        if (newDistance < distances[neighbor.node]) {
          distances[neighbor.node] = Number(newDistance.toFixed(2));
          travelTimes[neighbor.node] = Number(newTime.toFixed(1));
          previous[neighbor.node] = u;
          pq.enqueue({ id: neighbor.node, distance: distances[neighbor.node], timeMinutes: travelTimes[neighbor.node] });
        }
      }
    }

    return { distances, travelTimes, previous };
  }

  /**
   * Reconstructs shortest path from startNode to targetNode
   */
  getShortestPath(startNodeId, targetNodeId, options = {}) {
    const { distances, travelTimes, previous } = this.dijkstra(startNodeId, options);
    const path = [];
    let curr = targetNodeId;

    while (curr) {
      path.unshift(curr);
      curr = previous[curr];
    }

    if (path.length > 0 && path[0] !== startNodeId) {
      return {
        path: [],
        distance: Infinity,
        durationMinutes: Infinity,
        readablePath: [],
        start: startNodeId,
        destination: targetNodeId,
        reachable: false
      };
    }

    const readablePath = path.map(id => this.nodes.get(id)?.name || id);

    return {
      path,
      distance: distances[targetNodeId] === Infinity ? 0 : distances[targetNodeId],
      durationMinutes: travelTimes[targetNodeId] === Infinity ? 0 : travelTimes[targetNodeId],
      readablePath,
      start: startNodeId,
      destination: targetNodeId,
      reachable: distances[targetNodeId] !== Infinity
    };
  }

  /**
   * Generates complete NxN travel distance & time matrix for all nodes
   */
  buildDistanceMatrix(nodeIds, options = {}) {
    const matrix = {};
    for (const source of nodeIds) {
      matrix[source] = {};
      const { distances, travelTimes } = this.dijkstra(source, options);
      for (const target of nodeIds) {
        matrix[source][target] = {
          distanceKm: distances[target] !== undefined ? distances[target] : Infinity,
          timeMinutes: travelTimes[target] !== undefined ? travelTimes[target] : Infinity
        };
      }
    }
    return matrix;
  }
}
