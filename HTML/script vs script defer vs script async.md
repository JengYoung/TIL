## HTML의 파싱 과정

먼저 본 주제를 설명하기 전에, HTML 파싱 과정을 이해해야 한다.

`HTML`은 동기적으로 파싱되며, 기본적으로 스크립트 파일을 발견할 시

1. 파싱을 중단하고
2. script를 fetch하고
3. 완료될 시 실행

하는 순서로 진행된다.

---

## script

`defer`혹은 `async`가 없는 script는 본 파싱 과정을 그대로 수행한다.

![https://blog.asamaru.net/res/img/post/2017/05/script-async-defer-1.png](https://blog.asamaru.net/res/img/post/2017/05/script-async-defer-1.png)

### 한계점

fetch하는 시간 동안 HTML을 파싱할 수 없다. 따라서 전체적으로 웹 브라우저에 렌더링되는 시간이 길어진다.

---

## script async / defer

- 이때 이러한 렌더링 시간을 최적화하기 위해 검토할 만한 속성이 `async`와 `defer`
- 비동기적으로 fetch를 진행하기 때문에 결과적으로 렌더링 시간을 단축
- 외부 파일을 가져오는 방식이므로 `src` 속성이 필요

### async

![https://blog.asamaru.net/res/img/post/2017/05/script-async-defer-2.png](https://blog.asamaru.net/res/img/post/2017/05/script-async-defer-2.png)

- 비동기적으로 script fetch를 하고, 완료 시 HTML 파싱을 중단, 스크립트를 실행

그러나 다음과 같은 상황에 유의해야 한다!

![https://media.vlpt.us/images/young_pallete/post/c8985292-68d4-4810-97c7-9755da5f27bc/%ED%8C%8C%EC%8B%B15.png](https://media.vlpt.us/images/young_pallete/post/c8985292-68d4-4810-97c7-9755da5f27bc/%ED%8C%8C%EC%8B%B15.png)

- 만약 **script 1이 2보다 반드시 우선해야 하는 상황이라면** 이때는 의도치 않은 결과가 발생
- 다른 파일들과의 종속성 검토 여부가 필수적으로 요구
- 이때, HTML5 스펙에 `async=false`로 지정 시 순차적으로 실행이 가능하다고 하니, 참고하자!(default: true)

### defer

![https://blog.asamaru.net/res/img/post/2017/05/script-async-defer-3.png](https://blog.asamaru.net/res/img/post/2017/05/script-async-defer-3.png)

- 말 그대로 실행을 HTML 파싱이 끝날 때까지 지연시키는 방식.
- 브라우저 호환성에서 다를 수 있으므로 그냥 <body> 태그 직전에 삽입 권장
- 스크립트간 순서를 보장해주기 때문에 비동기적 fetch에 따른 문제점 최소화

---

## 브라우저 지원

IE10을 제외한 거의 모든 브라우저에서 지원.

그러나 동작 방식이 조금씩 상이할 수 있다.

### async, defer 속성이 모두 지정되는 경우

- 두 속성 모두 지원하는 브라우저라면 `async`가 우선
- async 속성을 지원하지 않는다면 defer 속성 지원에 따라 결과가 다르다.
- 둘 다 지원하지 않을 시 동기적으로 처리
-

---

## 참고자료

[script의 async와 defer 속성(블로그)](https://blog.asamaru.net/2017/05/04/script-async-defer/)
