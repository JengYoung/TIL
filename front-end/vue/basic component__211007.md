![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

# 컴포넌트란?

말 그대로 화면을 그리는 데 구성하는 단위이다. **재사용할 수 있다**는 것이 강력한 장점이다.

등록 방법에 대하여 크게 **전역 컴포넌트 등록, 지역 컴포넌트 등록**으로 나눌 수 있다.

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
    <upper-name name="apple" @to-upper="toUpper"></upper-name>
  </div>
  <script>
    const App = {
      methods: {
        toUpper(upperName) {
          console.log(upperName)
        }
      }
    }
    const app = Vue.createApp(App)
    app.component('upper-name', {
      template: `
        <div @click="capitalize">{{ name }}</div>
      `, // 템플릿 등록
      props: ['name'],
      methods: {
        capitalize() {
          this.$emit('to-upper', this.name.toUpperCase()) 
					// 실제 데이터는 상위 컴포넌트에 있기 때문에 이벤트로 전달해야 한다.
        }
      }
    }) // 전역 컴포넌트 등록.
    const vm = app.mount('#app');
  </script>
</body>
</html>
```

여러 인자로 전달할 때에는 `$event`를 이용한다.

### emit

즉, 전하고 싶은 데이터를 위로 올려주는 역할을 담당한다.

```jsx
<upper-name name="apple" @to-upper="toUpper($event)"></upper-name>
```