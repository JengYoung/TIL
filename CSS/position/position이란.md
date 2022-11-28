# position

## absolute

absolute의 경우, `absolute`의 범위를 설정해줘야 하는데, 이는 `position`이 설정된 가장 가까운 부모 요소이다!

```html
<body>
  <div class="parent">
    <div class="child"></div>
  </div>
</body>
```

```css
.parent {
  width: 250px;
  height: 150px;
  background-color: orange;
  position: relative;
}

.child {
  width: 100px;
  height: 100px;
  background-color: royalblue;
  position: absolute;
  right: 0;
  bottom: 0;
}
   ```


```html
<body>
  <div class="parent3">
    <div class="parent2">
      <div class="parent1">
        <div class="child"></div>
      </div>
    </div>
  </div>
</body>
```

```css
.parent3 {
  width: 350px;
  height: 250px;
  background-color: tomato;
}
.parent2 {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  position: relative;
}

.parent1 {
  width: 250px;
  height: 150px;
  background-color: orange;
}

.child {
  width: 100px;
  height: 100px;
  background-color: royalblue;
  position: absolute;
  right: 0;
  bottom: 0;
}
```


## fixed

조상요소 중 `transform` `filter` `perspective` 등의 속성이 지정되어 있다면, `fixed`로 설정된 요소에 영향을 끼칠 수 있다!

```css
.parent3 {
  width: 350px;
  height: 250px;
  background-color: tomato;
}
.parent2 {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  transform: scale(1); // 여기를 transform시켜보자!
}

.parent1 {
  width: 250px;
  height: 150px;
  background-color: orange;
  position: relative;
}

.child {
  width: 100px;
  height: 100px;
  background-color: royalblue;
  position: fixed;
  right: 0;
  bottom: 0;
}
```


여기서 또 신기한 건, 이러한 3가지 예외적인 속성이 여러 조상 요소에 있을 경우, 가장 상위의 요소에 `fixed`가 배치된다! 이는 여러 속성이 중첩이 되어 있어도, 예외 없이 동일하다.

```css
.parent3 {
  width: 350px;
  height: 250px;
  background-color: tomato;
  transform: scale(1);
  perspective: 300px;
}

.parent2 {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  transform: rotateX(45deg);
}

.parent1 {
  width: 250px;
  height: 150px;
  background-color: orange;
  position: relative;
  transform: scale(1);
}

.child {
  width: 100px;
  height: 100px;
  background-color: royalblue;
  position: fixed;
  right: 0;
  bottom: 0;
}
```


## Stacking Context

`z-index`를 쓰지 않더라도, `transform`, `opacity`를 통해 요소를 더 위에 쌓을 수 있다.

`z-index`를 쓴다면, 다음 중 하나를 만족해야 한다.

- `position: relative;`
- `position: absolute;`
- `position: fixed;`
- `position: sticky;`

```html
<div class="item">1</div>
<div class="item">2</div>
<div class="item">3</div>
```

```css
.item {
  width: 100px;
  height: 100px;
  font-size: 40px;
}
.item:nth-child(1) {
  background-color: royalblue;
}
.item:nth-child(2) {
  background-color: orange;
  transform: scale(1.5);
}
.item:nth-child(3) {
  background-color: tomato;
  opacity: 0.5;
}
```

# display 속성 변환

`position`의 일부 값은 `display` 속성을 강제 변환시킨다.

```html
<div class="item">Hello</div>
```

```css
.item {
  width: 200px;
  height: 150px;
  background-color: orange;
  display: inline;
  position: relative;
}
```


`**position`의 경우, `absolute`와 `fixed`가 `display: block;`으로 강제 변환된다!\*\*

```css
.item {
  width: 200px;
  height: 150px;
  background-color: orange;
  display: inline;
  // position: relative;
  // position: fixed;
  position: absolute;
}
```
