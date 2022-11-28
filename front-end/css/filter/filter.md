입력된 이미지의 모습을 변환하는 그래픽 효과를 지정해줄 수 있다!

## blur

이미지를 흐리게 만들어준다!

```html
<style>
  .container {
    filter: blur(10px);
  }
  .container .item {
    width: 8rem;
    height: 8rem;
    background-image: linear-gradient(orange, royalblue);
  }
  .container img {
    width: 15rem;
  }
</style>
<div class="container">
  <div class="item"></div>
  <img src="https://media.prod.mdn.mozit.cloud/attachments/2020/07/29/17350/3b4892b7e820122ac6dd7678891d4507/firefox.png" alt="파이어폭스">
</div>
```

## grayscale

이미지를 무채색(흑백)으로 변환시켜준다.

```css
.container {
  filter: grayscale(40%);
}
```

또는 동시에 여러 개를 적용할 수 있다. 

**이는 띄어쓰기로 구분한다.**

```css
.container {
  filter: blur(10px) grayscale(100%);
}
```

## invert()

색상을 반전시켜주는 효과를 부여해주고 싶다면, `invert`를 쓸 수 있다.

```css
.container {
  filter: blur(10px) grayscale(0%) invert();
}
```

## drop-shadow()

마치 `box-shadow`처럼 이미지에도 그림자를 적용시킬 수 있다.

```css
.container {
  filter: drop-shadow(10px 20px 10px red);
}
```


단,

- **요소의 배경 색상이나**
- **요소의 배경 이미지가 없는 경우에만**

유효하게 적용된다!

```css
.container {
  filter: drop-shadow(10px 20px);
  background-color: yellowgreen;
}
```


## brightness

기본값은 1이며, 명도를 지정해줄 수 있다.

```css
.container {
  filter: brightness(0.6);
  background-color: yellowgreen;
}
```


## contrast()

기본값은 100%이며, 색깔 대비를 조정해줄 수 있다.

```css
.container {
  filter: contrast(20%);
  background-color: yellowgreen;
}
```


## opacity()

기본값은 100%이며, 투명도를 지정해준다.

```css
.container {
  filter: opacity(20%);
}
```


## securate()

기본값은 100%이며, 채도를 조절한다.

```css
.container {
  filter: saturate(300%);
}
```


## sepia()

기본값이 0%이며, 세피아 톤을 적용시킨다.

```css
.container {
  filter: sepia(60%);
}
```


## hue-rotate

각도에 따라 다양한 색상으로 변화시킬 수 있다.

```css
.container {
  filter: hue-rotate(150deg);
}
```

![색상표](https://res.cloudinary.com/practicaldev/image/fetch/s--R1PzpHkU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/w0up5wjzx1c2txnuu69f.png)


## backdrop-filter

인덱스 뒤에 위치한 이미지에 대한 변환을 지정해줄 수 있다.

```css
<style>
    .container {
      filter: hue-rotate(150deg);
    }
    .container .item {
      width: 8rem;
      height: 8rem;
      background-image: linear-gradient(orange, royalblue);
    }
    .container img {
      width: 15rem;
    }
    .cover {
      position: fixed;
      width: 10rem;
      height: 15rem;
      border: 4px solid;
      top: 2rem;
      left: 2rem;
      backdrop-filter: blur(10px);
    }
  </style>
  <div class="container">
    <div class="item"></div>
    <img src="https://media.prod.mdn.mozit.cloud/attachments/2020/07/29/17350/3b4892b7e820122ac6dd7678891d4507/firefox.png" alt="파이어폭스">
  </div>
  <div class="cover"></div>
```
