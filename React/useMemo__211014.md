# useMemo

- 함수 컴포넌트는 자신의 상태가 변경될 때 리렌더링
- 부모 컴포넌트로부터 받는 prop이 변경될 때 리렌더링
- 부모 컴포넌트의 상태가 변경되면 리렌더링

**만약 연산의 속도가 느린 컴포넌트라면?**

### App.js

```jsx
import React from 'react';
import ShowSum from './components/useMemo/ShowSum';

function App() {
  return (
    <>
      <ShowSum label={"Result"} n = {10000}></ShowSum>
    </>
  )
}

export default App;
```

### useMemo/Showsum.js

```jsx
import React from 'react'
function sum(n) {
  console.log('Start');
  let result = 0;
  for (let i = 1; i <= n; i += 1) {
    result += 1;
  }
  console.log('Finished');
  return result;
}
const ShowSum = ({ label, n }) => {
  const result = sum(n);
  return (
    <span>
      {label} : {result}
    </span>
  )
}

export default ShowSum
```

지금은 문제없이 화면에 잘 출력된다.

하지만 다음과 같이 `n`을 정말 과부하시키는 숫자를 넣으면 어떻게 될까?

```jsx
import React, { useState } from 'react';
import ShowSum from './components/useMemo/ShowSum';

function App() {
  const [ label, setLabel ] = useState('Result')
  return (
    <>
      <button onClick={() => setLabel(label + ':')}>Change Label</button>
      <ShowSum label={label} n = {10000000}></ShowSum>
    </>
  )
}

export default App;
```

이 경우, `n`의 연산을 다 끝내기 전에, 다시 또 리렌더링을 요구하므로 문제가 발생한다. 화면도 버벅이며, 굳이 `label`만 바꿨음에도 실제 결과까지 리렌더링 된다.

## `useMemo`를 통한 최적화

따라서 `Showsum`을 특정 변수의 상태가 바뀔 때에만 리렌더링되도록 한다면, 이에 대한 최적화가 가능하다.

```jsx
import React, { useMemo } from 'react'
function sum(n) {
  console.log('Start');
  let result = 0;
  for (let i = 1; i <= n; i += 1) {
    result += 1;
  }
  console.log('Finished');
  return result;
}
const ShowSum = ({ label, n }) => {
  const result = useMemo(() => sum(n), [n]);
  return (
    <span>
      {label} : {result}
    </span>
  )
}

export default ShowSum
```