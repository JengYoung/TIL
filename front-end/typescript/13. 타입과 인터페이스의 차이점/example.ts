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

const additionalPropertyCase_Type: TState = {
  name: "재영",
  capital: "테스트 중",
  example: "에러가 나와야 한다.",
};

const additionalPropertyCase_Interface: IState = {
  name: "재영",
  capital: "테스트 중",
  example: "에러가 나와야 한다.",
};

const additionalPropertyCase_Class: CState = {
  name: "재영",
  capital: "테스트 중",
  example: "에러가 나와야 한다.",
};

/**
 * @example 타입과 인터페이스 모두 함수와 제네릭을 사용할 수 있다.
 */
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

/**
 * @example 타입을 중간이 만들어서 확장하려 해도 불가능하다.
 */
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
