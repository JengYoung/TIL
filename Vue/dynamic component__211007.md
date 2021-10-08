![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# 동적 컴포넌트란?

말 그대로, 동적으로 컴포넌트를 생성하거나, 화면상에서 사라질 수 있는 컴포넌트를 의미한다.

## 어떻게 구현하는가?

기본적으로는 `component` 태그를 이용한다.

```jsx
<component :is="currentTabComponent"></component>
```

이는 자주 전환되는 애들에게는 좋지 않다.

왜냐하면, `created`와 `unmount`를 반복하기 때문이다.

따라서, 자주 전환되는 애들이라면 `keep-alive` 도입이 필요하다.

```jsx
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

# 비동기 컴포넌트

앱에서 필요할 때만 컴포넌트 로드도 가능하다.

이는 `defineAsyncComponent`를 통해 가능하다.

```jsx
const { createApp, defineAsyncComponent } = Vue
const app = createApp({})

const AsyncComp = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)

app.component('async-example', AsyncComp)
```

`reject`를 이용하여 실패 역시 나타낼 수 있다.

지역 컴포넌트에서 역시 사용 가능한데, 다음과 같이 사용할 수 있다.

```jsx
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

이때 **비동기 컴포넌트들은 기본적으로 suspensible**하다. 상위 체인에 `Suspensible`이 있다면 해당 체인의 비동기 종속성 처리가 된다고 한다.

이는 곧, 해당 컴포넌트의 로딩, 에러, 딜레이, 타이머 등을 무시시킨다. 

이를 해제하기 위해서는 `suspensible: false` 옵션을 통해 컴포넌트가 스스로 옵션 제어가 가능케 할 수 있다.