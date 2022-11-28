## 공통점과 차이점

### 공통점 

데이터를 클라이언트에서 관리, 저장한다는 점(쿠키 역시 `Modern Storage APIs` 전에는 저장 용도로 사용 - 현재 웹 스토리지가 지원되는 이후로 비권장)

### 차이점

1. `Storage`와 `Cookie`는 **서버 전달 여부**에서 차이가 있다.
   - LocalStorage, SessionStorage: window 객체에서 저장. 서버 전달 X
   - Cookie: 서버와 지속적으로 요청 및 응답을 주고받음.
2. `LocalStorage` 와 `SessionStorage`는 **저장의 영구성 측면**에서 차이가 있다.
   - LocalStorage: 브라우저가 종료돼도 저장. (직접 삭제 전까지 저장)
   - SessionStorage: 페이지 세션 종료 시 데이터 소멸(일회성이 강함)

### 기타

Cookie는 **유효기간을 따로 설정할 수 있다는 측면에서 장점**을 갖고 있다.

---

## 📢 부가 설명

스토리지의 경우

1. 메소드가 동일하며(getItem, setItem, clear, removeItem...) 모바일은 2.5mb, 데스크탑은 5mb~10mb 정도로 저장된다고 한다.
2. 각 문자 2바이트인 UTF-16 DOMString의 형태로 저장(key, value는 문자형태로 저장됨)의도적인 설정이 없는 한 데이터 만료되지 않음.

### `LocalStorage`

- **HTTP, HTTPS 등의 프로토콜 별로 자료를 구분하여 저장.**
- 즉 `https://abc.de`와 `http://abc.de` 에 저장된 자료가 서로 구분된다는 것에 주의!

### `SessionStorage`

- 페이지 세션이 끝날 때 데이터 제거
- **종료 기준: 브라우저가 열려있는 한(새로고침& 페이지 복구에서도 유지)**
- 페이지 세션이 기준이기 때문에, **각각의 탭/창마다 생성.** 즉 해당 탭/창이 종료될 때까지 유지!


### `Cookie`

- 이름-값 페어로 시작 (<cookie-name>=<cookie-value>)
- 주 사용 목적은 저장 관리 / 개인 환경 설정 / 트래킹 용도
- connectionless, stateless한 HTTP 요청에서의 단점을 보완하는 용도
- 4KB의 용량으로, 서버가 사용자에게 전송하는 데이터.모든 요청마다 쿠키가 함께 전송되므로 성능 저하의 원인이 될 수 있음
- 서버에서 클라이언트에게 응답 시, Set-Cookie HTTP 응답 헤더를 전송 가능 → 이를 통해 클라이언트에게 해당 쿠키를 저장하라고 전달 → 브라우저는 Cookie 헤더를 사용, 저장했던 모든 쿠키들을 회신
- 워낙 쿠키의 경우, **데이터 보안에 취약(XSS, CSRF)**하기에, 다음과 같은 속성들을 설정한다.

  1. `httponly`:  JS를 통한 추출 방지, 세션 하이재킹과 XSS에 대한 보안  
  2. `Expires` 쿠키 만료 기한 설정. (서버가 아닌 클라이언트에 상대적)  
  3. `Secure` HTTPS 프로토콜 상에서 암호화된 요청일 경우에만 전송
  4. `samesite`
     - `strict` 쿠키 전송을 first-party cookie로만 제한
     - `lax` Chrome80버전 이후로 기본값이 됨. `strict`와 비슷하지만 일부에서 예외를 허용
     - `none` Third party context에서도 쿠키를 사용해도 된다는 것을 의미

  ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FMe3tm%2FbtqBoPWFr2U%2FWRLDUFGNzsa8zwSO6yIh21%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FMe3tm%2FbtqBoPWFr2U%2FWRLDUFGNzsa8zwSO6yIh21%2Fimg.png)

쿠키에 대한 주요 설명은 이 외에도 참고할 것이 너무 많다.

다음 [MDN 문서](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)를 통해 참고하기를 권장한다.

---

## 📃 참고자료

[참조 1. MDN 세션스토리지](https://developer.mozilla.org/ko/docs/Web/API/Window/sessionStorage) / [로컬스토리지](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

[참조 2. MDN 쿠키](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)[참조](https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048)

[참조 3. 로컬스토리지, 세션스토리지(블로그)](https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048)

[참조 4. 쿠키와 세션 그리고 로컬 스토리지와 세션 스토리지(블로그)](https://racoonlotty.tistory.com/entry/%EC%BF%A0%ED%82%A4%EC%99%80-%EC%84%B8%EC%85%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%A1%9C%EC%BB%AC-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80%EC%99%80-%EC%84%B8%EC%85%98-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80)

[참조 5. 쿠키(Cookie) - Same Site(블로그)](https://jinn-blog.tistory.com/97)
