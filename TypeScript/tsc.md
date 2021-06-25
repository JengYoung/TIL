# **tsc란**

- `TypeScriptCompiler`의 줄임말.

- 말 그대로 터미널에서, 타입스크립트 컴파일러를 실행한다는 명령어

## **Syntax**

> `tsc [options] [file...]`

`file`과 `option` 순서는 상관 없음.

타입스크립트는 이전 ~ 최신 자바스크립트를 모두 지원함.

> `--target` option

어떤 특정 버전으로 변경하고 싶을 때.

```
tsc hello.ts --target es6
```

> `--lib` option

사용할 라이브러리 정의

> `showConfig` option

`tsconfig.json`을 생성할 때 유용
