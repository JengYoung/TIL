> ### **💡 다시 복습하는 거지만, 매우 중요한 개념이다. 집중하자!**
>
> <br>

# **컴포넌트란**

분명 엘리먼트와 비슷하면서, 다르다.  
아니, 컴포넌트가 엘리먼트를 포괄한다고 볼 수도 있을 듯하다.

가장 중요한 차이는 `props`이다. 리액트에서 생산하는 컴포넌트는 `props`이라는 임의의 속성을 가진다. 이를 통해서 어떻게 렌더링할 지에 대한 속성을 받는 것이다.

이후에는, 이러한 속성값을 만족하는, 엘리먼트를 반환한다.

## **컴포넌트의 종류**

크게 **함수형 컴포넌트**와 **클래스형 컴포넌트**가 있다.

그리고 현재는 잘 써먹지만, `react hook`이라는 어썸한 메서드가 있기 때문에, 함수형 컴포넌트가 대세다.

> 단 생명주기라던지, 여전히 클래스형 컴포넌트가 갖고 있는 장점은 존재한다는 건 앞으로 리액트를 하면서 염두하자. (그러려고 요새 클래스를 프로젝트를 통해 연습한 것도 있고.)

말 그대로 함수를 통해 어떤 props를 받은 엘리먼트를 반환하는 것이다!

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

반면 클래스형 컴포넌트는 말 그대로 클래스를 이용하여 렌더링을 하는 것이겠다 (너무나 당연한 말인가?)

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

대략적으로 `render` 메서드는

1. 엘리먼트를
2. 어느 루트에다가 넣어주겠다.

라는 의미로 해석되며, `appendChild`를 이용한 것 아닐까 싶다.

위의 예시는 공식문서를 볼 때, 다음과 같은 절차로 렌더링된다고 한다.

1. `<Welcome name="Sara" />` 엘리먼트로 `ReactDOM.render()`를 호출합니다.
2. React는 `{name: 'Sara'}`를 `props`로 하여 `Welcome` 컴포넌트를 호출합니다.
3. `Welcome` 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트를 반환합니다.
4. `React DOM`은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트합니다.

> 즉 명확하게 얘기하자면 `props`는 어떤 엘리먼트의 `property`지, 완전한 엘리먼트의 `attribute`는 아닌 것 같다.  
> 다만 우리가 자주 사용하는 `onClick`과 같은 일부 `attribute`는 `props`가운데서도 `attribute`로 `JSX` 자체적으로 인식하는 듯하다.

항상 주의하자 !!

> ### 아, 컴포넌트는 항상 **Pascal 표기법**을 컨벤션으로 엄격하게 관리하는 것에 유의하자.

## **컴포넌트 추출 및 합성**

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조 가능하다.  
즉, 어떤 추상화된 컴포넌트를 사용할 수 있다는 것이며, 이는 `React`가 뛰어난 재사용성을 자랑하는 이유이다.

또한 분리 역시 가능하다. 이는 각각의 컴포넌트에 따라 분리함으로써 어떤 추상화된 컴포넌트를 통해 가독성을 향상시킬 수도 있는 것이다.

예시를 보면 설명이 편할 듯하다. ~~역시 공식문서가 짱이다~~

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

이렇게 UserInfo라는 부분을 따로 분리한다.

```
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

결과는 다음과 같이 코드가 더욱 가독성이 높아졌다!

```
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

## ⭐ **Props는 `ReadOnly`**

정말 중요해도 너무 중요하다. 리액트의 가장 중요한 원칙 중 하나가 **불변성을 지켜주는 것**이다.

이러한 불변성을 중시하는 철학으로 인해 `Virtual DOM`이 `DOM`을 더욱 제대로 비교해주는 것이 아닐까 싶다.

만약 이를 지켜주지 않는다면, 어떨까?  
어떤 `argument`를 받을 때마다 결과가 다르게 나온다면, 이게 원래 함수 컴포넌트였는지 분간할 수 없을 것이다. **따라서 이런 어썸한 결과를 도출하기 위해 불변성은 필요할 것이다.**

즉 이것만큼은 확실히 지키자.

> ### **모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.** <공식문서 中>
