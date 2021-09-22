# transform3D?!

## rotate

자신의 정가운데를 기준으로 회전시킨다.

```html
<style>
    .container {
      width: 10rem;
      height: 10rem;
      border: 4px solid;
      margin: 100px;
    }
    .container .item {
      width: 10rem;
      height: 10rem;
      background-color: orange;
    }
    .container .item:hover {
      transform: rotate(45deg);
    }
  </style>
  <div class="container">
    <div class="item"></div>
  </div>
```

![rotate](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6c9ab520-516a-4b31-a8fe-1616e03ebb80/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040312Z&X-Amz-Expires=86400&X-Amz-Signature=76440bec04c0d938b8f9c28b7bb2564a9e26ecf97a0bf3a0944012b0db9d8f12&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## transform-origin

변화를 시키는 기준 위치를 변경한다.

첫 번째 인자는 x축, 두 번째 인자는 y축을 의미한다.

```html
<style>
    ...
      transition-duration: 1s;
      transform-origin: 100% 100%;
    }
		...
</style>

```

![transform-origin](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/74c8ba66-02a4-4c90-a444-06c121a394f8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040332Z&X-Amz-Expires=86400&X-Amz-Signature=05db0bbbfb13b67955d7b6dedc9eb2e9229c9393bd56ccc60097f57b6306371a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

```html
<style>
    .container {
      width: 10rem;
      height: 10rem;
      border: 4px solid;
      margin: 100px;
    }
    .container .item {
      width: 10rem;
      height: 10rem;
      background-color: orange;
      transition-duration: 1s;
    }
    .container .item:hover {
      transform: perspective(300px) rotateY(180deg);
    }
  </style>
  <div class="container">
    <div class="item"></div>
  </div>
```

## perspective

원근법을 주는 것이다.

이때, 주의할 게 있다. `transform`이 3차원 변화일 때만 적용 가능하다.

또한 함수가 아닌 속성으로 하는 경우 변화를 일으키고자 하는 아이템에 대한 상위 요소에다 지정하는 것이다.

또한, 이 원근법 적용 기준 역시 `perpective-origin`을 통해 바꿀 수 있다.

```html
<style>
    .container {
      width: 10rem;
      height: 10rem;
      border: 4px solid;
      margin: 100px;
      perspective: 300px;
      perspective-origin: 0 50%;
    }
    .container .item {
      width: 10rem;
      height: 10rem;
      background-color: orange;
      transition-duration: 1s;
    }
    .container .item:hover {
      transform: rotateY(45deg);
    }
  </style>
  <div class="container">
    <div class="item"></div>
  </div>
```

![perspective](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5f07867b-24ea-49e1-8e4b-54bc3ba201a7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040353Z&X-Amz-Expires=86400&X-Amz-Signature=7b6180cb6d07ff6b0313a3e69cbabda2a0ccd2cb77457a4fa07b53f3d0bb9c49&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## transform-style

자식 요소에는 3D가 적용되지 않는다. 이때, `transform-style`을 적용하면, 자식 요소에도 3D 효과를 적용할 수 있다.

 

![transform-style](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7db6d636-d724-4803-a3fc-a56378895df4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040415Z&X-Amz-Expires=86400&X-Amz-Signature=54324b2f35fce1f25107c37f02f2edc90cb33a228dbc1e7b2a086062eda52ed3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

```html
<style>
    .container {
      width: 10rem;
      height: 10rem;
      border: 4px solid;
      margin: 100px;
      perspective: 300px;
      perspective-origin: 0% 50%;
    }
    .container .item {
      width: 10rem;
      height: 10rem;
      background-color: orange;
      transition-duration: 1s;
      transform-style: preserve-3d;
    }
    .container .item:hover {
      transform: rotateY(45deg);
    }
    .container .item .box {
      width: 100px;
      height: 100px;
      background-color: royalblue;
      transition-duration: 1s;
    }
    .container .item .box:hover {
      transform: rotateX(45deg);
    }
  </style>
  <div class="container">
    <div class="item">
      <div class="box"></div>
    </div>
  </div>
```

## backface-visibility

뒷면을 보이게 할지 말지를 설정한다.

```html
<style>
    .container {
      width: 10rem;
      height: 10rem;
      border: 4px solid;
      font-size: 5rem;
      margin: 100px;
      perspective: 300px;
      perspective-origin: 0% 50%;
    }
    .container .item {
      width: 10rem;
      height: 10rem;
      background-color: orange;
      transition-duration: 1s;
      transform-style: preserve-3d;
    }
    .container .item:hover {
      transform: rotateY(180deg);
    }
    .container .item .box {
      width: 100px;
      height: 100px;
      background-color: royalblue;
      transition-duration: 1s;
    }
  </style>
  <div class="container">
    <div class="item">
      ABC
    </div>
  </div>
```

![backface-visibility](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2f3eb19b-aae3-4098-9727-227846a15b06/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040431Z&X-Amz-Expires=86400&X-Amz-Signature=9ee60d5113ddce283b3f969cf92fd83f5e4b950b8ac777b67448da476273bb52&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

뒷면이 이제 보이지 않는다.

## backface-visibility 응용

앞 뒷면을 `hover` 시에 바꿔주는 이벤트를 만들 수 있다!

```html
<style>
    .container {
      width: 10rem;
      height: 10rem;
      border: 4px solid;
      font-size: 5rem;
      margin: 100px;
      perspective: 300px;
      perspective-origin: 0% 50%;
    }
    .container .item {
      width: 10rem;
      height: 10rem;
      transition-duration: 1s;
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }
    .container .item:hover {
      transform: rotateY(180deg);
    }

    .container .item.front {
      background-color: orange;
    }
    .container:hover .item.front {
      transform: rotateY(180deg);
    }
    .container .item.back {
      position: absolute;
      top: 0;
      background-color: tomato;
      transform: rotateY(-180deg);
    }
    .container:hover .item.back {
      transform: rotateY(0);
    }
  </style>
  <div class="container">
    <div class="item front">
      앞면
    </div>
    <div class="item back">
      뒷면
    </div>
  </div>
```

![응용1](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/77ab7846-bc8d-480b-9e8d-af0c245f7378/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040454Z&X-Amz-Expires=86400&X-Amz-Signature=1b03b73dafa375306596fe80cb667da0744ca9921e10fe21951d90d613f3dc71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

![응용2](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/52f0da40-d769-4b4a-91c5-4a0029172dd5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040511Z&X-Amz-Expires=86400&X-Amz-Signature=9013fc017f0751a94a7b3339ae4629f573067d5b47a744c9fd2e430641ed253b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

![응용3](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bbe6ad6e-545a-4cba-9f3d-d112c2683746/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T040523Z&X-Amz-Expires=86400&X-Amz-Signature=4f38244590f38b21f9d05f0905d6ae85e94fc655db4ae49fd2bba8d5d9703379&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)