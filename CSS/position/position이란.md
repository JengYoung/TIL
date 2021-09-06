# position은...

1. absolute의 경우, `absolute`의 범위를 설정해줘야 하는데, 이는 `position`이 설정된 가장 가까운 부모 요소이다!

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

   ![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b75514e2-ea47-46d7-b3f9-1c161f7d5305/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T073615Z&X-Amz-Expires=86400&X-Amz-Signature=eb1026546f7539ec55916ab98bdd4642f839eb57306fe928206b882a4426a3f2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d4394553-9012-468b-9095-2107fdf52e8d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T073629Z&X-Amz-Expires=86400&X-Amz-Signature=56347647256d442ec63c6f7a7f065f40c2331dbca387e27895b3baaaf6eed4f7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/950d4a11-beda-47d7-8b93-401f6307d9ad/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T073644Z&X-Amz-Expires=86400&X-Amz-Signature=c775a5c8770b3d7003e73e02920ccb0ce63f3285ea2b6f06b13d5b90d7066ce0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7a4c2c4f-591f-4290-b90a-ac9f4f8627f2/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T073700Z&X-Amz-Expires=86400&X-Amz-Signature=8fc7c084ac28d701e164b870c2a2bb77b5ddaf70461ba9a9b64d781e81b82406&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/874b0601-b951-4ade-87ce-bd3fcf652f1a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T073815Z&X-Amz-Expires=86400&X-Amz-Signature=c60131aedf742fd8f43b10927ecb41ca3a4c112a89b6ece9b98380053b3e1893&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/57119bca-a44d-4eb5-be8b-de4c11e1b3be/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T073827Z&X-Amz-Expires=86400&X-Amz-Signature=19eff7d7b7d0d01b18a99b40fe677086920c46c851133baf51fd5c763ef8dd25&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
