# useQuery

`react-query`에서 데이터의 캐시 키와 Promise를 반환하는 함수를 기반으로 데이터의 상태를 관리해주기 위한 훅이다.  

> 즉, 리액트 컴포넌트 안에서만 사용이 가능하다는 점, 꼭 참고하시길 바란다.
> Next 13 버전에서 서버 컴포넌트에서는 사용이 불가능한 점을 통해 알 수 있다.

## 반환값

크게 다음과 같은 객체 값을 반환하고 있다.

### status

+ `loading`: 아직 데이터를 받아오지 않았다. 현재 데이터를 요청 중이다.
+ `error`: 에러를 내뱉었다.
+ `success`: 데이터 요청에 성공했다.
+ `idle`: 아직 페칭을 시작하지 않았다.
+ `isLoading`: `status === loading`이다.
+ `isSuccess`: `status === success`이다.
+ `isError`: `status === error`이다.
+ `isIdle`: `status === idle`이다.
+ `data`: 요청 성공한 데이터이다.
+ `refetch`: 다시 요청을 시작하기 위한 메서드이다.

### options

또한, `useQuery`는 3번째 인자로 여러 옵션들을 지정할 수 있다.