const foo = (arg1: string, arg2: number): void => {};

export type MyParameters<Type> = Type extends (...args: infer Args) => unknown
  ? Args
  : any;

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
