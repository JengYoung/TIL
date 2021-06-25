# **TypeScript?**

- 오픈소스 프로그래밍 언어
- 자바스크립트의 상위 집합. `ECMAScript` 지원
- 정적인 언어, **컴파일 시간에 타입 검사**

## **장점**

1. 강력한 타입으로 대규모의 애플리케이션 개발에 좋다.
2. 자바스크립트 라이브러리와의 편리한 사용
3. 개발도구의 강력한 지원

> 프로그래밍 언어로써모든 자바스크립트의 기능 지원 + 최신 자바스크립트 기능도 지원 + 컴파일 통해 자바스크립트를 만들어내는 프로그래밍 언어

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
