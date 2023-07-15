type ReadonlyArray = readonly unknown[];

export type Concat<A extends ReadonlyArray, B extends ReadonlyArray> = [
  ...A,
  ...B
];

type Result = Concat<[1], [2]>; // expected to be [1, 2]

const a: Result = [1, 2];
const b: Result = [3, 2];
