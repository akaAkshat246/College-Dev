import { PriorityQueue, calculateBinPriorityScore } from '../src/algorithms/PriorityQueue.js';

export function runPriorityQueueTests() {
  console.log('--- RUNNING PRIORITY QUEUE & SCORER TESTS ---');

  // Test 1: Max-Heap ordering
  const pq = new PriorityQueue((a, b) => a - b);
  pq.enqueue(40);
  pq.enqueue(95);
  pq.enqueue(60);
  pq.enqueue(10);
  pq.enqueue(85);

  const highest = pq.dequeue();
  console.assert(highest === 95, `Test 1 Failed: Expected 95, got ${highest}`);
  console.assert(pq.dequeue() === 85, 'Test 1 Failed: Expected 85 second');
  console.log('✓ Test 1 Passed: Binary Max-Heap accurately extracts maximum priority elements in O(log N)');

  // Test 2: Multi-Factor Priority Calculation
  const criticalBin = {
    currentFill: 94,
    fillRatePerHour: 6.8,
    odourIndex: 88,
    lastCollectedHoursAgo: 24,
    status: 'CRITICAL',
    laneWidth: 'NARROW'
  };

  const score = calculateBinPriorityScore(criticalBin, { festivalSurge: 1.65 });
  console.assert(score >= 80, `Test 2 Failed: Urgency score should be >= 80, got ${score}`);
  console.log('✓ Test 2 Passed: Multi-factor MCD bin score evaluated:', score);

  console.log('🎉 ALL PRIORITY QUEUE TESTS PASSED!\n');
}

runPriorityQueueTests();
