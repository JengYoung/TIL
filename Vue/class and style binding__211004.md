![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# 클래스에 대하여

## 첫 번째 방식 - 삼항 연산자

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
    <button @click="toggle">Toggle</button>
    <h2 :class="isActive ? 'active' : ''">{{ msg }}</h2>
  </div>
  <style>
    .title {
      color: royalblue;
      font-size: 5rem;
    }
    .active {
      color: red;
    }
  </style>
  <script>
    const App = {
      data() {
        return {
          msg: 'Hello Vue!',
          isActive: false
        }
      },
      watch: {
 
      },
      methods: {
        toggle() {
          this.isActive = !this.isActive;
        }
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

## 두 번째 방식: 객체 (여러 클래스 등록)

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
    <button @click="toggle">Toggle</button>
    <h2 :class="{ active: isActive, 'small orange': isSmall }">{{ msg }}</h2>
  </div>
  <style>
    .title {
      color: royalblue;
      font-size: 5rem;
    }
    .active {
      color: red;
    }
    .small {
      font-size: 2.5rem;
    }
    .orange {
      color: orange;
    }
  </style>
  <script>
    const App = {
      data() {
        return {
          msg: 'Hello Vue!',
          isActive: false,
          isSmall: false,
        }
      },
      watch: {
 
      },
      methods: {
        toggle() {
          this.isActive = !this.isActive;
          this.isSmall = !this.isSmall;
        }
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

## 세 번째 방식: `classObject` data 활용

```jsx
<div id="app">
    <button @click="toggle">Toggle</button>
    <h2 :class="classObj">{{ msg }}</h2>
  </div>
  <style>
    .title {
      color: royalblue;
      font-size: 5rem;
    }
    .active {
      color: red;
    }
    .small {
      font-size: 2.5rem;
    }
    .orange {
      color: orange;
    }
  </style>
  <script>
    const App = {
      data() {
        return {
          msg: 'Hello Vue!',
          isActive: false,
          isSmall: false,
          classObj: { active: false, 'small orange': false }
        }
      },
      watch: {
 
      },
      methods: {
        toggle() {
          this.classObj.active = !this.classObj.active;
          this.classObj['small orange'] = !this.classObj['small orange'];
        }
      }
    }
```

## 네 번째 방법: `computed` 활용

```jsx
const App = {
    data() {
      return {
        msg: 'Hello Vue!',
        isActive: false,
        isSmall: false,
      }
    },
    computed: {
      classObj() {
        return {
          active: !this.isActive,
          'small orange': !this.isSmall
        }
      }
    },
    methods: {
      toggle() {
        this.isActive = !this.isActive;
        this.isSmall = !this.isSmall;
      }
    }
  }
```

## 다섯 번째 방법: 배열 활용

```jsx
<h1 :class="['active', 'title']">Hello Vue!</h1>
```

```jsx
<div id="app">
    <button @click="changeTitle">clcik me!</button>
    <h1 :class="[isActive, title]">Hello Vue!</h1>
  </div>
  <style>
    .title {
      color: royalblue;
      font-size: 5rem;
    }
    .active {
      color: red;
    }
    .title--small,
    .small {
      font-size: 2.5rem;
    }
    .orange {
      color: orange;
    }
  </style>
  <script>
    const App = {
      data() {
        return {
          msg: 'Hello Vue!',
          isActive: 'active',
          isSmall: false,
          title: 'title'
        }
      },
      computed: {
        classObj() {
          return {
            active: !this.isActive,
            small: !this.isSmall
          }
        }
      },
      methods: {
        changeTitle() {
          this.title = this.title === 'title' ? 'title--small' : 'title'
        }
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
```

# 스타일 바인딩

### 첫 번째 방법: 순수 문자열로 쓰기

다음과 같이 `style`을 동적으로 바인딩할 수 있다.

```jsx
<div id="app">
  <h1 :style="`color: ${color};`">Hello Vue!</h1>
</div>

<script>
  const App = {
    data() {
      return {
        msg: 'Hello Vue!',
        isActive: 'active',
        isSmall: false,
        title: 'title',
        color: 'red',
      }
    },
```

### 방법 두 번째: 객체에 담아서 쓰기

```jsx
<div id="app">
  <h1 :style="{ color }">Hello Vue!</h1>
</div>
```

## 여러 개의 이벤트 리스너 등록

다음과 같이 한 이벤트에 대해 여러 개를 등록할 수 있다.

```jsx
<div id="app">
    <button @click="onClick(); onIncreaseWidth()">CLICK!</button>
    <h1 :style="{ color, width: `${width}px`, background: `yellow` }">Hello Vue!</h1>
  </div>
  <script>
    const App = {
      data() {
        return {
          width: 200,
          color: 'red',
        }
      },
      methods: {
        onClick() {
          this.color = this.color === 'red' ? 'blue' : 'red';
        },
        onIncreaseWidth() {
          this.width += 10;
        }
      }
    }
```

**이를 통해 내부에서는 `addEventListener`으로 변환시켜준다는 것을 직감할 수 있다!**

### 방법 세 번째: `data, computed`를 이용해서 쓰기

```jsx
<div id="app">
    <button @click="onClick(); onIncreaseWidth()">CLICK!</button>
    <h1 :style="styleObject">Hello Vue!</h1>
  </div>
  <script>
    const App = {
      data() {
        return {
          width: 200,
          color: 'red',
        }
      },
      computed: {
        styleObject() {
          return {
            color: this.color,
            width: this.width + 'px',
            background: 'yellow'
          }
        }
      },
      methods: {
        onClick() {
          this.color = this.color === 'red' ? 'blue' : 'red';
        },
        onIncreaseWidth() {
          this.width += 10;
        }
      }
    }
```

참고로 `css`의 경우, `camelCase`를 지원한다.

```jsx
<h1 :style="{...styleObject, 'background-color': `orange`}">Hello Vue!</h1>
```

이는

```jsx
<h1 :style="{...styleObject, 'backgroundColor': `orange`}">Hello Vue!</h1>
```

와 같다.

### 네 번째 방법, 배열로 나열하기.

```jsx
<h1 :style="[styleObject, { 'background-color': `orange` }]">Hello Vue!</h1>
```