export type Unshift<Arr extends any[], Item> = [Item, ...Arr];

type Result = Unshift<[1, 2], "3">; // ['3', 1, 2]

const a: Result = ["3", 1, 2];
const b: Result = ["3", 2, 2];
const c: Result = [3, 1, 2];
