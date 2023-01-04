# ErrorBoundary(에러 경계)

이전 커밋에서 [Suspense](./Suspense.md)를 이야기하며 `ErrorBoundary`라는 것이 특정 에러를 캐치하여 적절하게 이에 대응하는 컴포넌트를 렌더링한다는 것을 설명했다.

그렇다면, 이 에러 경계는 어떻게 설계해야 하는지 고민해보도록 하자.

## 원리 - LifeCycle Method

아직 `ErrorBoundary`를 함수형으로 구현한 것을 보지 못했다.
이유가 무엇일까? 바로 라이프사이클 메서드를 활용하기 때문이다.

[React 18 공식문서](https://ko.reactjs.org/docs/error-boundaries.html)에서는 다음 두 가지 생명주기에 대해 정의하면 `ErrorBoundary`를 만들 수 있다고 한다.

+ `static getDerivedStateFromError()`: `fallback UI`를 렌더링하는 데 `state`를 전달하기 위해 사용한다.
+  `componentDidCatch()`: 에러 정보를 기록하는 용도로 사용한다.

## `try/catch`

이는 기존의 명령형 코드에서 `API`의 결과를 나오도록 한다. 
실제로 이전에는 이를 컴포넌트 내에서 처리함으로써, `API`를 불러오고 이에 관한 상태에서 렌더링할 UI를 정해주었다.

다만 이로 인해 `loading`이라는 `pending` 상태를 파악할 `state`가 나와야 하고, `error`이라는 `state`가 나와야 했다.

즉 반복되는 로직이 예상되는데, 이를 매 순간마다 체크해야 한다는 것이 굉장히 귀찮아진다.

나아가 리액트는 선언적으로 `UI`를 render하는 `JSX`문법을 사용한다.  
이러한 로직을 처리할 때마다 삼항 연산자 및 조건 연산자를 적용한 모습은 가히 보기가 불편했다.  
반면 `ErrorBoundary`는 선언적으로 적절한 라이프사이클 내에서의 핸들링을 통해 UI를 렌더링해준다. 따라서 적절한 대안이라 할 수 있다.