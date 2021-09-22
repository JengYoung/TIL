# progressive Framework

사용자 인터페이스를 만들기 위한 프로그래시브 프레임워크다.

**뷰 레이어에 초점을 맞추고 있음** -
즉, 레이아웃을 처리하는 용도로만 충분히 사용하기  때문에, 

- 다른 라이브러리나
- 기존 프로젝트와의 통합이 유용하다.

## 선언적 렌더링

`Vue`에는 간단한 템플릿 구문을 통해 

`DOM`에서 데이터를 선언적으로 렌더링이 가능하다.

```html
<div id="counter">
  Counter: {{ counter }}
</div>
```

```jsx
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

// 여기서 이렇게, 만들어준다는 걸 선언해준다!
Vue.createApp(Counter).mount('#counter')
```

이렇게 `{{ variable }}` 와 같은 문법을 **이중 중괄호 구문**이라 한다.

## 반응성

결국 데이터가 변함에 따라, 화면도 변하는 성질을 의미한다.

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
  <div id="app">
    {{ timer }}
  </div>
  <script>
    Vue.createApp({
      data() {
        return {
          timer: 0,
        }
      },
      mounted() {
        setInterval(() => {
          this.timer += 1;
        }, 1000)
      }
    }).mount('#app');
  </script>
</body>
</html>
```

위의 예제는 결국, `counter`에 따라서 0.1초마다 데이터가 변하는 것이 렌더링될 것이다!

`createApp` 메서드의 인자인 객체는 따로 변수로 할당해주어도 괜찮다.

```jsx
const App = {
  data() {
    return {
      timer: 0,
    }
  },
  mounted() {
    setInterval(() => {
      this.timer += 1;
    }, 1000)
  }
}

const app = Vue.createApp(App).mount('#app');
```

## 호오. 전역 변수인 `app`을 살펴보자.

`app`은 크게 `Target`과 `Handler`로 이루어져 있다.

![app 전역변수](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c13e80e7-f96a-4afa-8230-83b04abd698a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T075519Z&X-Amz-Expires=86400&X-Amz-Signature=3a1c081f3c11439085534c07245fe04c6422ccae8a175c42b2092886093dd964&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

`Target`의 내부에, 내가 설정한 `Timer` data가 존재한다.

![app 전역변수 내부 상세](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7f83ea8e-16f4-4b62-8068-f8de27b56d30/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T075540Z&X-Amz-Expires=86400&X-Amz-Signature=3404f7ed46e4c472209d49e5aa9f48aecb578fcea1dca5fa7db5c9be0b83b9d2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

**이미 `app` 객체의 내부에는, `timer`가 존재하기 때문에, 
우리는 이를 `this`로 꺼내어서 쓸 수 있다!**

## v-bind

자바스크립트에서의 데이터를 클래스에도 명시가 가능한데, 이때는 힌트를 주어야 한다.

`v-bind:`라는 것을 프로퍼티 명의 앞에다가 넣어주면, 해당 값이 자바스크립트 데이터임을 알려줄 수 있다!

```jsx
<style>
    .orange {
			font-size: 5rem;
      color: orange;
    }
</style>
<div id="app">
  <div v-bind:class="{ orange: isActive }">{{ timer }}</div>
</div>
<script>
  const App = {
    data() {
      return {
        timer: 0,
        isActive: true,
      }
    },
  }
  const app = Vue.createApp(App).mount('#app');
</script>
```

![v-bind](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b7a934d9-1f2a-4cc9-a086-5044d37d26f5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T075600Z&X-Amz-Expires=86400&X-Amz-Signature=bb399c667037ce3e107de03c8cc6c0c66c439d5e958f4188639a1288221a0127&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## methods

`methods`를 통해 값을 변화시켜줄 수도 있다.

```html
<div id="app">
	<div v-bind:class="{ orange: isActive }">{{ timer }}</div>
	<button @click="increase">+</button>
</div>
```

```jsx
const App = {
  data() {
    return {
      timer: 0,
      isActive: true,
    }
  },
  methods: {
    increase() {
      this.timer += 1;
    }
  }
}
```

![methods](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0a4deadf-c9e3-4f42-942c-ebfa7548b325/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T075627Z&X-Amz-Expires=86400&X-Amz-Signature=09b12835346eb76ae6a967ac9042ff3eb4204971c8986ddff768162c12614bb3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

역시 `app`에 잘 저장되어 있다.

![methods in app](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/68160918-35d0-4157-b42d-b591c333f5c5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T075655Z&X-Amz-Expires=86400&X-Amz-Signature=21b081997cc94a86999eb70d35d173e6b0ba26bb905d2f4b19aa87c56d1117a8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

### 그럼, 메소드를 직접 실행시킬 수도 있지 않을까...?!

된다...!

어썸👍👍👍

![result](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ac9c9365-3aa6-4a5b-b00d-c4d7b43d42ae/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T075718Z&X-Amz-Expires=86400&X-Amz-Signature=075f42a4b9c2c9a38024e2777731c08a9eea8c664df1e956b24707679c964937&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)