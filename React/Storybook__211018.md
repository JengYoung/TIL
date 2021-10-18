![https://jess2.github.io/images/react.png](https://jess2.github.io/images/react.png)

# StoryBook

`UI`컴포넌트를 문서화하고 정리하며 보여주는 오픈소스 툴

스토리북에 등록시켜 놓으면 어떤 컴포넌트가 있는지 쉽게 확인이 가능

컴포넌트를 모아서 상황별로 볼 수 있다.

## How to start

```jsx
npx -p @storybook/cli sb init
```

이를 통해 `.storybook`과 `stories`라는 디렉토리가 각각 생긴다.

## .storybook

설정파일들이 모여있는 곳

### stories

등록된 스토리들이 모여 있는 곳이다.

### Control

`controls`는 기본적으로 플러그인이지만, 우리의 파일에 이미 별도로 설치되어 있다!

```jsx
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d0670908-67b1-4e6c-a47a-112434899b35/Untitled.png)

실제로 한 번 조작해보자.

### Box.js

```jsx
const Box = ({ 
  width = 100, 
  height = 100, 
  backgroundColor = 'red' 
}) => {
  const style = {
    width,
    height,
    backgroundColor
  };
  return <div style={style}></div>
}

export default Box
```

### Box.stories.js

```jsx
import React from 'react';
import Box from '../components/Box';

export default {
  title: 'Example/Box',
  component: Box,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    backgroundColor: { control: 'color' }
  }
}

const Template = args => <Box {...args}></Box>

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Button'
}
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f7b79cb4-5661-46e5-a47f-04437e93f49e/Untitled.png)

다음을 입력하여 실행시켜주자.

```jsx
yarn storybook
```

### Actions

이벤트들에 대한 로그를 남기는 기능 역시 스토리북에서는 가능하다!

### Counter.js

```jsx
import React, { useState } from 'react'

const Counter = ({ onIncrease }) => {
  const  [ count, setCount ] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
    onIncrease()
  } 

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleIncrease}>+</button>
    </div>
  )
}

export default Counter
```

### Counter.stories.js

```jsx
import React from 'react';
import Counter from '../components/Counter';

export default {
  title: 'Example/Counter',
  component: Counter,
  argTypes: {
    onIncrease: { action: 'increase' }
  }
};

const Template = (args) => <Counter {...args} />;

export const Default = Template.bind({});
```
