## **this란!**

`javascript`를 공부하면서 가장 의아했던 것 중 하나가 바로 `this`의 동작방식이었다.

먼저 `this`를 알기 전에 객체 지향 프로그래밍을 되짚어 보자.
모든 객체는

> 1. 상태 (property)
> 2. 동작 (method)

을 갖고 있다.

여기서 동작을 나타내는 메서드는 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 할 것이다.
그렇지 않으면, 어떤 객체를 동작할 것인지를 명시하지 못하기 때문이다.

**이때 사용하는 것이 바로 자기 참조 변수(self-referencing variable)이다!**
주 역할은 다음과 같다.

> **자신이 속한 객체**, 또는  
> **자신이 생성할 인스턴스의 프로퍼티나 메서드**를 참조할 수 있다.

this는 암묵적으로 생성된다. 그리고, 코드 어디서든 참조할 수 있다.  
일반적으로 함수를 호출할 시 arguments와 this가 암묵적으로 전달된다고 한다.

그러나 다음 한 가지는 기억해야 한다.  
this가 가리키는 값(this 바인딩)은 **함수 호출 방식에 따라 동적으로 결정된다!**

> **this 바인딩**?
>
> - 식별자와 값을 연결하는 과정.
> - 즉, **this와 this가 가리킬 객체를 바인딩**하는 것.

이러한 동적 바인딩에는 크게 3가지 케이스가 있다.

- 일반 함수 호출 ✅(window)
- 메서드 호출
- 생성자 함수 호출 ✅(위의 new Person예시)

```
// 일반 함수 호출
// window 전역 객체에 this가 바인딩된다.
const young1 = Say('jengyoung')
console.log(window.greeting());

// 메서드 Case
// young2 객체에 this가 바인딩된다.
const young2 = {
    Say
};
young2.Say('Jengyoung');
young2.greeting();


// 생성자 함수 Case
// 새롭게 생성된 young3 객체에 this가 바인딩된다.
const young3 = new Say('Jengyoung');
young3.greeting();
```

이정도만 기억해도 된다면, 얼마나 편할까.  
문제는 콜백 함수가 실행될 때이다.

> 우리의 콜백 함수 역시 일반 함수로 호출되면 전역 객체로 바인딩 된다. 그렇다면 다음과 같은 상황이 발생한다!

```
function Clock () {
    this.time = Date.now()
    setTimeout (function() {
    	// window.time = Date.now() //이를 추가하면 현재 시간 출력
        console.log(this.time)
    }, 1000)
};

const nowTime = new Clock();
```

하... 역시 마찬가지로 `undefined`가 뜬다!
콜백 함수도 일반 함수로 호출되면, window 객체의 메소드로 생성되는 것이다!

이럴 때 해결 방법은 다음과 같다.

```
function Clock () {
    this.time = Date.now()
    const that = this;
    setTimeout (function() {
        console.log(that.time)
    }, 1000)
};

const nowTime = new Clock();
```

우리는 변수가 곧 어떤 값이 있는 메모리의 주소를 가리키고 있음을 알고 있다. 따라서 변수를 통해 this를 간접 참조하면 되는 것이다!

---

> ### 보다 명료하게 바인딩하고 싶어요!

이를 지원하기 위해 자바스크립트에서는 3가지 메서드를 제공하는데 그것이 바로

- `Function.prototype.apply`
- `Function.prototype.call`
- `Function.prototype.bind`

이다. 이제 이를 살펴보자!

### Function.prototype.apply & Function.prototype.call

> **`Function.prototype.apply(thisArg[, argsArray])`**  
> **`Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])`**

> **`@param thisArg`**`this`로 사용할 객체
>
> **`@param argsArray`** 함수에게 전달할 인수 리스트의 배열 / 유사 배열 객체
>
> **`@returns`** 호출된 함수 반환 값

어떤 것을 부연설명할까 고민하다, 다음 예시를 만들었다.

```
function makeArr(...args) {
    console.log(args) // = arguments
    return this.arr;
}
const arrObj = { arr: [1,2,3], makeArr } // this -> arrObj
console.log(arrObj.makeArr(1,2,3)); //argsArray에 대응

const objective = [6,7,8,9,10]
console.log(arrObj.makeArr.apply({ arr: objective }, [6,7,8,9,10])) // this -> { arr: objective }, argsArray -> [6,7,8,9,10]
console.log(arrObj.makeArr.call({ arr: objective }, 6,7,8,9,10))
```

-----

# 220518 다시 복습하며.

## this의 흔한 오해.

### `this`는 자기 그 자신을 가리키지 않는다.

함수는 객체가 맞고, 함수를 참조함으로써 상태를 저장할 수는 있지만, 이는 적합한 패턴이 아니다.  
함수는 일반적으로 자기 자신을 참조할 때 **렉시컬 식별자**를 거쳐 함수 객체를 참조해야 한다.

> 여기서 렉시컬 식별자란, 함수의 렉시컬스코프를 명명한 함수 자체의 변수명이다.

```js
function foo() {
    foo.count = 4; // 함수 역시 객체이므로 변수명 지정이 가능하다.
}
setTimeout(function() {
    // 자기 자신을 가리킬 수 없는 익명 함수.
})
```

### `this`는 자신의 스코프를 참조하지 않는다.

+ 스코프는 별개의 식별자가 달린 프로퍼티로 구성된 객체의 일종
  > 따라서 이를 통해 추측하자면 스코프 내에서 변수명을 선언하는 것은 일종의 프로퍼티들을 추가했다는 것을 의미하겠다. 그것이 **실행 컨텍스트**이다.
+ 스코프 객체는 자바스크립트 엔진의 내부 부품이므로 이를 접근할 수 없다.

### 엄격모드와 비엄격 모드를 주의해야 한다.

엄격모드에서는 전역 객체가 기본 바인딩 대상에서 제외된다는 점을 주의해야 한다.  
반면 혼용해서 쓸 경우 `this`의 호출부를 살펴보아, 엄격 모드에서 호출이 된 것인지, 비엄격 모드에서 호출된 것인지를 살펴봐야 한다.

---

## 암시적 바인딩

### 호출부에 콘텍스트 객체가 있는지를 확인하자

다음을 살펴보자.

```js
function foo() {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo
}

obj.foo();
```

여기서 `obj`은 `a`와 `foo`라는 프로퍼티를 가진 컨텍스트이자 스코프를 값으로 참조하고 있다.
따라서 이를 포함(소유)하고 있다고 볼 수 있으므로 `this`가 암시적으로 자동 바인딩된다.

### 암시적 소실을 주의하자

암시적으로 바인딩 된 함수에서 바인딩이 소실될 수 있다.  
이는 다시 또 '호출 시점'이라는 본질로 돌아가면 이해할 수 있다.


```js
function foo() {
    console.log(this.a) // 전역 프로퍼티 a 참조
}

var obj = {
    a: 2,
    foo
}

var bar = obj.foo; // 선언만 해주었지, 이를 호출하지는 않음. 또한 `bar`는 결국 `foo`의 주소만 가짐 (call by reference)

var a = 'fake';

bar(); // 실제 호출 시점. a는 전역에서 `fake` 값을 메모리에 할당하고 있음. 따라서 `fake` 호출.
```

---

## 명시적 바인딩

말 그대로 명시적으로 어떤 객체를 `this` 바인딩에 이용하겠다는 것을 코드로 표현하는 것이다.

```js
function foo() {
    console.log(this.a);
}

var obj = {
    a = 2
}

foo.call(obj);

```

그러나 이 역시 
+ `this` 바인딩이 도중에 소실될 수 있으며,  
+ 프레임워크가 임의로 덮어쓰면 이상한 값을 가지는 문제가 있다.

---

## 하드 바인딩

```js
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2
}

var bar = function () {
    foo.call(obj);
}
bar(); // 2

setTimeout(bar, 100) // 2
bar.call(window) // 2

```

말 그대로 `obj`를 `this`에 강제 바인딩하도록 하드 코딩한다.  
항상 `obj`를 바인딩하여 `foo`를 실행하도록 한다.  

주로 인자를 넘기고 반환 값을 돌려 받는 창구가 필요허면 쓴다.

이를 자바스크립트에서 내장 메서드로 제공하는데, 그것이 바로 `bind`이다.

```js
function foo(sth) {
    console.log( this.a, sth );
    return this.a + sth;
}

function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    }
}

var obj = {
    a: 2
}

var bar = bind(foo, obj); // 2 3

var b = bar(3) // 5

console.log(b)
```

## new 바인딩

`new` 연산자는 호출이 되면 특정 생성자를 통해 만들어진 객체를 초기화할 뿐이다.

따라서 생성자 함수가 아닌, **생성자 호출**이라고 보는 것이 타당하다.  
이는 다음과 같은 로직을 수반한다.

1. 새 객체가 만들어진다.
2. 새로 생성된 객체의 `[[Prototype]]`이 연결된다.
3. 새로 생성된 객체는 해당 함수 호출시 `this`로 바인딩된다.
4. 이 함수가 자신의 또다른 객체를 반환하지 않는다면 `new`함수는 자동으로 새로 생성된 객체를 반환한다.

---

## 우선순위

하드 바인딩(자체 `this` 바인딩 무시 및 주어진 바인딩을 적용, 하드코딩된 새 레퍼함수를 생성) > `new` 바인딩 > 명시적 바인딩 > 암시적 바인딩 > 기본 바인딩


## `this` 확정 규칙

1. new로 함수를 호출했다면 새로 생성된 객체는 `this`이다.
2. `call, apply`로 함수를 호출했거나 `bind` 하드 바인딩 내부에 숨겨진 형태로 호출했다면 명시적으로 지정된 객체가 `this`다.
3. 객체(컨텍스트)를 소유, 포함하는 형태로 함수를 호출했다면 해당 콘텍스트 객체가 `this`다.
4. 기본 바인딩이다.
   
---

## 예외 사항

### 명시적 바인딩 인자 값 할당을 주의하자.
명시적 바인딩에서 첫 번째 인자가 `null` 이나 `undefined`면 기본 바인딩이 적용된다.

### 간점 레퍼런스를 주의하자.
`call by reference`인 객체를 값으로 할당하면 기본 바인딩 규칙이 적용될 확률이 높다.

### 소프트 바인딩

`bind`와 같은 하드 바인딩은 함수의 유연성이 떨어진다. 따라서 수동으로 함수 오버라이딩을 유연하게 하기 위해 소프트 바인딩 유틸리티가 있다.
```js
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // 커링된 인자는 죄다 포착한다.
        
        var curried = [].slice.call(arguments, 1);
        var bound = function() {
            return fn.apply(
                (!this || this === (window || global)) ? obj : this,
                curried.concat.apply(curried, arguments)
            )
        }

        bound.prototype = Object.create(fn.prototype);
        return bound;
    }
}
```

