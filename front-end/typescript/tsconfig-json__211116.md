# `tsconfig.json`이란

`TypeScript`를 설정해주는 JSON 포맷 형식의 모듈이다.

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src"]
}
```

### `lib` (Array)

유형 확인 프로세스에 포함될 표준 유형.

### `allowJS` (Boolean)

JavaScript 파일 컴파일 허용 여부를 설정한다. 

### `allowSyntheticDefaultImports` (Boolean)

타입 체킹하는 과정에 있어 기본 내보내기가 없어도 모듈에서 기본 가져오기를 허용

### `skipLibCheck` (Boolean)

모든 type을 선언하는 파일 (`*.d.ts`)의 타입 체킹을 스킵해도 되는지.

### `esModuleInterop` (Boolean)

Babel과 호환성을 가능하게 할지 유무

### `strict` (Boolean)

엄격 모드에서 유형 검사를 이루게 할지.

### `forceConsistentCasingInFileNames` (Boolean)

참조된 파일 이름의 대소문자 일치 여부

### `moduleResolution`

프로젝트의 노드들의 모듈 종속성을 해석하는 방법.

크게 `node` `node12` `classic`이 있다.

### `resolveJsonModule`

파일 설정에 대해 유용한 JSON파일도 모듈로써 인식하게 한다.

### `noEmit`

컴파일 시간 동안에 typescript가 코드를 생성하는 것에 대한 억제 여부를 의미한다. 바벨이 자바스크립트 코드를 생성한다면 `true`를 지정한다.

### `jsx`

`.tsx` 파일에서 JSX를 지원할지에 대한 여부를 의미한다.

### `include`

타입스크립트 체크를 하기 위한 파일과 폴더들을 의미한다. 보통은 `src`를 지정해주면 충분하다.
