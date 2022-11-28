# SMACSS

> `Base` `Layout` `Module` `State` `Theme` 으로 나누어 생각하여 스타일 코드를 prefix를 붙여 관리하자.
> 

보통 “스맥스"라고 불리는 이 스타일 방법론은 `Jonathan Snook`이라는 개발자가 `OOCSS` 등 기존의 스타일 방법론 등에서 영감을 얻어 제안한 스타일 가이드이자 방법론입니다. 

특이한 점은, `OOCSS`와 달리 위 방법론은 자식 선택자에 대한 엄격한 클래스 구분을 적용하지 않습니다. 즉, `nav > li` 와 같은 자식 선택자를 허용한다는 것이 `OOCSS`와의 주요차이점입니다.

prefix의 경우 저자가 컨벤션으로 직접 하기 보다는 해당 방법론과 함께 쓰면 좋다는 차원에서 권장하는 느낌으로 제안하였지만, 이 글에서는 이러한 접두사 역시 위 방법론의 특징으로 묶어 설명하겠습니다.

`SMACSS`에서는 다음과 같이 `Base` `Layout` `Module` `State` `Theme`까지 5가지의 코어 타입으로 구성되어 있습니다. 

## Base

기본 스타일 설정을 의미합니다. 보통 프로젝트를 처음 시작할 때 `reset.css`, `normalize.css`를 통해 크로스 브라우징에 대비한 스타일 초기 설정을 하는데요. 이러한 작업들 역시 `Base`라는 타입에 속한다고 이해하시면 편합니다. 선택자가 포함되지 않으며, 페이지의 모든 항목에서의 기본 스타일을 정의합니다.

```css
body {
  padding: 0;
  margin: 0;
}

h1 {
  padding: 0;
  margin: 0;
}
```

## Layout

페이지는 `Header`, `Footer`, `Main` 등 여러 개의 레이아웃으로 구성될 수 있는데요. 페이지를 이루는 이러한 큰 단위들을 레이아웃이라 명명합니다.

```html
<body>
  <div class="l-sidebar"></div>
</body>
```

```css
.l-sidebar {
  display: fixed;
  width: 400px;
  height: 100vh;
  top: 0;
  left: 0;
  background: #F0F0F0;
}
```

## Module

레이아웃을 이루는 재사용할 수 있는 스타일 단위들을 모듈이라고 부릅니다. 어찌 보면 `BEM`에서의 블록과 유사하다고 볼 수 있겠는데요. 쉽게 생각하자면, 재사용할 수 있는 단위라는 측면에서 `SMACSS Layout` + `SMACSS Module` = `BEM Block`이라고 생각할 수 있을 것 같습니다.

보통 `class selector`을 원칙으로 하며, 필요에 따라서는 자식 선택자를 이용한 스타일 지정도 허용합니다.

```html
<body>
  <div class="l-sidebar">
		<h1 class="m-sidebar-header">Slider</h1>
	</div>
</body>
```

```css
// Bad
h1 {
	color: red;
}

// Good1
.l-sidebar > h1 {
  color: red;
}

// Good2
.m-sidebar-header {
	color: red;
}
```

## State

상태에 대한 스타일을 설정해주는 요소입니다. 이는 특정 컴포넌트에서만 허용되는 상태 스타일 변화인지, 전역 상태에서 허용되는 상태인지에 따라 `prefix`를 다르게 할 것을 권장하고 있습니다.

예컨대 위 코드에서 선언한 `Sidebar` 에서만 닫힐 때의 상태값을 규정하고 싶다면, 다음과 같이 접두사를 붙일 수 있습니다.

```html
<body>
  <div class="l-sidebar sidebar-closed">
		<h1 class="m-sidebar-header">Slider</h1>
	</div>
</body>
```

```css
.sidebar-closed {
  transform: translateX(-400px);
}
```

한편, 모든 `hover` 상태에서 `font-weight`만 수정한다고 가정할 때에는 다음과 같이 전역에서의 스타일 상태를 정의할 접두사를 붙일 것을 권장합니다.

```css
.is-hover {
  font-weight: 700;
}
```

이때, `Pseudo-class`를 사용할 수도 있겠지만, 조나단 스눅의 의견에 따르면 이는 오히려 모듈이 하위 분류될 때 추가로 설계해야 될 상태들이 늘어나므로 복잡성이 늘어난다고 주장합니다. 

```css
.is-pressed:hover {
  font-weight: 700;
}

.btn-default:hover {
	font-weight: 500; // 기본 버튼의 `hover`시 default.
}
```

## theme

테마는 사이트마다의 고유 색상, 이미지를 정의하는 타입입니다. 다만 프로젝트에서 자주 사용되지 않기에, 때로는 핵심 유형에서 제외되기도 합니다.

예컨대 버튼이 있다면, 현재 사이트의 공통된 버튼 테마는 보라색이라고 가정합니다.

```css
// modules.css
.button {
	padding: 0.5rem 2rem;
	border: none;
} 

// theme.css
.button {
	background-color: purple;
	color: white;
}
```

마치 `OOCSS` 에서 외형을 분리하는 것과 비슷합니다. 해당 테마를 분리함으로써 개발자는 추후 사이트의 거대한 스타일 컨셉 및 테마만 바뀌었을 때 유지보수가 매우 용이해질 수 있습니다.
# 참고자료

[http://smacss.com/book/](http://smacss.com/book/)
