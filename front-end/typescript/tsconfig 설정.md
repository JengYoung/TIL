# **tsconfig.json**

> `include`

타입스크립트가 포함되어질 파일들을 설정.

```
[
    "include": [
        "src/**/*.ts"
    ]
]
```

하위 소스폴더 밑에 여러 파일들을 주겠다!

> `exclude`

타입스크립트 컴파일러가 제외될 파일들 설정

```
{
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

> `compilerOptions`

컴파일러에 사용할 옵션 설정

```
{
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules"
    ],
    "compilerOptions": {
        "module": "es6",
        "rootDir": "src", // 노드의 루트가 될 곳
        "outDir": "dist", // 컴파일된 파일들이 만들어지는 최상위 폴더
        "target": "es6",
        "sourceMap": true, // source에서 타입스크립트 소스코드를 보고 싶을 경우
        "removeComments": true, // 주석 제거
        "noImplicitAny": true, // 암묵적 any 타입 방지
    }
}
```
