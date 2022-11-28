# Kleisli Composition

프로미스는 `Kleisli composition`을 지원하는 도구라고도 볼 수 있음.

오류가 있을 가능성에 염두하여 항상 정확하고 안전한 함수 합성이 이루어지도록 하는 관점.

현대 프로그래밍의 경우,

- 상태
- 효과
- 외부 환경 상황

으로 인해 원하는 대로 항상 정확하게 이루어지지 않을 수 있음.

따라서 `Kleisli Composition`은

> 1.  **들어오는 인자가 잘못됐거나**
> 2.  **정확한 인자가 들어오더라도 의존하고 있는 외부 상태가 영향을 줄 때**

에러가 나는, 그런 것을 해결하기 위한 함수 합성이라 볼 수 있음.

```js
(() => {
  const g = (a) => a + 1;
  const f = (a) => a * a;

  Array.of(1).map(g).map(f);
  [].map(g).map(f);

  Promise.resolve(2).then(g).then(f);
  new Promise((resolve) => {
    return setTimeout(() => resolve(2), 100);
  })
    .then(g)
    .then(f);
  // f . g
  // f(g(x)) = f(g(x)) // g에서 아무런 에러가 없이 g f를 연속적으로 실행하면 이를 만족.
  // f(g(x)) = g(x) // g에서 에러가 났을 때에는 이것이 성립하는 것이 Klesli Composition
})();
```

```js
(() => {
  // f와 g를 합성했다고 할 때
  // f(g(x)) = f(g(x)) 가 성립.
  // 실무에서는 f(g(x))를 평가할 때의 g가 바라보고 있는 값이 다른 곳에서 쓸 때 다른 값으로 변해있다면 오류가 날 수 있음에 주의.
  // 따라서 순수함수가 중요함.

  // 이를 해결하자는 관점이 Kleisli composition 규칙
  // 어떤 g(x)에서 만일 에러가 날 경우 f(g(x))를 할 때에도 원하지 않는 결과를 만들지 않도록 함.

  const users = [
    { id: 1, name: "aa" },
    { id: 2, name: "bb" },
    { id: 3, name: "cc" },
  ];
  function filter(f) {
    return function* (iter) {
      for (const a of iter) if (f(a)) yield a;
    };
  }
  const head = ([a]) => a;
  const find = (f) => (iter) => head(filter(f)(iter));
  const getUserById = (id) =>
    find((u) => u.id === id)(users) || Promise.reject("없어요!"); // 없을 경우 같은 에러 결과를 만들 수 있도록 해줌.

  const f = ({ name }) => name;
  const g = getUserById;
  const fg = (id) =>
    Promise.resolve(id)
      .then(g)
      .then(f)
      .catch((a) => a);

  // const r = fg(2);
  users.pop();
  users.pop();
  // log(users);

  // 만일 users 데이타가 바뀐다면, 위험한 상황이 생김.
  // f는 항상 name이라는 프로퍼티가 있어야 하며
  // g라는 건 이 안에서 뭔가가 반드시 있어야 정상적으로 동작함.
  // const r2 = fg(2);

  fg(2).then(log);
})();
```
