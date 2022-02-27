
# SMACSS란?

SMACSS는 Scalable and Modular Architecture for CSS의 줄임말이며, OOCSS 및 기타 에서 영감을 받아 탄생한 프레임워크가 아닌 스타일 가이드입니다.

## 기본 원칙

다음 5가지를 중점으로 CSS style을 분리하여 적용함으로써 재사용성을 용이하게 하기 위한 목적으로 사용합니다. 또한, 해당 스타일 가이드의 권위자인 `Jonathan Snook`의 경우, 다음 5가지 분류를 좀 더 명확하기 위해, `l-` `s-` 등 앞글자를 딴 `prefix`를 권장합니다.

### Base

모든 스타일에 있어서 가장 기본이 되는 뼈대에 대한 스타일입니다. 이는 클래스 및 아이디 선택자에 관해서는 해당하지 않으며, 태그에 관한 초기 스타일을 의미합니다.

대표적으로 `reset.css`와 같은 초기 CSS 설정 역시 `Base`에 해당합니다.

```css
// 다음과 같은 초기 기본 스타일 설정을 `Base`라고 명명합니다.
body {
  padding: 0;
  margin: 0;
}

h1 {
  padding: 0;
  margin: 0;
}
```

### Layout

때로는 특정 컴포넌트가 페이지의 주요 구성 요소로 배치되어 반복적으로 사용되기도 합니다. 이러한 것들을 레이아웃이라고 부릅니다.

이러한 레이아웃을 컴포넌트와 혼용한다면, 실제로 페이지를 이루는 모든 것은 ‘컴포넌트’라는 이름으로 명명되므로, 어떤 것이 주요 배치 요소인지 모호해지는 문제점이 발생합니다.

따라서 다음과 같이 레이아웃을 구분하여 해당 스타일을 작업한다면, 차후 관련된 스타일들을 빠르게 수정할 수 있어 유지보수성을 높일 수 있습니다.

```jsx
<body>
  <div class="m-toggle-button">Toggle</div>
  <div class="l-sidebar s-sidebar-opened"></div>
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

### Module

레이아웃이 아닌, 재사용한 스타일 단위를 모듈이라고 부릅니다. 대표적으로 사이드바 내에 있는 특정 섹션이나, 제품 리스트 등이 모듈이라고 할 수 있겠습니다. `CMACSS`에서 정의한 모듈 단위는 마치 BEM에서의 블록과 유사합니다. 

이때, 엘리멘트 선택자로 클래스를 원칙으로 하지만, 필요에 따라서는 자식 선택자를 이용한 스타일 지정도 가능하기에, 유연성이 높습니다.

```css
<body>
  <div class="m-toggle-button">Toggle</div>
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

### State

지금까지 `Layout` `Module`에 대해 살펴보았는데요. 이 둘이 어떤 재사용되는 스타일의 ‘기본 스타일’을 서술했다면, `State`는 조금 다릅니다. 이름 그대로 상태에 대한 스타일을 설정해주는 요소인데요. 만약 `prefix`로 설정할 때에는 `is-`를 붙이는 것이 대개의 관례입니다.

```css
.is-sidebar-closed {
  transform: translateX(-400px);
}
```

### Theme

마지막으로 테마의 경우 얼핏 보았을 때에는 상태 스타일과 유사합니다. 그러나 테마는 특정 상태에서의 변화를 의미하기보다는 좀 더 범용적인 관점에서 어떻게 외형이 보여야 하는지에 집중합니다. 따라서 `state`가 특정 상태에서의 변화를 집중적으로 다룬다면, `theme`은 일반적인 상황에서의 스타일 정의를 다룹니다. 따라서, 이를 통해 대개 특정 상황에서 스타일이 테마로 적용되도록 하는 방식으로 사용합니다.

다만, 이는 흔히 쓰이는 경우는 아니기에 일부 프로젝트에서는 핵심 유형에 포함되지 않기도 합니다.

```css
.theme-dark {
	background-color: black;
  color: white;
}
```

## 장점

### 직관적인 5가지 패턴 분류

특정 목적에 따라 5가지를 빠르게 분류하고, 코드를 작성할 수 있는 점은 분명 큰 프로젝트를 빠르게 구성해야 할 때 코드품질을 높이면서, 생산성을 높이는 방안이 될 수 있습니다. 또한, 이후 CSS를 모듈화하여 분리하기 용이하며, 특정 상태 값에 대한 스타일 문제에 대해 빠르게 원인을 찾을 수 있다는 장점을 갖고 있습니다.

# 참고자료

[http://smacss.com/book/](http://smacss.com/book/)
