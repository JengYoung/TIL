# 컴포넌트 스타일링

기본적으로 `CSS in JS`를 하려고 한다.

원래라면, `styled-components`를 하려고 했지만, 강의상 `emotion` 역시 배우면 좋을 거 같아서, 나 역시 `emotion`으로 적용하려 한다.

## how to start

```jsx
yarn add @emotion/react
yarn add @emotion/styled
yarn add -D @emotion/babel-plugin
```

이렇게 설치하고 나면, `/** @jsxImportSource @emotion/react */`라고 `annotation`으로 명시를 해줘야 한다.

```jsx
/** @jsxImportSource @emotion/react */
import { useRef } from 'react';
import Box from './components/Box';

import { jsx, css } from '@emotion/react'

const style = css`
  color: hotpink;
`

const SomeComponent = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
)

function App() {
  const inputRef = useRef();

  return (
    <>
      <SomeComponent></SomeComponent>
      <Box bgColor="red"></Box>
    </>
  )
}

export default App;
```

## 번거로운 `annotation` 없애기

방법이 크게 2가지 있다.

- `eject`
- `@craco/craco`
    
    이 역시 `create-react-app-config-override`의 약자인 걸 보았을 때, `CRA`에 최적화된 라이브러리임을 직감할 수 있다.
    
    아무래도 `CRA`에서 바벨을 직접 다룰 수 없기 때문에 이러한 라이브러리가 생긴 듯하다!
    

```jsx
yarn add -D @craco/craco
yarn add -D @emotion/babel-preset-css-prop
```

### craco.config.js

```jsx
module.exports = {
  babel: {
    presets: ["@emotion/babel-preset-css-prop"]
  }
}
```

이후, `package.json`에서 다음과 같이 `react-scripts`에서 `craco`로 바꾼다.

```jsx
"start": "craco start",
"build": "craco build",
"test": "craco test",
```

## 사용

다음과 같이 간편하게 스타일을 입힌 컴포넌트를 바로 사용이 가능하다. 

```jsx
import styled from '@emotion/styled';

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: cyan;
`;

export default Box
```