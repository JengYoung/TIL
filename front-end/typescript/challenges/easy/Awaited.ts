type ExampleType = Promise<string>;

// type MyAwaited<Type> = Type extends infer Type ? Type : never;
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;
type Result = MyAwaited<ExampleType>; // string

async function A() {
  const b = await "2";

  return b;
}

(async () => {
  const goodUseCase: Result = await A();
  const wrongUseCase: Result = A();
})();
