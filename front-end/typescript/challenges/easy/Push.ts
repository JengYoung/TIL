export type Push<Arr extends any[], Item> = [...Arr, Item];

type Result = Push<[1, 2], "3">; // [1, 2, '3']

const a: Result = [1, 2, "3"];
const b: Result = [1, 2, "4"];
const c: Result = [3, 2, "4"];
