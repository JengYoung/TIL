# 1. 시작하며 👏

오랜만의 글인 것 같습니다.
최근에 제 자신에 대한 회의감도 들었고, 그래서 잠시 슬럼프를 겪었지만, 이제 어느정도 극복하고, 다시 꾸준함을 찾으려합니다.

> 결국 **꾸준함이야 말로 제가 성장하고 있는 증거이자, 증명할 수 있는 무기니까요.** 😋
> 우리 모두, 꾸준함을 잃지 않아봅시다!

그렇게 슬럼프를 딛고 첫 글, `Repaint`와 `Reflow`를 톺아봅시다.

---

## 2. Repaint, Reflow란?

**말 그대로 해당 요소를 다시 칠하고, 다시 플로우를 정하는 거겠죠!**
처음 배울 때에는 무턱대고 쉽게 했지만, **점점 배울 수록 최적화 고민으로 인해 머리 빠지는 원인 중 하나입니다. 같이 배워나가자구요! 😂😂**

물론 이것을 원해서 들어온 건 아닐 거겠지만, 그래도 확실히 이해하기 위해서는 브라우저의 렌더링 과정을 이해해야 하는 것이 선행과정입니다.

---

### 2-1. 브라우저의 작동방식

우리의 브라우저는 말이죠, 다 다르게 동작하겠지만 대다수의 브라우저는 다음과 같은 동작 방식을 거치게 된답니다.
(사진은 다음 [출처](http://www.phpied.com/files/reflow/render.png)에서 갖고 왔습니다 😊)
![브라우저의 동작 방식](http://www.phpied.com/files/reflow/render.png)

간단히 살펴보자면, **HTML을 파싱해서 DOM 트리**를 만들고,
**CSS를 파싱해서 스타일 구조체를 만들어내는데, 이를 CSSOM 트리**라고 말합니다.

> #### 정리 2-1-1.
>
> ** 1. HTML 파싱 -> DOM Tree**
> ** 2. 그러다가 `link`를 만나면 CSS 파싱 -> CSSOM Tree**
> (사실상 DOM을 만들다 보면 CSS도 파싱되는 과정을 함께 거치기 때문에, 둘다 동시에 만들어진다~라고 표기하는 듯합니다.)

이후는 말이죠, 위 둘을 토대로 `attachment`라는 과정을 거치며 `Render Tree`라는 것을 생성해냅니다. 쉽게 말하자면... 각 노드에는 `attach`라는 메소드가 있으며, 해당 노드가 추가되면 메소드를 실행시킵니다. 이 `attach`는 노드의 스타일을 객체 형태로 리턴시키면서, 둘이 합쳐지는 과정인 겁니다.

**특이한 건, DOM과 Render Tree가 항상 일치하지는 않습니다.
Render Tree는 문서의 시각적 측면에서 올바른 순서대로 내용을 그리도록 하기 위한 목적을 갖고 있어요.**

예컨대, 렌더 트리는 `display: none`의 경우, 화면상에 나타나지 않으므로 불필요하다고 판단, 트리에서 제외시켜버립니다.
좀 더 나아가자면, `head`와 같은 것들도 마찬가지로 제외시켜버리구요.

> **정리 2-1-2.**
> **3. attachment -> Render Tree**

그 다음에 이제 오늘의 주제인 **`reflow`**라는 게 나옵니다. 사실, **레이아웃**이라는 단계로 더 많이 불리기도 하죠. 레이아웃에서는 렌더 트리의 목적에 맞게, 각 요소의 구체적인 위치와 크기를 연산해냅니다.

또한, 최신 브라우저의 경우에는 이 과정 이후, `update Layer Tree`를 생성해낸다고 합니다.
![](https://images.velog.io/images/young_pallete/post/7eb3e001-3997-49eb-9aa3-98efebf94f03/image.png)

결과적으로 이를 브라우저에 픽셀을 렌더링하는 페인팅 과정을 거치게 됩니다. 이를 위해 여기서는 각 노드를 거치면서 **`paint()`** 메소드를 호출하죠. (여기가 **`Repaint`**와 사실상 대응하겠죠?!)

이후에는 최신 브라우저의 경우 **합성(Composite) 단계**가 조건적으로 발생합니다. 이 단계는 생성된 Layer 들을 합성하여 단 한장의 비트맵으로 만들어버립니다!

각 Layer 별로 paint 되기 때문에 불필요한 painting 을 줄여 효율적으로 그릴 수 있습니다.

> **정리 2-1-3.** >**4. Render Tree -> Layout 산출**
> (최신 브라우저의 경우 Layer 단계 발생)
> **5. Render Tree -> Painting 처리**
> (최신 브라우저의 경우, 만약 Renderer Layer가 2개 이상이면 Composite 단계 발생)

---

### 2.2. Reflow, Repaint 발생!

사실상 우리의 브라우저에서 계속해서 같은 스타일로 있지는 않겠죠?
개발자의 의도에 따라 어떤 노드에 무엇을 추가하고, 어떤 요소에는 스타일이 달라지기도 합니다.

또한, 브라우저 크기를 조절하는 경우에도 스타일은 다시 계산되기도 하죠.(viewport 변경)

**이럴 때 발생하는 게 `Reflow`와 `Repaint`입니다.
**만약 스타일이나 `DOM` 내부를 변경하는 `DOM API`가 사용됐다면, 우리의 `DOM`은

> 1. 뭔가 변경됐음을 감지하고,
> 2. 다시 위의 브라우저 작동 과정을 반복하고,
> 3. 리렌더링을 진행하죠.
>
> 이러한 과정에서 리플로우와 리페인트가 발생하는 겁니다!

먼저, 레이아웃의 경우 다음과 같이 `Paint`와 `Composite`과정 모두를 하게 됩니다. (이 그림은, [이 글](https://cresumerjang.github.io/2019/06/24/critical-rendering-path/)에서 가져왔습니다.)
![리플로우](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

만약 리페인트만 한다면 다음과 같구요.
![리페인트](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-no-layout.jpg)

만약 둘 다 필요 없는 스타일의 변화라면, 다음과 같겠습니다. 가장 이상적이죠!
![이상적인 경우](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-no-layout-paint.jpg)

그리고 그냥 속성과 메서드를 사용했다는 이유만으로도, 리플로우가 발생하는 것들이 있습니다. 이는 [다음 글의 표](https://12bme.tistory.com/140)를 갖고 왔어요.
![reflow](https://images.velog.io/images/young_pallete/post/b76b43f2-ee8a-4baa-930e-99912eac7d3c/image.png)

---

### 2-3. Reflow, Repaint 최소화

물론, 리플로우와 리페인트는 완전히 피할 수 없습니다. 그러나 최적화할 수 있다면 최대한 줄이는 게 현명한 선택이겠죠! 따라서 우리는 최소화에 대한 고민을 해야 합니다.

`Repaint`의 경우, `Visibility`를 `DOM API`을 통해 조절했을 때 자식 노드들까지 다 검색하기 때문에 성능 저하를 발생시킬 수도 있다고 합니다.

특히 `Reflow`는 더 심각한 성능 저하를 만들기도 해요. 리플로우는 해당 요소의 자식요소와 부모/조상 요소역시 레이아웃 계산을 진행해버리니까요.

> **정리를 하자면 리플로우의 원인은 다음과 같습니다.**

- 윈도우 리사이징 (뷰포트 변화는 Global Layout에 영향)
- 폰트의 변화 (`height`계산에 영향을 주므로 Global Layout에 영향)
- 스타일 추가 또는 제거
- 내용 변화 (인풋박스에 텍스트 입력 등..)
- :hover와 같은 CSS Pseudo Class
  ([CSS: The Definitive Guide: The Definitive Guide](https://books.google.co.kr/books?id=rdtCRLXAL78C&pg=PA55&lpg=PA55&dq=hover+reflow&source=bl&ots=mWTSkd06-s&sig=ACfU3U2Q41GoWAQUmfrIyGvwjpxEi9ptIQ&hl=ko&sa=X&ved=2ahUKEwjUprCypK3xAhUkLqYKHS8YCeQQ6AEwCXoECAYQAw#v=onepage&q=hover%20reflow&f=false) 55p에서, `hover`할 시 나타나는 변화로 인한 우려가 생긴다는 의미인 듯 합니다.)
- 클래스 Attribute의 동적 변화
- JS를 통한 DOM 동적 변화
- 엘리먼트에 대한 offsetWidth / offsetHeight (화면에서 보여지는 좌표) 계산시
- 스타일 Attribute 동적변화

너무나 많죠. 사실상 다 피할 수가 없습니다. 따라서 **몇 가지**만큼은 확실히 기억해봅시다! 저는 [이 글](https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf)을 참고하며 적고 있습니다.

> 1.  최대한 DOM 구조 상 말단 노드에만 클래스를 사용
>     (최대한 리플로우의 영향을 최소화하여 수행 비용을 줄인다네요.)
> 2.  인라인 스타일 자제
>     (인라인 스타일이 주어지면 리플로우가 수차례 발생하게 됩니다. 클래스를 사용합시다.)
> 3.  애니메이션은 `positon`을 `absolute`와 `fixed`로 하자.
>     (주변 레이아웃 영향 X)
> 4.  퀄리티와 퍼포먼스를 타협
>     (애니메이션 계산, 페이지 Reflow에 대한 CPU 퍼포먼스 비용을 고려하자)
> 5.  테이블로 구성된 레이아웃 자제 (작은 변화도 테이블 전체 노드가 리플로우 발생)
> 6.  CSS에서의 JS표현식 자제 (문서중 일부가 Reflow될
>     때마다 표현식이 다시계산되기 때문)
> 7.  JS를 통한 스타일 변화는 최대한 그루핑하자
> 8.  CSS 하위 선택자는 필요한 만큼만 쓰자. (CSS Recalculation할 때, CSS Rule에 따라 오른쪽 -> 좌쪽으로 매치시킬 Rule이 없거나 잘못된 Rule이 튀어나올 때까지 계속 매칭하기 때문)
> 9.  일부 속성과 메서드는 자주 사용할 때 캐싱하자.
>     사용한다는 이유만으로도 리플로우가 발생하는 속성과 메서드가 있기 때문
> 10. position: relative; 주의! -일반적인 경우: Box model → Normal flow -`position:absolute or fixed`: Box model → Out of flow(Positioning) -`position:relative`: Box model → Normal flow → Positioning

> **p.s.**
> 만약에 내가 정말 스타일 하나하나에 어떻게 리플로우, 리페인트가 될 지가 중요하고 알고싶다면! https://csstriggers.com/ 를 가보시면, 잘 나와있다고 합니다. 참고하세요!

---

# 참고자료

[브라우저의 동작 과정 1](https://12bme.tistory.com/140)

[브라우저의 동작 과정 2](https://velog.io/@gga01075/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EB%8F%99%EC%9E%91%EA%B3%BC%EC%A0%95)

[Layer Model](https://github.com/im-d-team/Dev-Docs/blob/master/Browser/Layer_Model.md)

[리페인트, 리플로우 1](https://www.phpied.com/rendering-repaint-reflowrelayout-restyle/)

[Reflow의 원인과 마크업 최적화](https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf)

[Reflow or Repaint(or ReDraw)과정 설명 및 최적화 방법](https://webclub.tistory.com/346)
