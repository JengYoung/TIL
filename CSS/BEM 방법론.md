# BEM

> `**Block`, `Element`, `Modifier`로 분리하여 블록 레벨에서 재사용성 및 유지보수성을 높게 관리하자.**
> 

`OOCSS`와 달리 `BEM`은 클래스 네이밍 자체에도 컨벤션이 정해져 있어, 처음 볼 때는 그 모양이 괴기할 수도 있어 낯선 방법론입니다. 하지만 `BEM`이 주는 일관성과 생산성은 매우 강력하기에 많은 곳에서 애용하고 있는 방법론이기도 합니다.

`BEM`은 `Block, Element, Modifier`의 약자로써, 다음 3가지로 나누어 클래스 네이밍을 하여 스타일을 지정하자는 방법론입니다.

- `Block` 블록은 재사용이 가능한 컴포넌트 스타일 조각 단위를 의미합니다.
- `Element`는 블록의 하위 계층에서 이루고 있는 스타일 조각으로, 블록 역시 상위 블록의 엘리먼트로 자리잡을 수 있습니다.
- `Modifier` 수정자를 의미하며, 외형이나 상태를 변경할 때의 스타일을 규정하는 목적으로 사용합니다.

보통 네이밍 컨벤션은 `[[Block]]__[[Element]]--[[Modifier]]`의 형태로 이루어집니다. 다음 예시를 통해 살펴보겠습니다.

```html
<body>
  <form action="" class="form">
    <h4 class="form__title">Form Example</h4>
    <input type="text" class="form__input">
    <button class="form__button form__button--active">Submit</button>
  </form>
</body>
```

여기서 `.form`은 하나의 블록으로, 다른 곳에서도 재사용이 가능한 스타일 코드를 담은 셀렉터입니다.

이후, `form__title` `form__input` `form__button`은 블록을 이루고 있는 엘리먼트이며, 

`form__button--active`는 버튼이 액티브되었을 때 나오는 상태의 스타일 변화를 담는 셀렉터입니다.

따라서 클래스 네이밍에 컨벤션을 주어 나열한다면, 프로젝트가 복잡해지더라도 클래스가 겹치지 않게, 그리고 패턴은 일관성 있게 유지하며 작성할 수 있다는 것이 `BEM` 방법론의 요지입니다.

다만 한계 역시 명확합니다. 바로, 블록 계층의 중첩에서 오는 어려움인데요. 만약 다음과 같이 `title`과 `input`, `button` 역시 스타일적으로 재사용되는 블록이라면 다음과 같이 `HTML` 코드가 작성될 것입니다.

```html
<body>
  <form action="" class="form">
    <h4 class="title">Form Example</h4>
    <input type="text" class="input">
    <button class="button button--active">Submit</button>
  </form>
</body>
```

작동에 있어서 문제는 없습니다. 하지만, 코드가 길어지고, `BEM`으로 일관적인 코드가 작성되어진다면, 저 코드만 얼핏 봐서는 `form`을 이루고 있는 엘리먼트인지, 그 계층성을 판단하기는 어려워집니다. 무엇보다 다른 개발자들과 함께 작성할 때, 누군가는 `form__title`이라고 작성해도 `BEM`에 어긋나지 않습니다. 

즉, 블록과 엘리먼트가 때로는 혼용될 수 있다는 컨벤션에서 일관화된 규칙을 팀 차원에서 제대로 세우지 않는다면 혼란이 있을 수 있다는 불편한 여지를 남깁니다.

따라서, 이를 해결하기 위해 다음과 같이 코드를 작성할 수 있지만, 이 역시 불필요한 `element`를 추가한다는 측면에서 좋지는 않습니다.

```html
<body>
  <form action="" class="form">
	  <div class="form__item"><h4 class="title">Form Example</h4></div>
    <div class="form__item"><input type="text" class="input"></div>
    <div class="form__item"><button class="button button--active">Submit</button></div>
  </form>
</body>
```

따라서 `BEM`을 일관성 있게 협업하며 작성하기 위해서는 블록의 중첩에 관해서 유의하며 작성하는 것을 권장합니다.

# 참고자료
[http://getbem.com/introduction/](http://getbem.com/introduction/)

[https://www.smashingmagazine.com/2012/04/a-new-front-end-methodology-bem/](https://www.smashingmagazine.com/2012/04/a-new-front-end-methodology-bem/)
