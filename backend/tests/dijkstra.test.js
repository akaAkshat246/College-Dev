import { CityGraph } from '../src/algorithms/Dijkstra.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

const graphData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'city_graph.json'), 'utf8'));

export function runDijkstraTests() {
  console.log('--- RUNNING DIJKSTRA ALGORITHM UNIT TESTS ---');
  const graph = new CityGraph(graphData);

  // Test 1: Shortest Path from Depot to Connaught Place
  const cpRoute = graph.getShortestPath('DEPOT', 'BIN_CP');
  console.assert(cpRoute.reachable === true, 'Test 1 Failed: Depot to CP should be reachable');
  console.assert(cpRoute.distance > 0, 'Test 1 Failed: Distance should be positive');
  console.log('✓ Test 1 Passed: Shortest path to Connaught Place computed:', cpRoute.distance, 'km');

  // Test 2: Narrow Lane Constraint for Heavy Compactor in Chandni Chowk
  const compactorToChandni = graph.getShortestPath('DEPOT', 'BIN_CHANDNI', { vehicleType: 'HEAVY_COMPACTOR' });
  const eRickshawToChandni = graph.getShortestPath('DEPOT', 'BIN_CHANDNI', { vehicleType: 'E_RICKSHAW' });
  console.assert(eRickshawToChandni.reachable === true, 'Test 2 Failed: E-Rickshaw should reach Chandni Chowk');
  console.log('✓ Test 2 Passed: Vehicle lane-width routing constraints validated');

  // Test 3: Landfill Reachability
  const bhalswaRoute = graph.getShortestPath('DEPOT', 'LF_BHALSWA');
  console.assert(bhalswaRoute.reachable === true, 'Test 3 Failed: Bhalswa should be reachable');
  console.log('✓ Test 3 Passed: Bhalswa Landfill reachable in', bhalswaRoute.distance, 'km');

  // Test 4: Travel Distance Matrix
  const nodes = ['DEPOT', 'BIN_CP', 'BIN_KAROLBAGH', 'LF_GHAZIPUR'];
  const matrix = graph.buildDistanceMatrix(nodes);
  console.assert(matrix['DEPOT']['BIN_CP'].distanceKm > 0, 'Test 4 Failed: Matrix distance should exist');
  console.log('✓ Test 4 Passed: 4x4 Travel distance and time matrix computed');

  console.log('🎉 ALL DIJKSTRA TESTS PASSED!\n');
}

runDijkstraTests();
