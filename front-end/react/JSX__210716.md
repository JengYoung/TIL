> **다시 기본에 집중하자...**

# JSX ?

> **자바스크립트를 확장한 문법**

리액트에서는 렌더링 로직과 UI 로직이 연관되어 있음을 받아들임.

즉

> **UI 로직을 마크업에 직접 넣어서 컴포넌트라는 단위로 나누면 어떨까?**

라는 아이디어에서 도출된 것이 JSX이다!

(그래서 자바스크립트에서 컴포넌트를 생산한 것이 아닐까 생각해본다. **굳이 마크업을 별도로 분리하지 않는다는 것!**)

예시)

```
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## **특징 1. 표현식**

결국 기반은 `JavaScript`다. 따라서 표현을 처리할 수 있는데, 이는 **`{}`** 안에 넣으면 된다!

또한 속성 역시 마찬가지로, 문자 리터럴 혹은 표현식을 넣을 수 있다.

```
const element = <img src={user.avatarUrl}></img>;
```

## **React.createElement**

결국에 React는 어떤 마법을 부리는 게 아니라, 역시 **객체를 생성하는 것**이다.  
그 객체에는 다음과 같이 태그, 클래스 이름, 그리고 안에 있을 `content` 등이 포함된 것이다!

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

다만 역시 대신해서 어떤 컴포넌트를 `DOM`에서 변경해주는 구조일 것이다. (추측)  
따라서, 이를 만드는 데 있어 고려할 여러 버그들을 미리 검사해주는 역할도 수행한다고 한다!

결국 `JSX`는 이렇게 직접 `createElement`를 통해 만들어야 할 컴포넌트를 더욱 생산성 높이기 위해 설계되고 제안된 어썸한 문법인 것이다. 👍
