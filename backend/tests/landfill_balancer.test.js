import { LandfillBalancer } from '../src/algorithms/LandfillBalancer.js';
import { CityGraph } from '../src/algorithms/Dijkstra.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

const graphData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'city_graph.json'), 'utf8'));
const landfills = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'landfills.json'), 'utf8'));

export function runLandfillTests() {
  console.log('--- RUNNING LANDFILL BALANCER TESTS ---');
  const graph = new CityGraph(graphData);
  const balancer = new LandfillBalancer(landfills, graph);

  const decision = balancer.selectOptimalLandfill('BIN_CHANDNI', 4500);

  console.assert(decision !== null, 'Test 1 Failed: Decision should not be null');
  console.assert(decision.optimalLandfill !== undefined, 'Test 1 Failed: Optimal landfill must be defined');
  console.log('✓ Test 1 Passed: Optimal Landfill selected:', decision.optimalLandfill.name);
  console.log('  Time saved vs naive nearest:', decision.timeSavedMinutesVsNearest, 'minutes');

  console.log('🎉 ALL LANDFILL BALANCER TESTS PASSED!\n');
}

runLandfillTests();
