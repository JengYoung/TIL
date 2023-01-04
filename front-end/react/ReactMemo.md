# React.memo ?

- 함수 컴포넌트는 자신의 상태가 변경될 때 리렌더링
- 부모 컴포넌트로부터 받는 prop이 변경될 때 리렌더링
- **부모 컴포넌트의 상태가 변경되면 리렌더링**

여기서 아이러니한 것은, 부모가 바뀌었다고, 내부 자식까지 모두 바뀐다는 것이다.

그렇다면 모든 것들을 리렌더링한다면, 성능은 매우 비효율적일 것이다.

따라서 이를 해결하는 것이 `React.memo`다. 자식 컴포넌트는 바뀌게 하지 않는 것이다.

### Box.js

```jsx
const style = {
  width: '100px',
  height: '100px',
  backgroundColor: 'cyan'
};

const Box = () => {
  console.log('리렌더링')
  return <div style={style}></div>
}

export default Box
```

### App.js

```jsx
import React, { useState } from 'react';
import Box from './components/Box';

function App() {
  const [ count, setCount ] = useState(0)
  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      <Box></Box>
    </>
  )
}

export default App;
```

결과적으로, 계속 리렌더링되는 것을 확인할 수 있다.

## 해결 방법

별 거 없다. `React.memo`로 자식 컴포넌트를 감싸준다.

```jsx
export default React.memo(Box)
```

이제는 리렌더링이 되지 않는다!