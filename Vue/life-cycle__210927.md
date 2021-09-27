![라이프사이클](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5cfffe8c-c111-4775-8178-dcb5a723f272/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210927%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210927T094613Z&X-Amz-Expires=86400&X-Amz-Signature=40ecac8cf5dbf45399e45b744257311d761898c59f0042bc0fca1eb3f92af749&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 라이프사이클이란?

우리가 실제 만들 때 `createApp` → `mount`를 통해 연결

기본적인 이벤트, 생명주기 → beforeCreate라는 메소드가 생기기 적전에 호출

### `injection` `reactivity`

데이터 주입 및 반응성 구조를 판단 후 `created`라는 `Vue` 인스턴스 생성 직후의 메서드가 실행됨.

### `template` option

템플릿 옵션을 갖고 있는지 없는지에 따라 또 둘이 나뉨

- **있다면**

    렌더 함수 내부에서 `template`가 컴파일 됨

- **없다면**

    `template`으로써 엘리먼트의 `innerHTML`을 컴파일한다

**즉, DOM과 연결한다는 것!**

### `beforeMount`

또 마운트 직전에 훅이 걸려 있는데, 이는 마운트 직전에 하는 메서드이다.

### create.app.$el and append it to $el

이제 준비된 Vue.js에 자바스크립트로 만든 인스턴스를 연결시켜 렌더링할 준비를 끝마친다

### `mount`

이렇게 렌더링할 준비가 끝났으면 실행되는 훅.

### `beforeUpdate` vs `updated`

특정 데이터를 변경 시, 가상 DOM에 비교 후 리렌더링하고 수정하기 직전과 직후에 시행되는 메서드.

### `unmount`

연결을 끊어버림.

### `beforeUnmount`

연결이 끊기기 전에 동작하는 메서드

### `unmount`

연결이 끊기면서 시행되는 메서드

**이때 단순히 반응성이 끊어진다고 이해하는 게 편하다. 즉 코드가 증발하는 게 아니라, 더이상 `Vue`를 통해 변경 시에도 반응하지 않는다는 것!**

## 실전!

라이프사이클을 이해하기 위해 다음 코드를 넣어 보자.

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <style>
    .orange {
      font-size: 5rem;
      color: orange;
    }
  </style>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
  <script>
    const App = {
      data() {
        return {
          msg: 'Hello Vue!'
        }
      },
      beforeCreate() {
        console.log("beforeCreate!", this.msg)
        console.log(document.querySelector('h1'))
      },
      created() {
        console.log("created!", this.msg)
        console.log(document.querySelector('h1'))
      },
      beforeMount() {
        console.log("beforeMount!", this.msg)
        console.log(document.querySelector('h1'))
      },
      mounted() {
        console.log("mounted!", this.msg)
        console.log(document.querySelector('h1'))
      },
    }
    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

![실전](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/78958ce5-252d-4ed3-b790-00a5b580dc41/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210927%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210927T094655Z&X-Amz-Expires=86400&X-Amz-Signature=47691a3c49fe5423dd942644dcede9b8e0d55b69fcfb76045c049d1c4578041b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

실제로 보면, `beforeCreate` 에서는 아직 인스턴스가 생성되기 이전이기 때문에 `msg`를 접근할 수 없다.

그러면 `DOM`에 대해서는 어떨까?

`mounted`에서 비로소 DOM에 접근이 가능하다. 따라서 그 이전까지는 이에 대해 접근할 수 있는 방법이 없으므로 `null`이 출력된다.

## `created` vs `mounted`

- `created`

    데이터를 처리하는 데 있어서 편리한 장점이 있다. 무엇보다 `mounted` 보다 먼저 처리될 수 있으므로 속도에서 더욱 빨리 제공할 수도 있다.

- `mounted`

    DOM API에 직접 접근 가능하다는 장점이 있다!

### `beforeUpdate` vs `updated`

다음도 추가해서 입력해보자.

```jsx
beforeUpdate() {
  console.log('beforeUpdate!', this.msg)
  console.log(document.querySelector('h1').textContent)
},
updated() {
  console.log('updated!', this.msg)
  console.log(document.querySelector('h1').textContent)
}
```

![beforeUpdate vs updated](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6b24f476-a93a-438e-a56d-9e8261bc98b4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210927%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210927T094725Z&X-Amz-Expires=86400&X-Amz-Signature=f6f43de2cc1d4cae891c050c0a8bbc7ad3c3cb21d23028405a03eac00ca1661c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

### `beforeUnmount` vs `unmount`

다음처럼 수정해보자.

```jsx
	beforeUnmount() {
    console.log("beforeUnmount!");
  },
  unmounted() {
    console.log("unmounted!");
  }
}
const app = Vue.createApp(App)
const vm = app.mount('#app');
```

`app` 인스턴스를 `unmount` 시킨다면 다음과 같이 호출이 된다.

![beforeUnmount vs unmount](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5b18a875-6c9a-480d-9a1a-66935db70526/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210927%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210927T094755Z&X-Amz-Expires=86400&X-Amz-Signature=c79ed1af0a2df11f1dde125abedbf238b27ff470dbc8406dd7f6acf93870953d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)