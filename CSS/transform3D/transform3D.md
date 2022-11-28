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
또한 함수가 아닌 속성으로 하는 경우 변화를 일으키고자 하는 아이템에 대한 상위 요소에다 지정하는 것이다. 또한, 이 원근법 적용 기준 역시 `perpective-origin`을 통해 바꿀 수 있다.

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


## transform-style

자식 요소에는 3D가 적용되지 않는다. 이때, `transform-style`을 적용하면, 자식 요소에도 3D 효과를 적용할 수 있다.


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
