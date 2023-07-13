# 타입 연산과 제너릭 사용으로 반복 줄이기

## DRY 원칙

타입을 정의할 때 같은 코드를 반복해야 할 이유가 있을까?  
예컨대 다음과 같다.

### 예제 - 공

타입스크립트 세상에서 공이라는 것을 한 번 객체로 만들어보자.

```ts
class Ball {
  radius: number;
  weight: number;
}
```

하지만 이 세상에 공 종류가 단일적이지는 않다.  
농구공을 따지면 어떻게 될까?

```ts
class Ball {
  radius: number;
  weight: number;
}

interface Basketball extends Ball {
  brand: string;
}
```

이렇게 DRY하게 확장해서 나름 멋지게 표현했다고 생각하게 됐다.
그런데 다음과 같은 상황이 존재한다.

- 특정 상황에서는 브랜드를 좀 더 타이트하게 받고 싶다
- 그런데 브랜드가 가끔은 어떻게 들어올지 몰라서, 자유롭게 받고 싶다

이러한 두 상황에 충돌할 때 어떻게 되어야 할까?

```ts
enum EBasketballBrand {
  sparding = "sparding",
  nike = "nike",
  adidas = "adidas",
  star = "star",
}

interface StrictBasketball extends Ball {
  brand: EBasketballBrand;
}

interface NormalBasketball extends Ball {
  brand: string;
}
```

일단 다음과 같은 상황은 보기가 안 좋다. 이유는 다음과 같다.

1. 분명히 인터페이스의 키는 같은데, 타입이 다르다고 해서 구분하여 처리해야 한다.
2. 만약 `StrictBasketball`에서 특정 타입으로 또 세분화된다면 어떻게 될까? 추가적으로 또 타입을 나누어야 하고, 이는 유지보수를 더 어렵게 한다.

따라서 이러한 상황에서 DRY하게 제네릭을 쓰는 것으로 더욱 유연하게 대처할 수 있다.

```ts
interface BasketBall<Brand> extends Ball {
  brand: Brand;
}

const starBall: BasketBall<EBasketballBrand> = {
  brand: EBasketballBrand.star,
  weight: 1.5,
  radius: 14,
};
```

---

## 제네릭을 공부하다 알게된 점.

이번에 공부를 하다가 새롭게 좋은 것을 알게되어 글로 기록하려한다.  
문제의 코드는 다음과 같다.

```ts
interface Name {
  first: string;
  last: string;
}

// Pick, Partial, Exclude, Omit
type TPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

type TPartial<T> = {
  [key in keyof T]?: T[key];
};

type TExclude<T1, T2> = T1 extends T2 ? never : T1;

type TOmit<T, K> = TPick<T, TExclude<keyof T, K>>;
type TOmit2<T, K> = TPick<T, keyof T extends K ? never : keyof T>;

const testName1: TOmit<Name, "last"> = {
  first: "3",
  last: "1",
};

const testName2: TOmit2<Name, "last"> = {
  first: "3",
  last: "1",
};
```

여기서 `TOmit`, `TOmit2`은 사실상 `TExclude`를 풀어쓴 부분처럼 보인다.  
`testName1`과 `testName2`를 보면, 결국 같은 결과가 나와야 한다는 게 기존 생각이었다.

하지만 결과는 다르게 동작한다. `testName1`만 오류가 나고, `testName2`는 오류가 나지 않는다.

## 이유

문제의 코드를 살펴보면 TOmit와 TOmit2 두 가지 제네릭 타입을 정의하고 있다.

TOmit은 T와 K 두 개의 제네릭을 받으며, TPick 타입을 사용하여 T 타입에서 K 타입을 제외한 속성들을 선택한다.  
즉, TOmit<Name, "last">는 Name 타입에서 "last" 속성을 제외한 속성들을 선택한 타입이다.

TOmit2는 T와 K 두 개의 제네릭을 받으며, TPick 타입을 사용하여 keyof T와 K를 비교하여 never 타입으로 변환해야 하는 속성들을 제외한 속성들을 선택한다.  
즉, TOmit2<Name, "last">는 Name 타입에서 "last" 속성을 제외한 속성들을 선택한 타입이다.

문제의 코드에서 testName1은 TOmit<Name, "last"> 타입을 사용하고 있으며, "last" 속성을 포함한 { first: string, last: string } 형태의 객체를 할당하려고 한다.  
이는 TOmit<Name, "last"> 타입과 일치하지 않으므로 타입스크립트 컴파일러가 오류를 발생시킨다.

반면에 testName2는 TOmit2<Name, "last"> 타입을 사용하고 있으며, "last" 속성을 포함한 { first: string, last: string } 형태의 객체를 할당하려고 한다.  
이 경우 TOmit2<Name, "last"> 타입은 "last" 속성을 제외한 속성들을 선택한 타입이기 때문에 { first: string }와 일치하게 된다.  
따라서 타입스크립트 컴파일러는 이를 유효한 할당으로 간주하여 컴파일 오류를 발생시키지 않습니다.

TOmit2의 동작 방식을 보면 keyof T extends K ? never : keyof T로 되어 있는데, keyof T와 K를 비교하여 never 또는 keyof T 타입으로 변환하는 것이 아니라 조건부 타입인 keyof T extends K ? never : keyof T 자체를 타입으로 사용하게 된다.

이는 keyof T의 각 속성이 K와 일치하는지를 확인하는 조건부 타입이며, keyof T가 K와 일치하는 경우에는 never 타입으로 변환되고, 일치하지 않는 경우에는 keyof T 타입으로 남게 된다.

결론적으로 TOmit2의 동작 방식 때문에 TOmit2<Name, "last"> 타입은 "last" 속성을 제외한 속성들을 선택한 타입이며, { first: string }와 일치하게 된다.  
따라서 testName2에 "last" 속성이 포함된 객체를 할당해도 타입스크립트 컴파일러는 이를 유효한 할당으로 처리하고 컴파일 오류를 발생시키지 않는다.
