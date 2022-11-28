![https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg](https://media.vlpt.us/images/hyemz/post/2772a98d-e951-4d7f-bb1b-409ad484a0c8/vue.js%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg)

## 다음을 입력해보자.

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
    <h1>{{ count }}</h1>
    <h2>{{ count * 2 }}</h2>
    <h2>{{ count * 2 }}</h2>
    <h2>{{ count * 2 }}</h2>
    <h2>{{ count * 2 }}</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          count: 3
        }
      }
    }
    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

결과적으로, 3 6 6 6 6이 화면에 찍힐 것이다.

하지만 이는 불만족스럽다.

## 왜?

위의 `expression`이 만약 복잡한 식이였고, 그것이 더욱 반복되었다면? 

그렇다면 결과적으로 이는 함수로 재사용하는 것이 더욱 적합할 것이므로.

## computed

계산된 데이터 값을 리턴하는 함수들을 한 데 모은 객체.

따라서 이를 사용할 때에도 마치 값처럼 `double` 처럼, 괄호 없이 쓴다.

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
    <h1>{{ count }}</h1>
    <h2>{{ double }}</h2>
    <h2>{{ double }}</h2>
    <h2>{{ double }}</h2>
    <h2>{{ double }}</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          count: 3
        }
      },
      computed: {
        double() {
          return this.count * 2
        }
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

## 왜 이게 좋은 걸까?

`computed`에는 가장 강력한 기능이 있는데, 그것이 바로 **캐싱기능**이다.

- 어떤 `data`의 속성에만 포커싱, 즉 의존하며,
- 계산된 결과 값을 계속해서 저장하고 있는다.
- 따라서 메모리 측면에서 불필요한 사용을 줄일 수 있다는 것.

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
    <ul>
      <li v-for="todo in upperTodos">
        {{ todo.title }}
      </li>
    </ul>
  </div>
  <script>
    const App = {
      data() {
        return {
          todos: []
        }
      },
      computed: {
        upperTodos() {
          return this.todos.map(todo => ({
              ...todo,
              title: todo.title.toUpperCase()
            }))
        }
      },
      created() {
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(res => res.json())
          .then(res => {
            console.log(res)
            this.todos = res;
          })
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

![computed jsonplaceholder result](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e181b82b-8b49-4c81-90d6-0f95fdb7e7b2/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211004T091429Z&X-Amz-Expires=86400&X-Amz-Signature=ff84b079578e771cab6d231a2c19da4193d0fb0b6f7f191cece1940e0a6fc0ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

---

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
    <h1>{{ user.name }}</h1>
    <h2>{{ user.age }}</h2>
    <h2>{{ doubleAge }}</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          user: {
            name: 'Jengyoung',
            age: 28,
            email: 'Jengyoung@gmail.com'
          }
        }
      },
      computed: {
        doubleAge() {
          console.log("DOUBLE!");
          return this.user.age * 2
        },
        upperName() {
          return this.user.name.toUpperCase()
        }
      }
      
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

![doubleAge](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ff775023-fa2c-4ec4-84a9-82878631bcb4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211004T091441Z&X-Amz-Expires=86400&X-Amz-Signature=c806d34be84706b94a5cb5d66635e75c29ccebe3105bfca81ab58ac6d85940f3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 특이한 `computed`

그래서 결국에, `computed`는 특이점이 생기는데, 바로 `data`가 바뀌지 않는한, 직접 조작을 해도 변경되지 않는다는 점이다.

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
    <h1>{{ fullName }}</h1>
    <h2>{{ firstName }}</h2>
    <h2>{{ lastName }}</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          firstName: 'Jaeyoung',
          lastName: 'Hwang'
        }
      },
      computed: {
        fullName() {
          return `${this.firstName} ${this.lastName}`
        }
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

![computed 주의사항](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/462e8820-7258-4dc4-b0b0-888bb70e3be6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211004T091508Z&X-Amz-Expires=86400&X-Amz-Signature=4ab5742af43ef7d42b2eeb16a21f0721de91fd0c4a87812836503d18d777a731&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

### 해결 방법

결국 `getter`와 `setter`로 이루어져 있음을 생각하면, 편하다.

`setter` 부분에서, `this.data`를 조작하도록만 하면 된다.

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
    <h1>{{ fullName }}</h1>
    <h2>{{ firstName }}</h2>
    <h2>{{ lastName }}</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          firstName: 'Jaeyoung',
          lastName: 'Hwang'
        }
      },
      computed: {
        fullName: {
          get() {
            return `${this.firstName} ${this.lastName}`
          },
          set(newValue) {
            const [newFirstName, newLastName] = newValue.split(' ');
            this.firstName = newFirstName;
            this.lastName = newLastName;
          }
        }
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

![computed 해결 방법](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9a386264-fbb1-4c01-87b4-c76bcabd71e7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211004T091545Z&X-Amz-Expires=86400&X-Amz-Signature=4d39c69a3e8a091602a73569cc0aaee0d50a1f900b1aa3d616d4794ee6e9aa31&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## `watch`

얘의 경우, 특정 데이터의 변화만 딱 감시해서, 변할 때마다의 동작을 결정해준다.

마치, `useEffect`느낌도 든다.

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
    <h1>{{ fullName }}</h1>
    <h2>{{ firstName }}</h2>
    <h2>{{ lastName }}</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          firstName: 'Jaeyoung',
          lastName: 'Hwang'
        }
      },
      computed: {
        fullName: {
          get() {
            return `${this.firstName} ${this.lastName}`
          },
          set(newValue) {
            const [newFirstName, newLastName] = newValue.split(' ');
            this.firstName = newFirstName;
            this.lastName = newLastName;
          }
        }
      },
      watch: {
        firstName() {
          console.log('watch:', this.firstName)
        }
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

![watch](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0e4c9a4f-a1f6-4d78-b368-e584f777b7d6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211004T091609Z&X-Amz-Expires=86400&X-Amz-Signature=c841c45d6fb3cb800db292d6919314c4742e6a368a60dcccac32388d2a4b5e99&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 특이한 `watch`

이 친구도 겁나게 특이하다.

만약 감시하는 `data`가 객체라면, 그 내부의 `key`의 변화까지는 감시하지 못한다. 왜? 객체의 타입은 참조 타입이며, 참조 주소 값이 바뀌지 않았기 때문이다.

![watch 주의사항](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ecfff71b-bcd7-439f-95be-34f479219af5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211004T091633Z&X-Amz-Expires=86400&X-Amz-Signature=7c777a06e39845cda3f63ff2a3b613f3798ea58210e620dfdab950c2010c760a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

### 해결방법

따라서, `deep`이라는 옵션을 `true`로 설정해주자.

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
    <h1>{{ user.name }}</h1>
    <h2>{{ user.age }}</h2>
  </div>
  <script>
    const App = {
      data() {
        return {
          user: {
            name: 'Jaeyoung',
            age: '28'
          }
        }
      },
      watch: {
        user: {
          handler(newValue, oldValue) {
            console.log(newValue, oldValue)
          },
          deep: true
        },
      }
    }

    const vm = Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

![watch 해결방법](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9c855f62-54a5-4e35-b54a-16ee8b65ab5e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211004T091648Z&X-Amz-Expires=86400&X-Amz-Signature=3995136c13f62e2da73910b5241f47d23989cdde493ab0d7c22450ce2af32e5b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

**생각을 해봤는데... `handler`라는 애가 굉장히 친숙하다.
`proxy`를 꺼내봤을 때 나온 친구였는데, 아무래도 연관성이 있지 않을까 싶다!** 

- **즉, 타겟이 변화하면, `handler`라는 이벤트가 활성화되는 것이고,**
- **`deep`의 경우, `watch`의 `property`를 탐색하다 이러한 설정이 있으면 `deepEqual`을 실행하는 것이다.**

- **또한 `immediate`라는 옵션도 있다.**
    
    **이는, 만약 `data`가 초기화되었다면, 그때 실행해준다는 의미이다!**
    
    주의!
    화면에 렌더링될 때가 아닌, 순수 초기화 될 때를 말한다. 설사 화면에 없는 데이터라도, 실행된다.
    
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
        <button @click="capitalize">Capitalize</button>
        <ul>
          <li v-for="fruit in fruits">
            {{ fruit.name }}
          </li>
        </ul>
      </div>
      <script>
        const App = {
          data() {
            return {
              user: {
                name: 'Jaeyoung',
                age: '28'
              },
              fruits: [
                { id: 1, name: 'Apple' },
                { id: 2, name: 'Banana' },
                { id: 3, name: 'Cherry' }
              ]
            }
          },
          watch: {
            user: {
              handler(newValue, oldValue) {
                console.log(newValue, oldValue)
              },
              deep: true,
              immediate: true // 보니까, 그냥 데이터 초기화될 때 바로 나오네!
            },
            fruits: {
              handler() {
                console.log(this.fruits)
              },
              deep: true,
              immediate: true
            },
          },
          methods: {
            capitalize() { // upperCase
              this.fruits.forEach(fruit => {
                fruit.name = fruit.name.toUpperCase();
              })
            }
          }
        }
    
        const vm = Vue.createApp(App).mount('#app');
      </script>
    </body>
    </html>
    ```