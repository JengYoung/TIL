# **명시도(specificity)**

브라우저가 요소와 가장 관련이 있는 css property를 결정하고 적용할 방법이다. (MDN)

⇒ 즉, **specificity**는 `developer-defined style`이 어느 특정한 element에 적용될 지 결정할 때 사용하는 규칙이다.

---

## **명시도 계산법**

a, b, c, d ⇒ 네개의 값을 기반으로 규칙에 대해 계산

- (a) 인라인 요소 일 때 1, 아니면 0
- (b) ID selector의 수
- (c) 클래스, 가상클래스, 속성 선택자의 수
- (c) 요소의 수

왼쪽에서 오른쪽 순으로 각 열의 가장 높은 값을 비교해서 명시도를 비교한다.
ex. 0,0,1,0 > 0,0,0,13

---

## **명시도의 특징**

> hen multiple declarations have equal specificity, the last declaration found in the CSS is applied to the element.

1. 명시도가 같을 때, 뒤에 선언된 것이 적용된다.
2. 인라인 스타일은 항상 외부 스타일을 덮어쓰므로 가장 높은 명시도를 갖는 것으로 생각할 수 있다
3. `!important` 을 스타일 선언에 사용하면 이 부분이 우선 적용된다. !important를 사용하면 스타일시트 내 자연스러운 종속을 깨뜨려 디버깅을 어렵게 만들기 때문에 피하는 것이 좋다.
4. `type selectors` , `pseudo selector` < `class selector` < `ID selector` < `inline style` < `!important`

---

# **참고자료**

[https://iamdaeyun.tistory.com/entry/Lesson-7-CSS-사용시-반드시-알아야-할것-명시도](https://iamdaeyun.tistory.com/entry/Lesson-7-CSS-%EC%82%AC%EC%9A%A9%EC%8B%9C-%EB%B0%98%EB%93%9C%EC%8B%9C-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0%EA%B2%83-%EB%AA%85%EC%8B%9C%EB%8F%84)
[https://developer.mozilla.org/ko/docs/Web/CSS/Specificity](https://developer.mozilla.org/ko/docs/Web/CSS/Specificity)
