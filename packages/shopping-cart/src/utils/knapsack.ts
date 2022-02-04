export interface KnapsackResult {
  matrix: any[];
  value: number;
  itemIds: number[];
}

interface LUKPProps {
  i: number;
  lowerBound: number;
  upperBound: number;
  costs: number[];
  sortedWeights: number[];
}

/**
 *
 * @param sortedWeights weights sorted high to low
 * @param capacity > 1
 * @param index >= 0 and in bounds of sortedWeight
 *
 * returns the min index of the item which doesn't fit into the bag when added to the others
 */
export function calculateCriticalItemIndex(
  sortedWeights: number[],
  capacity: number,
  index: number
): number {
  try {
    if (
      index == 0 ||
      sortedWeights.length == 0 ||
      index > sortedWeights.length
    ) {
      return 0;
    }
    let ics = [];
    for (let i = index; i < sortedWeights.length; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += sortedWeights[j];
        if (sum > capacity) {
          ics.push(i);
          break;
        }
      }
    }
    return Math.min(...ics);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Lower Upper bound Knapsack Problem (LUKP)
 * Returns the min value for a knapsack with items i constrained by a lower and upper bound capacity.
 *
 * @param i <= ic where ic is the critical item index
 * @param lowerBound min capacity (L)
 * @param upperBound max capacity (U)
 * @param costs where costs.length == sortedWeights.length
 * @param sortedWeights w1 >= w2 >= ... >= wn
 */
export function LUKP({
  i,
  lowerBound,
  upperBound,
  costs,
  sortedWeights,
}: LUKPProps): number {
  const subSet = costs.slice(0, costs.length - i);
  if (subSet.length == 0) {
    return 0;
  }

  let sums: number[] = [];

  subSet.forEach((cost, j) => {
    // for cost[j] add it to sum if L <= w[j] <= U
    const Wj = sortedWeights[j];
    const fitsBag = lowerBound <= Wj && Wj <= upperBound;
    if (fitsBag) {
      sums.push(cost);
    }
  });
  return sums.length != 0 ? Math.min(...sums) : 0;
}

/**
 *
 * Finds the optimal Minimum cost maximum capacity knapsack value
 */
export function optimal_MCMKP({
  costs,
  i,
  sortedWeights,
  ...rest
}: LUKPProps): number {
  const sumCost = this.sumLessThanI(costs, i);
  return Math.min(this.LUKP({ costs, i, sortedWeights, ...rest }) + sumCost);
}

/**
 * Returns Wi which is the sum of all Wj where j < i
 * @param arr high to low
 * @param index can't be greater than sortedWeights.length where index = n,...0 (n = sortedWeights.length)
 */
export function sumLessThanI(arr: number[], index: number): number {
  const w = arr.slice(arr.length - index + 1);
  if (w.length == 0) {
    return 0;
  }
  return w.reduce((a, b) => {
    return a + b;
  });
}

/**
 * Get the lower bound capacity
 * @param capacity > 0
 * @param Wi sum of weights where j < i
 * @param wi current weight at index i
 */
export function getMinCapacity(
  capacity: number,
  Wi: number,
  wi: number
): number {
  return Math.max(0, capacity - Wi - wi + 1);
}

export function getMaxCapacity(capacity: number, Wi: number): number {
  return Math.max(0, capacity - Wi);
}

/**
 * Minimum cost - Maximum capacity knapsack problem
 *
 * Given a set of items with weights and costs and a capacity
 * Find the maximum sub set of items that fit inside the bag that have
 * the minimum cost.
 *
 * @param costs positive numbers
 * @param weights positive weights
 * @param capacity positive capacity
 */
export function MCMKP(
  costs: number[],
  weights: number[],
  capacity = 10
): KnapsackResult {
  if (capacity < 0 || costs.length <= 0 || costs.length != weights.length) {
    return {
      matrix: [[]],
      value: 0,
      itemIds: [],
    };
  }

  let matrix = new Array(costs.length + 1);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = [0, ...new Array(capacity).fill(Number.POSITIVE_INFINITY)];
  }

  const items = costs.map((c, i) => ({ cost: c, weight: weights[i] }));
  const n = items.length;

  // high to low
  const weightSortedItems = items.sort((a, b) => b.weight - a.weight);
  const sortedWeights = weightSortedItems.map((i) => i.weight);
  const sortedCostsByWeights = weightSortedItems.map((i) => i.cost);

  // optimal MCMKP solution value
  let opt = Number.POSITIVE_INFINITY;
  const chosenItemIndexes = [];

  for (let i = n; i > 1; i--) {
    const Wi = this.sumLessThanI(sortedWeights, i);

    // index of critical item - one that doesn't fit into the bag
    // add all the weights up until you get to the one that breaks this condition
    const ic = this.calculateCriticalItemIndex(sortedWeights, capacity, i);

    // avoid out of bounds for i+1
    if (i <= ic && i != n) {
      const maxCap: number = this.getMinCapacity(
        capacity,
        Wi,
        sortedWeights[n - i] // reverse index
      );
      const minCap: number = this.getMaxCapacity(capacity, Wi);

      const tmp = this.optimal_MCMKP({
        i,
        lowerBound: minCap,
        upperBound: maxCap,
        costs: sortedCostsByWeights,
        sortedWeights,
      });

      if (tmp < opt) {
        opt = tmp;
        chosenItemIndexes.push(i);
        // TODO: pointer to capacity
      }
    }
    for (let k = 0; k < capacity; k++) {
      if (k >= sortedWeights[i]) {
        // TOOD: recursion here?...
        // we either choose the current value
        // or we step back through the previous matrix and solve + current cost
        matrix[i][k] = Math.min(
          matrix[i][k],
          matrix[n - i][k - sortedWeights[i]] + sortedCostsByWeights[i]
        );
      } else {
        matrix[i][k] = matrix[n - i][k];
      }
    }
  }

  return {
    matrix,
    value: opt,
    itemIds: chosenItemIndexes,
  };
}
