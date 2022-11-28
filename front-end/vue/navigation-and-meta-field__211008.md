![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# 네비게이션 가드

## Global Before Guards

### beforeEach 메서드

각각의 페이지들에 접근하기 직전의 동작들을 정의한다.

대개 권한이 있어야 하는 페이지에 접근할 때 사용.

### next

다음 동작을 정의할 때 쓰는 함수.

이때, 여러 개를 쓰면 안 된다. 다만, `if` `else`

처럼 서로 영향을 받지 않는다면 가능하다.

## Global Resolve Guards

먼저 `Before Guards`가 동작하고, 그 다음 `In-component Guards`이 동작한 다음 최종적으로 승인될 때 `Global Resolve Guards`가 동작한다.

### Global After Hooks

제일 마지막에 실행되는 훅.

뭔가 보호하는 로직을 작성할 수는 없다.

### Per-Route Guard

이렇게 아싸리 각 라우트마다 미리 정의할 수도 있다. 꿀! 만약 여러 개를 실행하고 싶다면, [] 안에 함수를 넣어주면 된다. 

아! 넣을 콜백들을 따로 정의해서 넣어줘도 된다.

여기서 `beforeEnter`란 들어갈 때 딱 한 번 호출한다.

특히, `params` / `hash` / `query`에 대한 변화로는 트리거되지 않는다는 게 특이점이다.

```jsx
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

## in-component Guard

컴포넌트 내부에서 사용할 수 있는 가드.

웬만하면 꼭 필요한 것이 아니라면 사용하지는 말자.

왜냐하면, 이후 코드가 복잡해질 수록 가드들이 많아지면 코드 추적이 힘들어지기 때문이다.

```jsx
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) { // 라우트에 들어가기 직전.
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
  beforeRouteUpdate(to, from) { // 라우트가 변경될 때
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, given a route with params `/users/:id`, when we
    // navigate between `/users/1` and `/users/2`, the same `UserDetails` component instance
    // will be reused, and this hook will be called when that happens.
    // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
  },
  beforeRouteLeave(to, from) { // 현재 라우트를 벗어날 때
    // called when the route that renders this component is about to
    // be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
  },
}
```

## 동작 순서

1. Navigation triggered.
2. Call `beforeRouteLeave` guards in deactivated components.
3. Call global `beforeEach` guards.
4. Call `beforeRouteUpdate` guards in reused components.
5. Call `beforeEnter` in route configs.
6. Resolve async route components.
7. Call `beforeRouteEnter` in activated components.
8. Call global `beforeResolve` guards.
9. Navigation is confirmed.
10. Call global `afterEach` hooks.
11. DOM updates triggered.
12. Call callbacks passed to `next` in `beforeRouteEnter` guards with instantiated instances.

## meta

어떠한 기능을 수행하지는 않음. 하지만 어떤 동작을 처리하는 데 필요한 데이터를 라우터에서 정의한 것.

실제로 만약 로그인 페이지를 만든다면 어떻게 될까?

다음과 같이 하면 간단한 로그인 페이지 기능을 구현할 수 있다.

## 예시

### App.vue

딱히 특이한 건 없다. 먼저 스통에서 필요한 것들을 다 가져온 뒤, 이를 다 매칭 시켰다.

```jsx
<template>
  <RouterLink to="/">HOME...</RouterLink>
  <RouterLink to="/about">ABOUT...</RouterLink>
  <button v-if="!isLoggedIn" @click="logIn">LOGIN!</button>
  <button v-else @click="logOut">LOGOUT!</button>
  <RouterView />
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
  },
  created() {
    this.$store.dispatch('user/initialize');
  },
  methods: {
    logIn() {
      this.$router.push('/login');
    },
    logOut() {
      this.$store.dispatch('user/logOut');
    },
  },
};
</script>
```

### HOME.vue

현재 HOME은 `ScrollBehavior`을 테스트하기 위해 이렇게 만들었다.

```jsx
<template>
  <h1>HOME~</h1>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
    <li>17</li>
    <li>18</li>
    <li>19</li>
    <li>20</li>
  </ul>
</template>

<style lang="scss" scoped>
li {
  height: 100px;
  font-size: 40px;
}
</style>
```

### Login.vue

로그인은 다음과 같이 양방향 바인딩을 통해 데이터를 입력하고, 이를 버튼을 통해 로그인하는 기능을 구현했다.

```jsx
<template>
  <form @submit.prevent>
    <input v-model="userID" placeholder="Input Your ID!" type="text" />
    <input v-model="userPassword" placeholder="Input Your Password!" type="password" />
  </form>
  <button @click="logIn">LogIn!</button>
</template>

<script>
export default {
  data() {
    return {
      userID: '',
      userPassword: '',
    };
  },
  methods: {
    logIn() {
      console.log(this.userID, this.userPassword);
      this.$store.dispatch('user/logIn', {
        id: this.userID,
        password: this.userPassword,
      });
    },
  },
};
</script>
```

### About.vue

```jsx
<template>
  <h1>About!</h1>
</template>
```

### routes/index.js

여기가 중요하다.

먼저 `ScrollBehavior`을 통해 새로 고침 시 맨 위로 올라가도록 제어했다.

그 다음에, `meta`를 이용하여 `About`의 접근을 제한했다.

```jsx
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/routes/Home';
import About from '@/routes/About';
import Login from '@/routes/Login';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      component: Login,
    },
  ],
});
```

### store/user.js

여기가 가장 중요하다. 

일단 `router`을 바로 쓸 수 없어서, `import`시켰다.

그 다음, 로그인 쪽을 보면, `router`의 `currentRoute`를 통해 현재 라우트의 정보를 가져왔다.

이후, `meta` 정보를 확인하거나 쿼리가 있다면 이를 다시 `redirect`하는 방식으로 구현했다.

결과적으로 이제는, 기존에 로그인하기 전 마지막으로 클릭했던 `About` 화면으로 돌아갈 수 있는 것이다.

```jsx
import router from '@/routes';
export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    updateLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    initialize({ commit }) {
      if (localStorage.getItem('isLoggedIn')) {
        commit('updateLoggedIn', true);
      }
    },
    logIn({ commit }, payload) {
      const { id, password } = payload;
      if (id && password) {
        localStorage.setItem('isLoggedIn', true);
        commit('updateLoggedIn', true);
        const { redirect } = router.currentRoute.value.query;
        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/');
        }
      }
    },
    logOut({ commit }) {
      localStorage.removeItem('isLoggedIn');
      commit('updateLoggedIn', false);
      const { requiresAuth } = router.currentRoute.value.meta;
      if (requiresAuth) {
        router.push('/');
      }
    },
  },
};
```