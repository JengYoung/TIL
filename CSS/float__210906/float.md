# Float이란 ?!

예전에는 수평 정렬을 위해 많이 사용되었지만 현재는 `flex`에 밀린 상황.

하지만 회사에 가면 여전히 쓰는 분들이 있으니, 우리도 공부를 하자!

```html
<div class="container">
  <div class="item float">1</div>
  <div class="item float">2</div>
  <div class="item float">3</div>
</div>
```

```css
.container {
  border: 4px solid;

  .item {
    width: 100px;
    height: 100px;
    background-color: royalblue;
    border-radius: 10px;
    font-size: 40px;
    margin: 10px;
  }

  .float {
    float: left;
  }
}
```

`container`가 정상적으로 감싸지 않는 현상 발생.

이를 해결하기 위해서는 `float`을 더이상 사용하지 않겠다는 해제 옵션을 해줘야 함.

```html
<div class="container">
  <div class="item float">1</div>
  <div class="item float">2</div>
  <div class="item float">3</div>
  <div class="item">4</div>
</div>
```

```html
&:nth-child(4) { clear: left; // float과 똑같이 작성 }
```

### 문제

지금은 사용하지도 않을 요소를 구조적으로 사용해주면서 `clear`해야 함.

## 해결방안

`container`에 `overflow: hidden`을 해줌.

```css
.container {
  border: 4px solid;
  overflow: hidden;
}
```

### 문제

이는 전혀 관련 없는 속성으로 해결한다는 점에서, 만약 overflow가 필요하지 않은 컨테이너라면 문제가 발생할 수 있다.

## 해결방안2 - `clearfix` class를 만들어주자!

`container`의 가상요소를 만들어줘서, 그 곳에다가 `clear`을 시켜준다!

```css
&.clearfix:after {
  content: "";
  display: block;
  clear: both; // left,right 둘 다 해제
}
```

# 주의할 점

## float은 공중에 "떠 있는" 형태이다.

만약 `float`을 시키려면, 모든 엘리먼트가 다 `float` 속성을 지정시켜주어야 한다.

다음은 4라는 `textContent`를 가진 엘리먼트의 경우, `float`이 없으면 이렇게 변한다.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d33e3926-0401-47c0-9a2b-5313d087c85c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T062601Z&X-Amz-Expires=86400&X-Amz-Signature=1b1dd7c24004435cca5e76b9954ad1b455fd542defd92847298a450bd25c8210&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

```css
.item {
  width: 100px;
  height: 100px;
  background-color: royalblue;
  border-radius: 10px;
  font-size: 40px;
  margin: 10px;
  &:nth-child(4) {
    // clear: left; // float과 똑같이 작성
    width: 150px;
    height: 150px;
    background-color: orange;
  }
}
```

```html
<div class="container clearfix">
  <div class="item float">1</div>
  <div class="item float">2</div>
  <div class="item float">3</div>
  <div class="item">4</div>
</div>
```

**따라서 수평정렬할 때는 수평정렬할 각각의 아이템들과 그렇지 않을 아이템들에 대해서 합쳐서 형제요소로 만들면 안 된다!**

## 해결방안 - `clearfix` container를 따로 또 만들어주자.

```html
<div class="container">
  <div class="clearfix">
    <div class="item float">1</div>
    <div class="item float">2</div>
    <div class="item float">3</div>
  </div>
  <div class="item">4</div>
</div>
```

```css
.container {
  border: 4px solid;

  .item {
    width: 100px;
    height: 100px;
    background-color: royalblue;
    border-radius: 10px;
    font-size: 40px;
    margin: 10px;
    &:nth-child(4) {
      // clear: left; // float과 똑같이 작성
      width: 150px;
      height: 150px;
      background-color: orange;
    }
  }

  .float {
    float: left;
  }

  .clearfix::after {
    content: "";
    display: block;
    clear: both; // left,right 둘 다 해제
  }
}
```

`.container>.item{$}*3`

```html
<div class="container">
  <div class="clearfix">
    <div class="item float--left">1</div>
    <div class="item float--left">2</div>
    <div class="item float--right">3</div>
    <div class="item float--right">4</div>
  </div>
</div>
```

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.float--left {
  float: left;
}

.float--right {
  float: right;
}

.container {
  float: right;
}

.conatiner .item {
  width: 100px;
  height: 100px;
  background: royalblue;
  font-size: 40px;
}
```

다시 `container`가 쪼그라 들었으니, `clearfix`를 해준다.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dceb341b-f8f9-4475-b13c-dd0bcf775445/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T062620Z&X-Amz-Expires=86400&X-Amz-Signature=be35ad7940fe8509913fce3fc7adff9e7ee8702aec72f43f01398cb3be46fbe2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

`float`은 여기서 또 특이한 점을 알 수 있는데, 순서대로 쌓인다. 따라서 이 역시 3-4로 순서대로 쌓게 하려면, 다음처럼 `float`을 layer의 형태로 한 겹 더 쌓아준다.

```html
<div class="container clearfix">
  <div class="item float--left">1</div>
  <div class="item float--left">2</div>
  <div class="float--right">
    <div class="item float--left">3</div>
    <div class="item float--left">4</div>
  </div>
</div>
```

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d78f3766-4b49-48ab-a743-fff05677ec9f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210906%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210906T062719Z&X-Amz-Expires=86400&X-Amz-Signature=607cf6046cdf6a1e8a18699da3b3c8c2b3f5e7c1206efc7d709d666a9b8b43ba&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

# 주의사항

`float`의 경우 기본 `display` 속성이 `block`으로 강제 변환시켜준다.

여기서 예외가 있으니...

**flex의 경우는 `display`가 여전히 `flex`로 유지된다! (`inline-flex` 도)**
