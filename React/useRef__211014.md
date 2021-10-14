# `useRef`란?

- DOM에 직접 접근할 때 사용
- 지역변수로 사용할 때 사용.
    - `useState`는 값이 변경될 때 리렌더링을 해주지만,
    - `useRef`는 값이 변경되어도 다시 렌더링을 하지 않는다.

## DOM에 직접 접근할 때 사용

### App.js

```jsx
import { useRef } from 'react';
import Input from './components/Input';

function App() {
  const inputRef = useRef();

  return (
    <div>
      <Input ref={inputRef}></Input>
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  )
}

export default App;
```

### input.js

```jsx
import React from 'react'

const Input = React.forwardRef((_, ref) => {
  return (
    <>
      <input ref={ref}></input>
    </>
  )
});

export default Input
```

## `useRef`는 값이 변경되어도 다시 렌더링을 하지 않는다.

만약 타이머를 설정한다고 하자.

그러면 setInterval의 경우, 계속해서 값이 시간에 따라 변화한다.

그렇지만, `useRef`를 쓰면, 이에 대한 리렌더링을 방지할 수 있는 것이다.

```jsx
import  { useRef, useState } from 'react';

const AutoCounter = () => {
  const [ count, setCount ] = useState(0);
  const interValid = useRef();

  const handleStart = () => {
    interValid.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000) 
  }
  
  const handleStop = () => {
    clearInterval(interValid.current);
  }

  return (
    <>
      <div>{ count }</div>
      <button onClick={handleStart}> Start</button>
      <button onClick={handleStop}> Stop</button>
    </>
  )
}

export default AutoCounter
```