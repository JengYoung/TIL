# `flex`란?

크게 2가지로 나뉠 수 있다.

- `flex-container`, 즉 `flex`시켜줄 부모 요소와
- `flex-items`, `flex`되어질 자식 요소들이다!
- 굳이 수평, 수직적으로 정렬 효과를 나타내고 싶지 않다면, `flex`사용할 필요는 없다.

예컨대, 다음과 같이, 그저 위에서 아래로 보여주고 싶은 경우와 같다.

```html
<style>
  .container {
    border: 4px solid;
  }
  .container .item {
    width: 100px;
    height: 100px;
    background-color: orange;
    font-size: 40px;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

하지만 이때, `flex`를 준다면 자식들이 수평 정렬이 된다!

```html
<style>
  .container {
    display: flex;
    border: 4px solid;
  }
  .container .item {
    width: 100px;
    height: 100px;
    background-color: orange;
    font-size: 40px;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

굳이 왜 나눠?!

**이는 `flex`에는 다양한 옵션이 있는데 `container`에 주는 속성들이 있고, `items`에 주는 속성이 있기 때문이다.**

## `inline-flex`

간단하다. `inline`의 형태를 띄면서, `flex`의 특성을 지니고 싶을 때 사용한다!

`inline` 효과 처럼 width와 height가 최대로 줄어든다!

```css
.container {
  display: inline-flex;
  border: 4px solid;
}
```

## `flex-direction`

`**flex`의 방향을 설정해준다!\*\*

`default: row;`

`row-reverse`: 행 순서를 거꾸로!

`column-reverse`: 열의 쌓이는 순서를 거꾸로!

## 주축 - 교차 축

`flex-direction`에서 설정된 값은 주축과 교차축을 설정해준다!

- row일 경우: 주 축 - row / 교차 축 - column
- column일 경우: 주 축 - column / 교차 축 - row

### 주축 (main axis)

시작과 끝의 순서를 지정해주는 축

### 교차 축(cross-axis)

주 축의 반대 축

## flex-wrap

아이템들이 줄바꿈이 될 수 있는지를 설정!

- `nowrap` 무언가를 감싸지 않는다! = 줄바꿈 처리를 하지 않는다(default)
- `wrap` 줄바꿈 처리를 해준다!

## flex-shrink

기본적으로 `flex`는 `nowrap`일 경우, 꽉차면 너비들을 일정 비율만큼 줄이도록 설정되어 있다.

따라서 이를 원치 않는다면 `flex`의 `item`이 되는 요소들에 `flex-shrink: 0;`으로 설정해주면 된다!

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
<style>
  .container {
    width: 400px;
    border: 4px solid;
    display: flex;
    flex-wrap: nowrap;
  }

  .container .item {
    width: 100px;
    height: 100px;
    background-color: orange;
    font-size: 40px;
    flex-shrink: 0;
  }
</style>
```


## `justify-content`

주 축에 설정해줄 정렬 방법


```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
<style>
  .container {
    border: 4px solid;
    display: flex;
    /* justify-content: flex-start; */
    /* justify-content: flex-end; */
    /* justify-content: center; */
    /* justify-content: space-between; */ // 첫 요소와 끝 요소를 각각 끝에 배치, 여백을 동일하게
    /* justify-content: space-around; */ // 요소를 기준으로 좌우 여백을 동일하게
    justify-content: space-evenly; // 모든 공백 간격을 동일하게
  }
  .container .item {
    width: 100px;
    height: 100px;
    background-color: orange;
    font-size: 40px;
  }
</style>
```

## `align-items`

교차축의 정렬 방법을 선택해주는데, 특이한 건 기본 값이 `stretch`다.

이는, 만약 `item`의 너비가 명시되어 있지 않다면 끝까지 늘어나며 채운다는 얘기다.

```html
<style>
  .container {
    display: flex;
    align-items: stretch;
    height: 400px;
    border: 4px solid;
  }
  .container .item {
    width: 100px;
    background-color: orange;
    font-size: 40px;
  }
</style>
```


### `baseline`

또 특이한 게, `baseline`이라는 값도 있다.  
이는 문자의 기준선에 맞춰 아이템을 정렬하겠다!는 의미이다.


## `align-content`

일단 다음 예시를 보자. **현재 1과 4간에 공백이 존재한다.**

```css
<style>
  .container {
    display: flex;
    width: 350px;
    height: 350px;
    border: 4px solid;
    flex-wrap: wrap;
  }
  .container .item {
    width: 100px;
    height: 100px;
    background-color: orange;
    font-size: 40px;
  }
</style>
```

그 이유는, `align-content`라는 `flex`의 옵션이 `stretch`로 기본 값이 설정되어 있기 때문이다.  
이는 `wrap`일 때, 나머지 여백에 대해 어떻게 `wrap`된 것을 정렬할 건지를 선택해주는 것이다. 따라서 이를 `flex-start`로 바꿔줘보자.  
참고로 이는 `align`이라는 단어를 볼 때, 교차 축에 적용되는 옵션임을 알 수 있다!

## flex-grow

`flex-item`에 적용할 수 있는 옵션이며, 여백에 대한 증가 비율을 설정해준다.

```css
.container {
  border: 4px solid;
  display: flex;
}

.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
  flex-grow: 1;
}
```

**이는 아이템 개별적으로 비율 설정도 가능하다.**

```css
.container .item:nth-child(2) {
  flex-grow: 2;
}
```


이때 의아한 것은, 이 너비 비율이 항상 지정한 만큼 되지 않는다. 그 이유는 일단 **명시된 너비를 포함한 상태에서, 나머지 여백들에 대해 증가비율을 설정하는 것이기 때문이다.**

따라서 아예 비율을 설정한 대로 맞추고 싶다면, 주 축의 너비를 명시하지 않으면 된다.

```css
<style>
	.container {
	  border: 4px solid;
	  display: flex;
	}

	.container .item {
	  height: 100px;
	  background-color: orange;
	  font-size: 40px;
	  border: 2px solid;
	  flex-grow: 1;
	}
	.container .item:nth-child(2) {
	  flex-grow: 2;
	}
</style>
```

이를 응용해보자.

한 아이템만 만약 grow가 설정되었다면, 그 아이템만 쭉~ 너비 이상으로 늘어나게 되면서 여백을 채워버린다!

**그 반대의 경우 `flex-shrink`가 있다!**

```css
.container {
  border: 4px solid;
  display: flex;
}

.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
}
.container .item:nth-child(2) {
  flex-grow: 2;
}
```


## `flex-basis`

`item`의 설정된 너비 값을 무시하고 따로 기본 너비를 설정해준다!

`auto`일 경우, 설정된 너비 값을 사용한다! (default)

```css
.container {
  border: 4px solid;
  display: flex;
}

.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
  flex-basis: 200px;
  flex-grow: 1;
}
.container .item:nth-child(2) {
  flex-grow: 2;
}
```

```css
.container {
  border: 4px solid;
  display: flex;
}

.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
  flex-basis: 0;
  flex-grow: 1;
}
.container .item:nth-child(2) {
  flex-grow: 2;
}
```


## `flex`

- `flex-grow`
- `flex-shrink`
- `flex-basis`

를 한 번에 지정이 가능하다!  
역시 각각의 기본값인 `flex: 0 1 auto`가 기본값이다.

### 주의할 점

`flex`의 경우, `flex: 1;`을 설정하면 `flex: 1 1 auto;` 가 아닌 `flex: 1 1 0;`이 설정된다!

```css
.container {
  border: 4px solid;
  display: flex;
}

.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
  flex: 1;
}
.container .item:nth-child(2) {
  flex-grow: 2;
}
```


육안으로 봐도 1: 2: 1이다. 이때, `width: 100px;`은 무시되었다.

```css
.container {
  border: 4px solid;
  display: flex;
}

.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
  flex: 1 1 auto;
}
.container .item:nth-child(2) {
  flex-grow: 2;
}
```


## `order`

`flex-item`의 순서를 지정해준다!  
음수 값도 사용할 수 있으며, 기본 값은 0이다!

## `align-self`

`flex-item` 중 하나만 따로 개별적으로 지정하고 싶을 때 유용.  
이때 기본값은 `auto`이며 (`align-items`를 상속받음) 지정 시 하나만 적용된다!

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <!-- <div class="item">4</div> -->
</div>
```

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 350px;
  height: 300px;
  border: 4px solid;
}

.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
}
.container .item:nth-child(1) {
  /* align-self: auto; align-items를 상속받는 개념 */
  align-self: flex-start;
}
```

## `gap`

`container`에서 설정해주는 속성이며 `flex-item`여백을 설정해준다!  
**아직 브라우저 지원이 잘 안 되어있는 속성이기도 하다! 하위호환성에 있어 리스크!**

```css
.container {
  border: 4px solid;
  display: flex;
  gap: 10px;
}
.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
}
```


이는 다음과 같은 방법으로도 해결이 가능하다.

```css
.container {
  border: 4px solid;
  display: inline-flex;
}
.container .item {
  width: 100px;
  height: 100px;
  background-color: orange;
  font-size: 40px;
  border: 2px solid;
}
.container .item:not(:last-child) {
  margin-right: 10px;
}
```
