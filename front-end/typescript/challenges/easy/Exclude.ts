type MyExclude<UnionTypes, Target> = UnionTypes extends Target
  ? never
  : UnionTypes;

type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'

const result1: Result = "b";
export const result2: Result = "c";
