![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# Non-prop

쉽게 생각하자. `prop`이란 `v-bind`되어, 기본 속성은 아니지만 새롭게 만들어져 물려받은 속성이다.

`Non-prop`은 이와 반대이다. `class, style`과 같은 `props`로 지정되지 않은 속성인 애들을 말한다. 

## 예시

다음은 루트 노드의 어느 부분에 해당하는지 모를 때, `class`를 넣지 않는 모습이다.

### App.vue

```jsx
<template>
  <h1 v-if="msg" class="message" @click="log">
    {{ msg }}
  </h1>
  <Hello class="hello" style="font-size: 100px" @click="msg += '!'" />
</template>

<script>
import Hello from '@/components/Hello';
export default {
  components: {
    Hello,
  },
  data() {
    return {
      msg: '왜???',
    };
  },
  methods: {
    log() {
      window.addEventListener();
    },
  },
};
</script>

<style lang="scss">
h1 {
  color: red;
}
</style>
```

### Hello.vue

```jsx
<template>
  <h1>Hello</h1>
  <h2>Haha?!</h2>
</template>

<style lang="scss" scoped>
/* scoped: style hash를 부여 */

$color: orange;
h1 {
  color: $color;
}
</style>
```

이를 해결하려면, `$attrs`를 사용해야 한다.

```jsx
<template>
  <h1 :class="$attrs.class" :style="$attrs.style">Hello</h1>
  <h2 @click="$attrs.onClick">Haha?!</h2>
</template>

<style lang="scss" scoped>
/* scoped: style hash를 부여 */

$color: orange;
h1 {
  color: $color;
}
</style>
```

`haha?!`를 클릭할 때마다, 느낌표가 잘 나온다.

![$attrs 결과](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d61644b7-4bbd-4a70-914a-4295ce80e3e4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211008%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211008T024336Z&X-Amz-Expires=86400&X-Amz-Signature=34bcfbaed043f5a0268969af54178e6ab98b5ce8dfa39160cccf89d22f56f81a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

`$attrs`도 `v-bind`를 통해 모두 전달할 때, 한 줄로 표현이 가능하다.

```jsx
<template>
  <h1 v-bind="$attrs">Hello</h1>
  <h2>Haha?!</h2>
</template>

<style lang="scss" scoped>
/* scoped: style hash를 부여 */

$color: orange;
h1 {
  color: $color;
}
</style>
```

## 다중 루트 `Non-prop`속성 상속

만약 단일 루트가 아니라면, 기본적으로 `$attrs`를 명시적으로 제시하지 않는다면 속성이 상속되지 않는다.

이를 다중 루트 속성 상속이라 한다.

## 단일 루트 `Non-prop`속성 상속 거부

단일 루트는 자동적으로 `Non-prop` 속성도 상속한다.

이것이 싫다면, `export default {` 다음에 `inheritAttrs: false`를 지정한다.