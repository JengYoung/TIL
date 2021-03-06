# **TypeScript?**

- 오픈소스 프로그래밍 언어
- 자바스크립트의 상위 집합. `ECMAScript` 지원
- 정적인 언어, **컴파일 시간에 타입 검사**
- 타입 구문을 사용하는 순간부터, 자바스크립트는 타입스크립트 프로그램의 영역으로 들어간다.
- 반대로, 타입스크립트로 이루어졌더라도, 자바스크립트가 아닌 프로그램은 존재한다.
- 동작의 이슈를 잡는다기 보다는, 문법적인 오류를 컴파일하며 검출하는 언어이다.
- 타입 시스템을 통해 자바스크립트의 런타임 동작을 '모델링'한다. 따라서 컴파일 시점에서 런타임 오류를 발생시키는 코드를 찾아낸다.

## **장점**

1. 강력한 타입으로 대규모의 애플리케이션 개발에 좋다.
2. 자바스크립트 라이브러리와의 편리한 사용
3. 개발도구의 강력한 지원
4. 타입 구문의 **'의도'**를 부여함으로써, 타입스크립트를 통해 코드의 동작과 의도가 다른 부분을 찾도록 할 수 있다.

> 프로그래밍 언어로써모든 자바스크립트의 기능 지원 + 최신 자바스크립트 기능도 지원 + 컴파일 통해 자바스크립트를 만들어내는 프로그래밍 언어


## **단점**

1. 의도가 잘못 해석될 가능성이 존재한다.
2. 타입의 변환을 strict하게 check하기 때문에, 이러한 엄격한 검사를 기피하는 성향이라면 쓰지 않는 것이 효율적일 수 있다.
3. 타입 검사만으로 완벽하게 오류를 해결할 수는 없다.
4. 타입을 명시적으로 선언하는 데 있어 초기 시간과 노력이 소요된다.

---

## **개발환경 구성**

1. `Node.js` 설치
2. `VS Code` 설치
3. `VS Code` 실행

   ```
   mkdir ts-basic
   ```

4. 이후 설정(선택사항)
   ![설정](https://images.velog.io/images/young_pallete/post/551274ba-3aaa-41de-8b52-0a54940c1e0b/image.png)
   어떤 파일을 만들 때, 상단에 내비게이션 경로를 만들어줌.

5. 터미널 명령
   ```
   yarn global add typescript
   ```
6. 실행
   ```
   tsc ts-basic/hello.ts
   ```

정상적으로 `.js`파일이 나오면서 실행됨을 확인했다!
![실행 결과](https://images.velog.io/images/young_pallete/post/a4305ba9-d3d6-4a4a-82ba-48a60e184754/image.png)
