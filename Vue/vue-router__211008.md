![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# Vue Router

쉽게 말해서 `react-router`과 매우 유사하다.

그냥 간단히 살펴보면, `Pages`라는 것을 따로 만들고, 여기서 간단히 `page`들을 처리해줘도 될 듯하다.

`index.js`에서는 다음과 같이, `react-router`에서 했던 것처럼 라우트에 대한 컴포넌트 정보를 가져온다.

```jsx
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/routes/Home';
import About from '@/routes/About';
import Docs from '@/routes/Docs';
import NotFound from '@/routes/NotFound';
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/documents/:id',
      component: Docs,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});
```

## 동적 파라미터

`$route`라는 프로퍼티를 통해 현재 라우트의 파라미터를 체크 가능하다.

### Docs.vue

```jsx
<template>
  <h1>Docs.vue</h1>
  <h2>{{ $route.params.id }}</h2>
</template>
```

## 하위 경로 지정

라우터에서 해당 라우트의 하위 경로를 지정해줄 수 있다.

이때, `'/'`는 생략한다. (이는 곧, 루트 절대 경로를 의미하기 때문)

```jsx
{
  path: '/documents',
  component: Docs,
  children: [
    {
      path: ':id',
      component: Docs,
    },
  ],
},
```

### 단점

이때, `Docs.vue`를 `DocsId.vue`가 공유받게 된다.

따라서 이를 막으려면, 아예 애초부터 `children`으로 받는 것이 아닌, 독립적으로 받으면 된다.