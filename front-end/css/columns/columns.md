# columns

쉽게 말해서, `CSS`로 다단을 만들어주는 거다!

## columns-count

다단의 개수를 정해준다.

```html
<div class="container">
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  </div>
  <style>
    .container {
      border: 4px solid;
      column-count: 3;
    }
  </style>
```


## columns-width

`columns-width`가 명시되어 있다면, ~~브라우저가 멋대로 판단해서(...) 너비에 맞는 다단의 개수를 정해준다.~~

```html
<div class="container">
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  </div>
  <style>
    .container {
      border: 4px solid;
      column-count: 3;
      column-width: 500px;
    }
  </style>
```

## column-rule

`column-rule-width` `column-rule-style` `column-rule-color`를 축약한 형태.

단과 단 사이의 선을 넣어줄 수도 있다.

색깔이 명시되어 있지 않다면, 글자 색깔을 상속 받는다.

```html
...
column-rule: 4px solid;
```

## columns

`columns-width`와 `columns-count`의 축약 형태

```html
columns: 300px 3;
```

## column-gap

단과 단 사이의 거리를 지정한다.

`gap`이라는 속성을 사용한 것과 동일하다.

```html
<style>
    .container {
      border: 4px solid;
      columns: 50px 3;
      column-rule: 4px solid;
      column-gap: 200px;
    }
</style>
```