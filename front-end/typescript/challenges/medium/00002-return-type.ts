type MyReturnType<Func> = Func extends (...args: any[]) => infer R ? R : never;

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

type Fn = MyReturnType<typeof fn>; // 1 | 2
type Fn1 = MyReturnType<typeof fn1>; // 1 | 2
