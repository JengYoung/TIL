## 🙄 Semantic Markup?

의미를 그대로 직역하자면 **의미론적인 마크업**이 되겠다.
일반적인 시각에서 보면 이상하다. `div`, `span`, `table`, `b` 등등 모두 다 각자의 의미가 있는 게 아닌가!

물론 사람의 시각에서 보면 각각의 특징이 있고 의미가 있게 느껴진다.

더군다나 다음 예시를 살펴보자.

```jsx
<p>
  The Queen Mary <strong>sailed</strong> last night.
</p>
```

위의 element의 경우 strong 부분이 강조됨을 알 수 있다.

하지만 다음 코드는 어떠할 지 살펴보자.

```jsx
<p>
  The Queen Mary <b>sailed</b> last night.
</p>
```

실제로 결과는 같게 보이지만, 의미론적으로 본다면 강조하는 `strong`이 더욱 적합하다.

사람도 이렇게 헷갈리는데, 특히 \*\*\*\*컴퓨터는 정보의 의미의 중요도를 알 수가 없는 노릇이다!

결국에, 검색 엔진은 중요한 **의미를 모르기 때문에 검색 순위를 최적화하기 어려워지고**, 사용자는 원하는 정보를 제때 찾을 수 없기에 불편함이 발생한다.

과거 `html4`에서는 `<div id="main"></div>` 등으로 이를 표현했지만, `html5`에서는**정보의 중요도를 담을 수 있는 tag들을 지원하기 시작했다.**

이**것이 바로 Semantic Markup**이다.

시멘틱 마크업을 고려한 페이지는 다음과 같은 4가지 효과를 얻는다.

- **SEO에 최적화**되어 검색 노출에 유리
- **웹 접근성이 향상**되며, 시각 장애를 가진 사용자에게 더욱 의미를 잘 전달 가능 [(접근성에 관한 글 참조)](https://developers.google.com/web/fundamentals/accessibility?hl=ko)
- 구조를 읽는 데 있어 의미를 부여하므로 **가독성**
- 시멘틱하게 이루어진 HTML은 그렇지 않은 코드보다 더욱 가벼우며, 특히 모바일에서 반응이 잘 이루어짐

**참고.**
검색 엔진 최적화는 각 검색 엔진마다 기준이 다르지만,
대부분이 다음 3가지 요소를 중점으로 검색 우선순위를 정한다.

1. 기술적 (semantic)
2. 콘텐츠 작성 (text / image)
3. 인기도 (많은 사람들이 링크를 타고 올 시)

결국 1이 기본이 되어야 → **2번인 텍스트의 중요도**를 담아내고 **3번이 증가할 수 있는 선순환**
고로 semantic markup은 **SEO 최적화를 위해 필수불가결한 조건**

---

## 💬 본론

대부분의 웹 사이트에서의 핵심 semantic markup은 다음과 같다.

![https://www.w3schools.com/html/img_sem_elements.gif](https://www.w3schools.com/html/img_sem_elements.gif)

- `main`

  문서의 핵심 주제 / 핵심 기능을 담당·확장하는 콘텐츠

- `header`

  제목, 로고, 검색 폼, 작성자 이름 등 도입부에 해당하는 콘텐츠

- `nav`

  현재 페이지 내, 또는 다른 페이지로의 링크를 보여주는 구획

- `section & article`

  - `section`
    더 적합한 의미 요소로 나눌 수 없는 독립적인 구획.

        하나의 주제 안에 또 다른 세부 주제가 있다면 **section요소를 중첩 사용 가능**

  - `article`
    사이트 안에서 독립적으로 구분해 배포, 재사용할 수 있는 구획.
    작성자 정보는 `address`요소에 담을 수 있다.
    **`article`은 중첩이 가능하다.** (ex: 블로그 글 - 해당 글의 댓글)
    다만 중첩할 시, 중첩된 `article`은 `address`요소를 담을 수 없다.

        **여기서 section과 article은 약간의 의미 차이가 있다.**
        [한 블로그 저자의 말](https://webactually.com/2020/03/03/%3Csection%3E%EC%9D%84-%EB%B2%84%EB%A6%AC%EA%B3%A0-HTML5-%3Carticle%3E%EC%9D%84-%EC%8D%A8%EC%95%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0/)에 따르면, section은 일종의 목차 인식 기능을 담당하는 컨테이너 역할로서 고안되었는데, 결과적으로 웹 브라우저는 본 기능을 인식하지 못하기에, 웹사이트의 각 콘텐츠의 독립적 의미를 담기 위해 article을 추천하고 있다.
        **정리: 포괄적인 컨테이너의 의미는 section, 독립적 콘텐츠의 의미는 article**

- `aside`

  주요 내용과 간접적으로만 연관된 부분

- `footer`

  가장 가까운 구획 콘텐츠나 구획 루트의 푸터
  구획의 작성자, 저작권 정보, 관련 문서 등

- `detail & summary`

  `detail`
  "열림" 상태일 때만 내부 정보를 보여주는 정보 공개 위젯
  `summary`
  공개 상자에 대한 요약, 캡션 또는 범례를 지정

  ```
  <details>
      <summary>Details</summary>
      Something small enough to escape casual notice.
  </details>

  ```

- `figure` & `figcaption`

  `figure`
  주 문서 플로우가 참조하지만,
  다른 부분이나 부록으로 이동해도 문제 없는 이미지, 삽화, 도표, 코드 조각
  `figcaption`
  figure 요소가 포함하는 다른 콘텐츠에 대한 설명 혹은 범례

  ```
  <figure>
      <img src="/media/cc0-images/elephant-660-480.jpg"
           alt="Elephant at sunset">
      <figcaption>An elephant at sunset</figcaption>
  </figure>

  ```

- `mark`

  현재 내용 중 중요하여 하이라이트할 부분

  ```
  <mark>예시</mark>

  ```

  위의 결과: 예시

- `time`
  1. 시간의 특정 지점 또는 구간을 나타냄.
  2. 24시간 시계법 / 그레고리력 / [다음과 같은 시간 범위](https://www.w3.org/TR/2014/REC-html5-20141028/infrastructure.html#valid-duration-string)의 시간을 나타낼 수 있음
  3. `datetime attribute`를 통해 적절한 검색 결과 / 알림 등의 기능을 구현
  4. IE에서는 지원 X
  5. `datetime attribute`의 경우, 형식을 맞춰줘야 하는데, 매우 다양하니 형식은 [이 페이지](https://developer.mozilla.org/ko/docs/Web/HTML/Element/time)에서 참고하자.

기타

- `hgroup`

  표제와 부제를 묶어주는 요소.

  html5 최종 표준에서 제외됨.

- `aria`

  ‘Accessible Rich Internet Applications’의 약자로 리치 인터넷을 위한 W3C 접근성 명세

  **장애를 가진 사용자가 웹 콘텐츠와 웹 어플리케이션(특히 JavaScript를 사용하여 개발한 경우)에 더 쉽게 접근할 수 있는 방법을 정의**하는 여러 특성

  `data` 속성과 비슷한 것들을 수행할 수 있는데, `data` 속성이 **데이터**에 초점을 둔다면, `aria` 는 **접근성**에 좀 더 초점을 둔다는 점이 차이가 있다.

  ```jsx
  <a href="#" role="button" aria-label="Delete item 1">
    삭제
  </a>
  ```

  `a` 태그를 사용하여 링크로 사용하지만, 기능은 버튼으로 지정했기에, **스크린리더는 버튼으로 인식**

  올바른 태그에 잘 접목한다면 보조 기술들이 잘 해석하게 해주어 접근성을 높여주지만 아래에 인용한 [WAI의 작성 안내서](https://www.w3.org/TR/wai-aria-practices-1.1/)와 같이 부주의하게 사용할 경우 시멘틱을 override할 수 있기에 신중해야 한다.

  실제로 다음과 같이 [가이드라인](https://github.com/lezhin/accessibility/blob/master/aria/README.md)을 만들기도 한다.

  > It enables authors to describe nearly any user interface component in ways that assistive technologies can reliably interpret, thus **making components accessible to assistive technology users.**
  > This is also the danger of ARIA. **Authors can inadvertently override accessibility semantics.**

---

## 📃 참고하면 좋은 자료

[참고 1. W3CSchools - html5_semantic_elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

[참고 2. MDN - Semantics](https://developer.mozilla.org/ko/docs/Glossary/Semantics#%EC%9D%98%EB%AF%B8%EB%A1%A0%EC%A0%81_%EC%9A%94%EC%86%8Celement%EB%93%A4)

[참고 3. MDN - 콘텐츠 카테고리](https://developer.mozilla.org/ko/docs/Web/Guide/HTML/Content_categories#%EC%A0%9C%EB%AA%A9_%EC%BD%98%ED%85%90%EC%B8%A0)

[참고 4. MDN - ARIA](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA)

[참고 5. HTML - 접근성을 위한 기초](https://developer.mozilla.org/ko/docs/Learn/Accessibility/HTML)
