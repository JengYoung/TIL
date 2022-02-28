# OOCSS

> **외형과 구조를 분리하고, 콘테이너와 콘텐츠를 분리한다.**
> 

`OOCSS`는 2008년, 니콜 설리반이 주장한, 객체 지향적으로 스타일 문법을 적용하자는 `CSS` 방법론입니다. 여기서 객체란 니콜 설리반의 말을 빌려 전하자면 `CSS 객체`이며, 이는 HTML, CSS, JS에서 독립적인 fragment로 추상화, 반복될 수 있는 시각적 패턴을 의미합니다. 

### 외형과 구조를 분리

기존의 CSS는 클래스 사용을 자제하고, 아이디 선택자, 후손 선택자를 이용하여 계단식으로 사용하는 방식이 대세였습니다. 예시를 들어 어떤 버튼 컴포넌트가 있다고 가정하겠습니다.

```html
<body>
	<button id="button">
		it's<span>Button<span>
	</button>
</body>

<style>
// id selector + span tag selector => specificity++ , complexity++
# button {
  width: 20rem;
  height: 3rem;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: rgb(59 130 246);
  color: blue;
}
#button span {
  color: red;
  font-size: 1rem;
  font-weight: 400;
}
</style>
```

얼핏 보면 문제가 없어 보이지만, 코드가 길어질 수록 이러한 선택자들의 혼용과 계층적인 구조는 결과적으로 `selector`의 `specificity`의 복잡성을 증대시켰고, 따라서 스타일 우선순위에 대한 계산을 어렵게 만들었습니다.  

따라서 이러한 문제를 해결하고자, 니콜 설리반은 구조와 외양을 분리한 클래스 사용을 권장하였습니다.

예컨대 다음과 같이 클래스를 사용하여 해결해보겠습니다.

```html
<body>
	<button class="button button-primary">
		it's<span class="text-danger f-medium">Button<span>
	</button>
</body>

<style>
// id selector + span tag selector => specificity++ , complexity++
.button {
  width: 20rem;
  height: 3rem;
  border-radius: 10px;
  border: none;
  outline: none;
}

.button-primary {
  background-color: rgb(59 130 246);
  color: blue;
}

.text-danger {
	color: red;
}

.f-medium {
  font-size: 1rem;
	font-weight: 400;
}
</style>
```

`.button`의 경우 단순히 위치나 크기, 보더를 정의합니다. 이러한 기본 뼈대를 이루는 레이아웃을 정의하는 것을 구조(structure)라 말합니다. 

한편, `button-primary` 등은 뼈대에 대한 색상 등의 색깔 등만 바꿉니다. 이를 외형(skin)이라고 칭합니다. 따라서 이를 분리함으로써 개발자는 클래스에 대한 재사용성을 높일 수 있는 것이죠.

얼핏 코드의 양이 늘어난 듯합니다. 하지만, 클래스를 사용함으로써 스타일 정의 컨벤션이 일관적이고, 계산의 복잡성이 낮아졌습니다. 이러한 코드는 앞으로 다음과 같이 수많은 컴포넌트를 재사용하는 데 있어 매우 생산성이 높고 강력합니다.

```html
<body>
  <button class="button button-primary f-medium">
		it's<span class="text-white f-medium">Primary Button<span>
	</button>
  <button class="button button-warning f-large">
		it's<span class="text-danger f-medium">Button<span>
	</button>
</body>

<style>
.button {
  width: 20rem;
  height: 3rem;
  border-radius: 10px;
  border: none;
  outline: none;
}

.button-primary {
  color: white;
  background-color: rgb(59 130 246);
}

.button-warning {
  color: white;
  background-color: rgb(251 146 60);
}

.text-white {
	color: white;
}

.text-danger {
	color: red;
}

.f-medium {
  font-size: 1rem;
  font-weight: 400;
}

.f-large {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
```

원래였다면 각 `id selector`을 토대로 스타일을 작업해야 하며, 이는 불필요한 코드의 반복을 늘렸을 것입니다. 하지만 `OOCSS`를 사용하면 `text-danger`, `f-large` 만을 생산함으로써 빠르고 일관적이게 코드를 재사용할 수 있는 것이죠.

### 콘테이너와 내용을 분리

위에서 서술했듯, 니콜 설리반은 복잡한 셀렉터의 혼용을 지양했습니다. 이것이 클래스를 통해 일관성 있게 작성하는 가장 큰 이유인데요. 이는 콘테이너와 내용을 분리하자는 철학과 상통합니다. 

어떠한 콘테이너에서든, 스타일 코드는 위치에 종속되지 않는 것이 `OOCSS`의 핵심입니다. 그 이유는, 스타일 코드가 계층에 종속적일 수록, 스타일의 복잡도가 높아지기 때문입니다. 이를 상위 조각(container)와 그 내용물(content)를 분리한다고 설명합니다. 예시를 통해 간단히 살펴보겠습니다.

```html
<body>
  <header class="header-to-be-color-black">
    <h1>Result</h1>
  </header>
</body>

<style>
header > h1 {
  color: orange;
}
<style>
```

`box`는 원래 `black` 색상의 `color`를 기대하였으나, `header > h1`이라는 컨테이너의 태그 선택자의 자식 셀렉터 스타일 속성으로 인해 결과적으로 내용물의 스타일이 바뀌었습니다.

따라서, `OOCSS`는 이러한 복잡성을 단순히 자식 셀렉터 역시 `class`로 설정함으로써 일관성 있게 작성하도록 권장합니다.

```html
<body>
  <header class="header-to-be-color-black">
    <h1 class="title">Result</h1>
  </header>
</body>

<style>
.title {
  color: black;
}
<style>
```

이러한 클래스의 명시를 통해 개발자는 편리하게 우선순위를 크게 신경 쓰지 않고 작성할 수 있도록 하자는 것이 `OOCSS`의 요지입니다.

# 참고자료

**CSS**

[https://developer.mozilla.org/ko/docs/Web/CSS](https://developer.mozilla.org/ko/docs/Web/CSS)

**OOCSS**

[https://medium.com/witinweb/css-방법론-2-oocss-object-oriented-css-4064e1119354](https://medium.com/witinweb/css-%EB%B0%A9%EB%B2%95%EB%A1%A0-2-oocss-object-oriented-css-4064e1119354)

[https://github.com/stubbornella/oocss/wiki](https://github.com/stubbornella/oocss/wiki)
