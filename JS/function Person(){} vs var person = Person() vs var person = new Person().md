![](https://images.velog.io/images/young_pallete/post/62be110d-0ad5-4022-90ad-446f64fd6307/image.png)

- `function Person(){}` 은 함수 선언문으로서 실행을 하지 않습니다.
- `var person = Person()` 은 실행을 하여 값을 `person` 변수에 할당합니다.
- `var person = new Person()`은 생성자 함수로서 특정 인스턴스를 갖는 객체를 만들어내고, `person`은 `Person.prototype`을 상속하게 합니다.

---

# 3. 문제의 요점

결국 핵심은 **생성자 함수**를 이해하는 지에 대해 묻는 듯합니다.
(이는 `Person`의 네이밍 컨벤션에서 유추했어요. 파스칼 표기법으로 했으니, 냄새가 나지요?)

거시적으로 크게 살펴보면

> 1. **`function Person(){}`**은 함수 선언문
> 2. **`var person = Person()`**은 (일반)함수를 호출하고 값을 변수에 할당하는 statement,
> 3. **`var person = new Person()`**은 `new` 연산자를 통해 생성된 인스턴스를 `person`에 할당

이라고 할 수 있겠습니다.

만약 비교를 한다면 크게 2가지로, 1번 vs 2번 와 2번 vs 3번으로 할 수 있겠어요!

---

## 3-1. `function Person(){}` vs `var person = Person()`

> 쉽게 1번, 2번으로 칭하겠습니다.

1번은 함수 선언문이라, 따라서 런타임 이전에 선언이 실행되며, 호이스팅이 됩니다.

이때, 함수 선언문의 경우 호출이 되지 않는다면 실행이 되지 않아요.

2번은 함수를 호출하고, 그 값을 변수에 할당하는 문입니다. 이는 1번과 달리 함수를 실행하면서, 그 반환된 결과 값을 변수에 할당합니다.

**다만 여기서 `Person()`은 선언이 되지 않았기 때문에, 해당 코드에 `Person` 함수가 선언이 되어있음이 전제되어야 해요!!**

---

## 3-2. `var person = Person()` vs `var person = new Person()`

> 이것 역시 2번, 3번으로 칭하겠습니다!

키포인트는 **`new`로 인해 어떤 것이 차이가 발생하느냐**입니다.

일단 `new`가 앞에 붙었을 경우, 일반함수에서의 동작 방식에서 미묘한 차이가 발생하게 되는데요. 다음과 같습니다.

```jsx
function User(username) {
  this.username = username;
}

const tester = User("Jaeyoung");
console.log(tester);
```

만약 여기서 2번이었다면,

> 1. this는 현재 일반함수이기에 참조할 객체가 없습니다.
>    따라서 값이 `undefined`가 되는데, `undefined`인 경우 비엄격 모드에서는 `window`객체를 가리킵니다.
> 2. 따라서 `window`의 프로퍼티에 username이 등록됩니다.
> 3. 결과적으로 return값은 존재하지 않는 함수선언문이었기에, `tester`에는 값이 할당되지 않게 됩니다.
> 4. undefined가 출력됩니다.

하지만 3번이었다면 다음과 같은 차이가 발생하게 됩니다!

```jsx
function User(username) {
  // this = {}
  this.username = username;
  // return this;
}

const tester = new User("Jaeyoung");
console.log(tester);
```

> 1. 먼저 함수 실행 시 어떤 빈 객체를 만듭니다. 그리고 `this`가 해당 빈 객체를 참조하게 합니다. (신기하지 않나요😊)
> 2. `this`가 가리키는 객체에 `username`인스턴스를 생성합니다.
> 3. 암묵적으로 해당 객체를 반환합니다.
> 4. 결과적으로 User에서 생성된 객체가 `tester`의 값으로 할당됩니다.
> 5. `User { username: "Jaeyoung" }`을 출력합니다.

따라서 **1. 함수 실행 방식**에서 차이를 지니게 되는 거죠.

### 💡 그렇다면 만약 객체를 반환하는 함수였다면?

```jsx
function User(username) {
  return { username };
}

const tester = User("Jaeyoung");
console.log(tester);

//{username: "Jaeyoung"}
```

이 역시 결국에는 `username`을 프로퍼티로 갖는 객체를 생성하게 됩니다!

> 그럼 뭐야?!

라고 생각할 수 있어요. 그런데 잘 보면, 미묘한 출력에서의 차이가 있습니다.

> **생성자 함수로 출력할 시 `User { username: "Jaeyoung" }` 이며
> 일반 함수로 출력할 시 `{ username: "Jaeyoung" }`인 거죠.**

도대체 이 두 차이는, 무엇일까요? (인스턴스와 객체... 속닥속닥)

### 객체 리터럴에 의해 생성된 객체 vs 생성자 함수에 의해 생성된 객체

단도직입적으로, 핵심은 **프로토타입 결정 과정**입니다.

- **객체 리터럴에 의해 생성된 객체**

  모든 객체는 생성할 때, **`OrdinaryObjectCreate`**라는 요상한 추상 연산을 호출합니다. (저는 이걸 몰랐어요!!)
  그리고 이 함수는 자신이 생성할 객체의 프로토타입을 인수로 전달 받아요.

  그리고 객체 리터럴이 평가될 때에는, 해당 연산은 `Object.prototype`을 프로토타입으로 갖는 빈 객체를 생성하고, 프로퍼티를 추가하도록 정의되어 있다고 합니다.

  결과적으로 객체 리터럴에 의해 생성된 객체의 프로토타입은 `Object.prototype`이며, `Object.prototype`을 상속받는 것이지요!

- **생성자 함수에 의해 생성된 객체**

  이 역시 `OrdinaryObjectCreate`라는 요상한 추상 연산을 호출하는데...

  여기서 특이점이 발생합니다.

  > 기존에는 `OrdinaryObjectCreate` 연산에 전달되는 프로토타입이 `Object.prototype`에 바인딩된 빈 객체였다면,
  > 여기서는 생성자 함수의 **`prototype` 프로퍼티에 바인딩된 객체를 프로토타입으로 전달한다고 합니다! **

  결과적으로 생성자 함수의 `prototype` 프로퍼티에 바인딩 된 객체를 프로토타입으로 갖기 때문에 `Person.prototype`을 프로토타입으로 갖게 되는 것입니다!

  그리고 우리는 이렇게 생성된 객체를, 생성자 함수의 **인스턴스**라고 부르게 되는 거죠 😘

---

# 4. 여담 💬

### 주의할 점 1: 생성자 함수로 사용할 시 `return` 주의!

웬만하면 생성자 함수로 쓰겠다고 마음을 먹는다면, 리턴을 쓰지 않는 것이 좋아요. 어차피 암묵적으로 `this`로 바인딩된 객체를 리턴해버리거든요.

```jsx
function User(username) {
  this.username = username;
  return { username };
}

const tester = new User("jengyoung");
console.log(tester); // { username: 'jengyoung' }
```

여기서 리턴을 객체로 하였습니다.

이때, 리턴할 객체가 `Object` 타입이라면 제대로 생성자 함수가 생성되지 않는다니 참고합시다!

(참고로, **원시값이라면 리턴값을 무시하고 `this`를 반환**한다고 해요.)

---

# 5. 기타 TIP

반드시 생성자 함수로 실행해야 할 함수가 있다면 이럴 때에는 `new.target`을 활용할 수 있습니다.

`new.target`은 생성자 함수로 호출되면 함수 자신을, 호출되지 않을 시 `undefined`를 반환합니다.

```jsx
function User(username) {
  if (!new.target) {
    return new User(username);
  }
  this.username = username;
}

const tester = new User("jengyoung");
console.log(tester); // User { username: 'jengyoung' }
```

---

# 6. 참고자료

모던 자바스크립트 Deep Dive chap.19 프로토타입

[https://ko.javascript.info/constructor-new](https://ko.javascript.info/constructor-new)
