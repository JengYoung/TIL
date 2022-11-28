![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# 폼 입력 바인딩이란?

다음을 살펴보자.

이에 대한 결과는, 인풋을 통해 실제 `msg`를 변화시킬 수 없다. 따라서 화면에 **입력된 데이터가 실제 데이터를 변화시키기 위해 양방향 데이터 바인딩이 필요하게 된다.**

```jsx
<style>
  </style>
  <div id="app">
    <h1>{{ msg }}</h1>
    <input type="text" :value="msg"/>
  </div>
  <script>
    const App = {
      data() {
        return {
          msg: 'Hello Vue!'
        }
      },
      methods: {
      }
    }
    const vm = Vue.createApp(App).mount('#app');
  </script>
```

```jsx
<div id="app">
  <h1>{{ msg }}</h1>
  <input type="text" :value="msg" @input="onInput"/>
</div>
<script>
  const App = {
    data() {
      return {
        msg: 'Hello Vue!'
      }
    },
    methods: {
      onInput(e) {
        this.msg = e.target.value
        console.log(this.msg)
      }
    }
  }
```

### 하지만 `Vue`는 이게 마음에 들지 않았다.

그냥 양방향 데이터 바인딩을 손쉽게 처리할 수 있다면?

이러한 생각에, `Vue`는 `v-model`을 만들었다.

```jsx
<input type="text" v-model="msg"/>
```

## 주의사항

`v-model`은 한글에 대한 입력에 완벽하지 않다.

따라서 다음처럼 하는 것을 권장한다.

```jsx
<input type="text" v-:value="msg" @input="msg = $event.target.value"/>
```

## 데이터를 기본 속성보다 더욱 우선

`vue`의 경우 동작 방식을 기본 속성보다, 데이터 값을 더욱 우선적으로 적용하는 성향이 있다.

```jsx
<input v-model="checked" type="checkbox" @click="onCheck" checked>
```

## 줄바꿈 처리에 대한 양방향 바인딩

제대로 처리되지 않는 이유는 스타일 속성 때문.

따라서 `white-space`를 `pre-line`으로 바꿔준다.

```jsx
<style>
  </style>
  <div id="app">
    <textarea 
      v-model="msg"
      @change="log">
     </textarea>
    <h1
      style="white-space: pre-line;"
    >
      {{ msg }}
    </h1>
  </div>
  <script>
    const App = {
      data() {
        return {
          msg: 'veloGue!'
        }
      },
      methods: {
        log() {
          console.log(this.msg)
        }
      }
    }
    const vm = Vue.createApp(App).mount('#app');
  </script>
```

## 여러 체크박스 배열로 바인딩

말 그대로, 여러 체크박스가 있다면 배열을 통해 양방향 바인딩이 가능해진다.

```jsx

<div id="app">
  <input v-model="checked" type="checkbox" value="jengyoung1">
  <input v-model="checked" type="checkbox" value="jengyoung2">
  <input v-model="checked" type="checkbox" value="jengyoung3">
  <input v-model="checked" type="checkbox" value="jengyoung4">
</div>
<script>
  const App = {
    data() {
      return {
        checked: []
      }
    },
    watch: {
      checked(newValue) {
        console.log(newValue);
      }
    }
  }
  const vm = Vue.createApp(App).mount('#app');
</script>
```

만약 `radio` type이라면 간단하게 `checked`를 `''`로 지정해주면 된다. 어차피 value가 하나이기 때문.

select도 마찬가지다.

```jsx
<div id="app">
    <select v-model="selected">
      <option value="">하나를 선택하세용</option>
      <option value="apple">사과</option>
      <option value="banana">바나나</option>
      <option value="cherry">체리</option>
    </select>
  </div>
  <script>
    const App = {
      data() {
        return {
          selected: ''
        }
      },
      watch: {
        selected(newValue) {
          console.log(newValue);
        }
      }
    }
```

이때 만약, `value`를 제거한다면 `textContent`가 대신 `value`로 인식된다.

또, 이는 `v-for`문으로 다음과 같이 처리할 수 있다.

```jsx
<div id="app">
    <select v-model="selected">
      <option value="">하나를 선택하세용</option>
      <option v-for="fruit in fruits" :key="fruit.value" :value="fruit.value">{{ fruit.text }}</option>
    </select>
  </div>
  <script>
    const App = {
      data() {
        return {
          selected: '',
          fruits: [
            { text: '사과', value: 'apple' },
            { text: '바나나', value: 'banana' },
            { text: '체리', value: 'cherry' },
          ]
        }
      },
      watch: {
        selected(newValue) {
          console.log(newValue);
        }
      }
    }
    const vm = Vue.createApp(App).mount('#app');
```

## 수식어

### `.lazy`

마치 `v-model`을 `change`와 비슷한 이벤트처럼 동작하게 한다.

### `.number`

사용자가 입력한 문자를 숫자로 형변환시켜준다.

### `.trim`

문자의 앞뒤 공백을 제거를 자동 처리해준다. 
그 다음에 결과를 기존 데이터와 비교해주기 때문에, 만약 띄어쓰기만 수행했다면 `watch`에 감시되지 않는다.