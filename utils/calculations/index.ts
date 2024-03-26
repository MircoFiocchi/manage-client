export const calcStandardDeviation = (ages: number[]): number => {
  const mean = ages.reduce((acc, val) => acc + val, 0) / ages.length;

  const sumOfSquaresDifferences = ages.reduce((acc, val) => {
    return acc + Math.pow(val - mean, 2);
  }, 0);

  const variance = sumOfSquaresDifferences / (ages.length - 1);

  const standardDeviation = Math.sqrt(variance);

  return standardDeviation;
};

export const calcAverageAges = (ages: number[]): number => {
  const totalAges = ages.reduce((acc, val) => acc + val, 0);
  const average = totalAges / ages.length;
  return average;
};
