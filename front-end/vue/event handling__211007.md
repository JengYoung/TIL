![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# 이벤트 핸들링이란

그저 `addEventListener`와 비슷한 느낌의 친구들.

`v-on`이라는 디렉티브를 사용하며 `@`를 디렉티브 약어로 쓸 수 있다.

```jsx
<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

## 인라인 메소드 핸들러

다음처럼 인라인으로 `JavaScript` 구문을 사용 가능하다.

만약 여기에 `event` 인자가 필요하다면, `$event`를 넣어주면 된다. 이때, 순서는 상관 없다. 넣어주기만 하면 된다.

```jsx
<div id="inline-handler">
  <button @click="say('hi')">Say hi</button>
  <button @click="say('what')">Say what</button>
</div>
```

```jsx
Vue.createApp({
  methods: {
    say(message) {
      alert(message)
    }
  }
}).mount('#inline-handler')
```

### 여러 개를 추가하는 방법

`a(); b(); c();`처럼 나열하여 연속적으로 메소드 여러 개를 실행할 수 있다. 혹은 쉼표로도 가능하다.

### 이벤트 수식어

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

**예시**

```jsx
<div id="app">
    <a href="https://google.com" target="_blank">Google</a>
  </div>
  <script>
    window.addEventListener('load', () => {
      const aEl = document.querySelector('a');
      aEl.addEventListener('click', e => {
        e.preventDefault()
      })
    })
```

이는 다음과 같다.

```jsx
<a href="https://google.com" target="_blank" @click.prevent>Google</a>
```

체이닝도 가능하다.

```jsx
<a href="https://google.com" target="_blank" @click.prevent.once="log">Google</a>
```

이렇게 `once`를 체이닝하면, 1번만 바인딩되고, 이후에는 수식어와 메소드가 연결이 끊겨 제대로 동작하지 않는다.

`stopPropagation`도 가능하다.

현재는 `child`를 클릭하면 `parent`와 `child` 모두가 콘솔에 출력된다. 

```jsx
<style>
    .parent {
      width: 200px;
      height: 100px;
      background-color: royalblue;
      padding: 1.5rem;
    }
    .child {
      width: 100px;
      height: 80px;
      background-color: orange;
    }
  </style>
  <div id="app">
    <div class="parent" @click="log">
      <div class="child" @click="log"></div>
    </div>
  </div>
  <script>
    const App = {
      methods: {
        log() {
          console.log(event.currentTarget)
        }
      }
    }
    const vm = Vue.createApp(App).mount('#app');
  </script>
```

이를 `.stop` 수식어를 통해 막아주면 이벤트 전파가 중단된다.

```jsx
<div class="parent" @click="log">
  <div class="child" @click.stop="log"></div>
</div>
```

캡쳐링 또한 가능한데, 이는 `.capture`을 통해 가능하다.

```jsx
elem.addEventListener('click', () => {
  console.log("window")
}, { capture: true })
```

이는 다음과 같다.

```jsx
<div class="parent" @click.capture="log">
  <div class="child" @click="log"></div>
</div>
```

`.self`의 경우는, 이렇게 이벤트가 동시에 발생하는 것이 싫을 때, 지정해놓으면 해당 부분만 이벤트가 발생하도록 돕는다.

`.passive`의 경우 스크롤 동작에 대한 연산을 동작과 별개로 비동기적으로 처리함으로써 깔끔한 `UX`를 돕는다.

```jsx
<style>
    .parent {
      width: 200px;
      height: 200px;
      border: 4px solid;
      overflow: auto;
    }
    .child {
      font-size: 100px;
    }
  </style>
  <div id="app">
    <div 
      class="parent"
      @wheel="log">
      <div v-for="n in 15" class="child">
        {{ n }}
      </div>
    </div>
  </div>
  <script>
    const App = {
      methods: {
        log() {
          for (let i = 0; i < 10000; i += 1) {
            console.log('wheel!')
          }
        }
      }
    }
    const vm =
```

### 키 수식어

키 수식어의 경우 다음과 같이, 키를 간편하게 지정해준 것처럼 동작한다.

```jsx
<input @keyup.enter="submit" />
```

케밥 케이스로도 가능하다.

```jsx
<input @keyup.page-down="onPageDown" />
```

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` (meta는 command key(⌘). 윈도우 키보드에서 meta는 윈도우키)
- `.enter`
- `.tab`
- `middle` 마우스 가운데 휠
- `.delete` (“Delete” 와 “Backspace” 키 모두를 캡처합니다)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

체이닝으로도 사용이 가능하며, 키 + 다른 동작(클릭) 등과 체이닝을 통해 연계도 가능하다.

**주의! `meta`의 경우 `keyup`에서는 동작하지 않는다. `keydown`에서만 동작한다! (운영체제가 중간에 가로채감)**

**또한 해당 키가 눌렀는지만 확인하지, 추가 동작까지는 판별하지 않는다.
이를 해결하기 위해서는 `exact`를 추가로 체이닝해야 한다.**

## HTML 리스너의 장점

- SFC에서, HTML 템플릿을 간단히 하여 JavaSCript 코드 내에서 핸들러 함수 구현이 용이해짐.
- 수동 연결 필요 없기에 테스트가 용이해진다.
- 이벤트 제거에 대한 걱정이 필요없어진다. (뷰 모델이 파기되면 모든 리스너가 자동 제거됨)