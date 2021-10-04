![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# 조건부 렌더링이란

## `v-if`

가장 단순한 조건문.

여기서 특이한 건, `v-else-if`, `v-else`등의 조건문을 토대로 더욱 다이나믹하게 분기에 맞춰 연산이 가능하다는 것! 어썸하다.

다만, 주의할 점이 있는데

- **만약 `v-else-if` `v-else`를 같이 쓴다면, 같은 `element depth`에서 해줘야 한다!**
- **결국 `div`를 추가로 쓰게 될 수 있는데, 이것이 싫다면 `template`이라는 것으로 써야 한다!**
    
    (`template` 태그의 발명은 가히 혁명에 가깝다고 생각한다. 개인적으로 말이다.)
    

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/vue@next"></script>
  <title>Document</title>
</head>
<body>
  <div id="app">
    <h1 v-if="isShow">Hello Vue!</h1>
    <template v-else-if="[]">
      <div>Application</div>
      <p>HI!</p>
    </template>
    <h2 v-else>GOOD MORNING!</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          isShow: null
        }
      }
    }
    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

### 주의사항

- **`v-if`와 `v-for`을 같이 사용하는 것은 주의!**
    
    **`v-if`가 먼저 우선해서 해석된다. 따라서 혼란의 우려가 있으므로 권장하지 않는다.**
    
    굳이 쓴다면 다음과 같이 써야 한다. 즉, `template` 를 매개로 하여 쓴다!
    
    ```jsx
    <ul>
      <template v-for="user in users" :key="user.id">
        <li v-if="user.isActive">
          {{ user.name }}
        </li>
      </template>
    </ul>
    ```
    

---

## `v-show`

이 역시 `v-if`와 비슷하게 사용할 수 있다! 단 `v-else-if` `v-else`는 사용할 수 없다.

**주의할 게 있는데, `template` 태그는 사용할 수 없다.**

```jsx
<div id="app">
  <!-- <h1 v-if="">Hello Vue!</h1> -->
  <div v-show="isShow">
    <div>Application</div>
    <p>HI!</p>
  </d>
  <h2>GOOD MORNING!</h2>
</div>
```

### v-cloak

`v-show`와 함께 사용.

초기에 데이터를 준비하는 동안 `{{}}` 구문이 보일 수 있다. 이때, 이를 보여주지 않도록 하기 위함이다. **즉 컴파일이 완료될 때까지 표기되지 않는다!**

## `v-if`와 `v-show`의 차이

### v-if: 아예 구조적으로 만들거나 만들지 않도록 한다.

### v-show: 구조적으로는 만들어놓되, `display: none`으로 제어를 한다.

즉, 정리하면

- **초기 렌더링 비용이 중요! : `v-if`**
- **전환 비용이 중요!: `v-show`**