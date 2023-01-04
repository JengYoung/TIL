![https://jess2.github.io/images/react.png](https://jess2.github.io/images/react.png)

# 리액트 간단하게 살펴 보기

- FaceBook에서 만든 라이브러리
- 2013.05 오픈 소스 공개
- 한글 문서 제공
- 강력한 커뮤니티로 인한 stackoverflow 활성화

## Don't hasitate to introduce `React`

**이미 엔터프라이즈 급의 기업들이 많이 도입했고, 충분한 커뮤니티로 인해 증명이 된 상황. 안정성의 측면에 있어서는 도입에 망설이지 않아도 된다!** 

## Reactive Programming

`React` 는 반응을 보인다는 뜻. 다음을 살펴 보자.

```jsx
b = 27
c = 33
a = b + c
print(a)
c = 40 
print(a)

//Result
//60
//67
```

쉽게 말하자면, 엑셀의 경우 특정 셀의 값이 바뀌면 다른 값도 바뀐다. 이를 생각하면 편하다.

**즉, 리액트는 특정 데이터의 변화에 따른 반응에 최적화된 라이브러리다.**

 

## MVC

모델, 뷰, 컨트롤러 패턴.

리액트는 `View`에 집중화한 라이브러리.

### 컴포넌트

- 재사용성.
- 런타임 시점에 사용
- HTML, style, JavaSCript, Event, State로 이루어진 하나의 객체

## Virtual DOM

- DOM이 아니라, 필요한 부분만 한 번에 렌더링하도록 구성한 가상의 DOM 객체
- **성능보다는 개발을 편하게 할 수 있도록 도입**

 

## 라이브러리, 프레임워크는 DX를 위해 나왔다.

이런 오픈소스가 있기에, 최소한의 노력으로 최대의 효율을 낼 수 있는 것.

**Easy to Learn, Hard to Master**

## 처음에는 컴포넌트만 열심히 생각

**재사용성, 확장성을 처음부터 생각하기란 쉽지 않다.**

눈에 보이는 UI를 컴포넌트로 먼저 구현하자.

그러면서 UI를 점차 추상적으로 바라보자.

**컴포넌트의 가장 큰 장점은 쉽게 코드를 버릴 수 있다는 점**