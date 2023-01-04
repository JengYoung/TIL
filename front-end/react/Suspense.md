# React.Suspense

16.6버전부터 추가된 리액트의 기능 중 하나다.

## 탄생 배경

사실 이 `React.Suspense`는 `Lazy Loding`을 효과적으로 처리하는 용도였다.  
예컨대 `Lazy`를 통해 컴포넌트를 동적으로 불러온다면, 결과적으로 모듈이 클 수록 소스를 불러오는 데 시간이 걸릴 것이다.  
이러한 상황 속에서 UX가 중단된다면 결과적으로 좋지 않은 상황을 야기할 확률이 높다.

따라서 이를 지원하는 게 `Suspense`이다. 이는 로드될 동안 대체할 것을 `fallback`이라는 `prop`으로 전달함으로써, 로딩에 대한 기능을 더욱 선언적으로 해결하는 우아한 컴포넌트였다.

## Data Fetching

하지만 더욱 발전되었으니.  
이제는 `Data`를 fetching하는 동안에도 사용될 수 있도록 바뀌었다.  
사실 엄밀히 따지자면, 데이터 역시 Lazy하게 가져온다는 측면에서 `Lazy Loading`에 속하므로 확장이라고 하기도 애매하긴 하다.  
여튼 `API`를 호출하는 동안 보여질 UI를 선언적으로 컨트롤하는 데 사용되는 컴포넌트로 그 기능이 확장되었다.

```js
const resource = fetchProfileData();
​
function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading posts...</h1>}>
      <ProfileTimeline />
    </Suspense>
  );
}
​
function ProfileTimeline() {
  // 비록 아직 불러오기가 완료되지 않았겠지만, 게시글 읽기를 시도합니다
  // read는 데이터 페칭 로직이 아닙니다. => 추후 설명
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

## 기존 비동기 처리 방식

`Suspense`를 적용하기 전에는 어떻게 비동기를 처리했을까?  
`try/catch`로직을 이용하여 `await`를 걸어주고, 결과적으로 `finally`를 통해 프로미스가 완료되었다는 것을 동기적으로 알려주는 형태로 개발했었다.  

이는 본질적으로 나쁘지 않다. 결국 데이터를 하나의 메모리에 저장해서, 상태를 파악한다는 측면에서 충분히 깔끔하다.  

다만 이를 UI적으로 그려내는데는 가독성이 좋지 않았다.

```jsx
export default function Component() {
  const [data, setData] = useState({ res1: null, res2: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  try {
    // 혹은 병렬로 처리하기 위해 Promise를 사용할 수 있다.
    const res1 = await fetchData1();
    const res2 = await fetchData2();
    set
  } catch(e) {
    setError(e.message);
  } finally {
    setIsLoading(() => false)
  }
  
  return (
    isLoading 
      ?  <div>Loading...</div>
      : error 
        ? <div>Error!</div> 
        : (
          <div>
            <div>{data.res1 ?? 'NULL!'}</div>
            <div>{data.res2 ?? 'NULL!'}</div>
          </div> 
        )
  )
}
```

## 애초부터 '상태'를 넘겨주면 어떨까? 

그런데, 이에 대한 발상을 바꾸어 보자.  

> `Promise`에서 상태 자체를 가져올 수는 없을까?

그래서 리액트는, `throw`로 예외를 발생시킨 다음, 여기서 나온 `Pending Promise`의 상태를 확인하여 적절한 UI를 전달하는 방법을 생각해낸 것이다.

```js
export function fetchProfileData() {
  let promise1 = fetchData1(); // 프로미스를 리턴

  return {
    data: getPromiseResource(promise1),
  };
}
​
function getPromiseResource(promise) {
  let status = 'pending';
  let result;
​
  // 프로미스 객체 자체
  let suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
​
  return {
    read() {
      if (status === 'pending') {
        throw suspender; // throw pending promise -> <Suspense /> catched this
      } else if (status === 'error') {
        throw result; // throw Error -> <ErrorBoundary /> catched this error
      } else if (status === 'success') {
        return result; // render intended UI
      }
    },
  };
}
```

주석으로 `Suspense`와 `ErrorBoundary`가 이를 적절하게 핸들할 것이라는 것을 남겨놓았다.  
그렇다. 이 선언적 로직의 핵심은 바로 위의 두 컴포넌트이다. 이제부터 좀 더 살펴보자!

## 에러를 효과적으로 잡을 수 없을까? `ErrorBoundary` 등장

[React 18 공식문서](https://ko.reactjs.org/docs/error-boundaries.html)에서는 `ErrorBoundary`라는 것을 설명했다.

이는 리액트의 생명주기를 이용해야 하기 때문에 아직 훅이 정의되지 않은 상태라 `Class`로 구현해야 한다.  
다음 두 가지 생명주기에 대해 정의하면 `ErrorBoundary`를 만들 수 있다.

+ `static getDerivedStateFromError()`: `fallback UI`를 렌더링하는 데 `state`를 전달하기 위해 사용한다.
+  `componentDidCatch()`: 에러 정보를 기록하는 용도로 사용한다.
  
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## ErrorBoundary, Suspense를 사용할 때의 변화

코드의 변화를 관찰해보자.

```jsx
function TemplateWithData() {
    const res1 = fetchData1.read();
    const res2 = fetchData2.read();

  return (
    <div>{data.name}<div/>
  )
}
​
function App() {
  return (
    <ErrorBoundary fallback={<Error/>}>
      <Suspense fallback={<Spinner/>}>
        <TemplateWithData />
      </Suspense>
    </ErrorBoundary>
  )
}
```

보이는가? 코드가 더욱 직관적이고 선언적으로 변해졌다. 
나아가 발생한 `throw`로 인한 부수효과를 적절한 핸들러 영역에서 처리해줌으로써 대수적 효과를 실현한 것이다. 

이제 개발자는 어디서 에러가 UI적으로 처리되고, 로딩이 UI적으로 어떻게 처리될지를 더욱 직관적으로 파악할 수 있다.



[Quanda Team blog - Algebraic Effects of React Suspense](https://blog.mathpresso.com/algebraic-effects-of-react-suspense-157b49807ea0)
[SynchronousAsync - React Suspense의 원리 코드](https://gist.github.com/sebmarkbage/2c7acb6210266045050632ea611aebee)