/**
 * SwachhRoute Delhi - Binary Heap Priority Queue & Telematics Urgency Scorer
 * Supports Min-Heap and Max-Heap with custom comparators
 */

export class PriorityQueue {
  constructor(comparator = (a, b) => b - a) {
    this.heap = [];
    this.comparator = comparator;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  enqueue(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const root = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._sinkDown(0);
    }
    return root;
  }

  _bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (this.comparator(element, parent) <= 0) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  _sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swap = null;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (this.comparator(leftChild, element) > 0) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && this.comparator(rightChild, element) > 0) ||
          (swap !== null && this.comparator(rightChild, this.heap[leftChildIndex]) > 0)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  toArray() {
    return [...this.heap];
  }
}

/**
 * Calculates dynamic MCD Priority Urgency Score for a Smart Bin (0 - 100)
 * Evaluates fill level, fill velocity, odour sensor index, time since last emptied,
 * and festival surge modifiers.
 */
export function calculateBinPriorityScore(bin, factors = {}) {
  const { festivalSurge = 1.0, weatherMultiplier = 1.0 } = factors;

  const fillWeight = 0.45;
  const rateWeight = 3.5;
  const odourWeight = 0.15;
  const timeWeight = 0.60;

  const currentFill = bin.currentFill || 0;
  const fillRate = (bin.fillRatePerHour || 2.5) * festivalSurge * weatherMultiplier;
  const odour = bin.odourIndex || 20;
  const hoursSince = bin.lastCollectedHoursAgo || 12;

  // Raw score computation
  let score = (currentFill * fillWeight) + (fillRate * rateWeight) + (odour * odourWeight) + (hoursSince * timeWeight);

  // Status multiplier boosts
  if (bin.status === 'CRITICAL' || currentFill >= 90) {
    score += 25;
  } else if (bin.status === 'HIGH' || currentFill >= 75) {
    score += 15;
  }

  // Narrow lane bonus (Old Delhi / Chandni Chowk gets urgency boost due to high footfall)
  if (bin.laneWidth === 'NARROW') {
    score += 8;
  }

  return Math.min(100, Math.round(score));
}
