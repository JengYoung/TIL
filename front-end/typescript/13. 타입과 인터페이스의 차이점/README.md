# 타입과 인터페이스의 차이

## 예제

다음과 같은 예시를 보자.

```ts
type TState = {
  name: string;
  capital: string;
};

interface IState {
  name: string;
  capital: string;
}

/**
 * @description
 * 클래스의 경우 값으로도 쓰일 수 있는 런타임의 개념.
 */
class CState {
  name: string;
  capital: string;
}

/**
 * '{ name: string; capital: string; example: string; }' 형식은 'TState' 형식에 할당할 수 없습니다.
 * 개체 리터럴은 알려진 속성만 지정할 수 있으며 'TState' 형식에 'example'이(가) 없습니다.
 */
const additionalPropertyCase_Type: TState = {
  name: "재영",
  capital: "테스트 중",
  example: "에러가 나와야 한다.",
};

/**
 * '{ name: string; capital: string; example: string; }' 형식은 'IState' 형식에 할당할 수 없습니다.
 * 개체 리터럴은 알려진 속성만 지정할 수 있으며 'IState' 형식에 'example'이(가) 없습니다.
 */
const additionalPropertyCase_Interface: IState = {
  name: "재영",
  capital: "테스트 중",
  example: "에러가 나와야 한다.",
};

/**
 * '{ name: string; capital: string; example: string; }' 형식은 'CState' 형식에 할당할 수 없습니다.
 * 개체 리터럴은 알려진 속성만 지정할 수 있으며 'CState' 형식에 'example'이(가) 없습니다.
 */
const additionalPropertyCase_Class: CState = {
  name: "재영",
  capital: "테스트 중",
  example: "에러가 나와야 한다.",
};
```

다음처럼 사실상 큰 차이가 없어 보인다.  
실제로 제네릭, 함수 타입 등도 둘 다 적용이 가능하다.

```ts
type TFn<N> = (x: N) => string;
interface IFn<N> {
  (x: N): string;
}

const numToStr_Type: TFn<number> = (a: number): string => {
  return a.toString();
};

const numToStr_Interface: IFn<number> = (a: number): string => {
  return a.toString();
};
```

흠. 무엇이 차이점일까.  
해답은 **확장성**에 있다.

## 확장성의 측면에서 접근한다면

인터페이스는 타입에 비해 확장성이 낮다.
대표적으로 유니온 타입이 있다. 실제로 유니온 인터페이스라는 말은 없듯, 유니온은 타입이 가진 강점 중 하나이다.

```ts
/**
 * @example 인터페이스는 타입과 달리 유니온 선언이 불가능하다.
 */

type TInput = { input: string };
type TOutput = { output: string };

type TNamedVariable = (TInput | TOutput) & { name: string };

const Test: TNamedVariable = {
  input: "",
  // output: "",
  name: "",
};

interface IInput {
  input: string;
}
interface IOutput {
  output: string;
}

interface IName {
  name: string;
}

interface INamedVariable extends IName, IInput, IOutput {}

/**
 * @throws
 * 'output' 속성이 '{ input: string; name: string; }' 형식에 없지만 'INamedVariable' 형식에서 필수입니다.
 */
const Test2: INamedVariable = {
  input: "",
  // output: "",
  name: "",
};
```

설령 유니온을 만들기 위해 타입을 중간에 만들어서 확장하려 해도, 이는 인터페이스 문법에서 허용하지 않는다.

```ts
interface IInput {
  input: string;
}
interface IOutput {
  output: string;
}

interface IName {
  name: string;
}

type TInputAndOutput = TInput | TOutput;

interface INamedVariable extends IName, TInputAndOutput {}

/**
 * @throws
 * 인터페이스는 개체 형식 또는 정적으로 알려진 멤버가 포함된 개체 형식의 교집합만 확장할 수 있습니다.
 */
const Test2: INamedVariable = {
  input: "",
  // output: "",
  name: "",
};
```

## 선언의 측면에서 접근한다면

어쩌면 양날의 검일 수도 있지만, 인터페이스는 선언 보강이 가능하다.  
이 말이 생소할 수 있다. 도대체 선언 보강이 무엇을 의미할까?

쉽게 말하자면, 인터페이스를 계속해서 중첩하여 선언하여 extends 하는 형식으로 할 수 있다는 것이다.

이러한 병합을 하는 문법은 타입에는 해당하지 않는다.

```ts
/**
 * @example 인터페이스 선언 보강의 예시
 */
interface Example {
  case1: string;
}
interface Example {
  case2: string;
}

const example: Example = {
  case1: "",
  case2: "",
};
```

이러한 선언 병합이 정말 ~~쓸 데 없어보일 때가 많다~~ ....
하지만 의외로 인터페이스 병합은 정말 타입스크립트의 부족한 1%의 단면을 보충해줌으로써, 타입스크립트 생태계를 지켜주는 문법이다.

예컨대 배열을 생각해보자.  
배열이라는 큰 객체의 타입은 수도 없이 많이 들어가있다.  
이때, `ECMAScript`의 경우를 생각해보자.  
프로젝트마다 지키고 있는 ECMAScript 버전은 다를 수 있다. 이럴 때, 타입스크립트는 어떻게 Array의 type을 알 수 있을까?

해답은 선언 보강에 있다.  
실제로 여러 파일에 선언된 인터페이스들은 실제로 하나의 `Array` 인터페이스에 병합이 되어버린다.  
결과적으로 각 선언은 병합이 되어 모든 메서드들을 타입으로 명시하는 `Array` 타입을 획득하게 되는 것이다.

# 결론

사실 타입과 인터페이스는 둘 다 적절히 섞어가면서 강점은 극대화하고, 약점은 상호보완하는 방법이 가장 좋다고 할 수 있다.

즉, 다음과 같이 사용해야 한다.

- 복잡하게 타입을 선언해주어야 할 때에는 `type`을 사용하자. 이는 유니온 타입 등을 통해 명시가 불가능한 인터페이스의 한계를 극복하게 해준다.
- 타입에 대해 유연하게 추가해주어야 할 가능성이 존재하는 경우에는 인터페이스를 사용하자.

다만 웬만하면 타입을 쓰는 게 좋을 것 같다.  
라이브러리를 만드는 것이 아닌 이상, 인터페이스를 사용하는 것에 대한 Good practice를 생각하기 힘들기 때문이다.

> 따라서, `atomic`한 단위에서 `type`을 먼저 사용해보고, 좀 더 유연성을 획득해야 하는 경우에는 `interface`를 사용하면 어떨까 싶다.`
