import {
  calculateCriticalItemIndex,
  getMaxCapacity,
  getMinCapacity,
  MCMKP,
  optimal_MCMKP,
  sumLessThanI,
} from "./knapsack";

it("should get the min item index which makes the weights go over the capacity given we are looking at a certain row", () => {
  const sortedWeights = [10, 8, 5, 3, 1];
  const capacity = 10;
  const row = 1;
  const expectedIc = 2;
  const actual = calculateCriticalItemIndex(sortedWeights, capacity, row);

  expect(actual).toBe(expectedIc);
});

it("should get the correct sum of weights where j < i", () => {
  const expected = 7;
  const sortedWeights = [4, 3, 2, 1, 1];
  const i = 5;

  const actual = sumLessThanI(sortedWeights, i);

  expect(actual).toBe(expected);
});

it("should retrieve the optimal MCMKKP for any given i", () => {
  const sortedWeights = [4, 3, 2, 1, 1];
  const capacity = 5;
  const costs = [1, 2, 6, 4, 3];
  const WiList = [7, 4, 2, 1];
  const expectedMaxCaps = [0, 1, 3, 4];
  const expectedMinCaps = [0, 0, 2, 4];
  const n = sortedWeights.length;
  const expectedOPTs = [1000000000, 13, 9, 4, 4];

  for (let i = n; i > 1; i--) {
    const ic = calculateCriticalItemIndex(sortedWeights, capacity, i);
    expect(i <= ic).toBeTruthy();
    if (i <= ic && i != n) {
      const Wi = sumLessThanI(sortedWeights, i);
      const reverseIndex = n - i;
      expect(Wi).toBe(WiList[reverseIndex]);

      const maxC = getMaxCapacity(capacity, Wi);
      const minC = getMinCapacity(capacity, Wi, sortedWeights[reverseIndex]);

      expect(minC).toBe(expectedMinCaps[reverseIndex]);
      expect(maxC).toBe(expectedMaxCaps[reverseIndex]);

      const actualOPT = optimal_MCMKP({
        costs,
        i: i,
        lowerBound: minC,
        upperBound: maxC,
        sortedWeights,
      });

      expect(actualOPT).toBe(expectedOPTs[reverseIndex]);
    }
  }
});

it("should solve the Minimum Cost Maximal Knapsack Problem (MCMKP)", () => {
  const testCases = [
    {
      inputs: {
        weights: [4, 3, 2, 1, 1],
        deliveryDays: [1, 2, 6, 4, 3],
        capacity: 5,
      },
      expected: 4,
    },
    {
      inputs: {
        weights: [1, 8, 7, 4, 3, 2],
        deliveryDays: [4, 1, 2, 10, 3, 5],
        capacity: 10,
      },
      expected: 5,
    },
  ];

  for (let i = 0; i < testCases.length; i++) {
    const input = testCases[i].inputs;
    const actual = MCMKP(input.deliveryDays, input.weights, input.capacity);
    expect(actual.value).toBe(testCases[i].expected);
  }
});
