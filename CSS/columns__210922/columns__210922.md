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

![columns-count](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a3fe5ac6-1152-4d92-8d30-00b477c5a768/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T043850Z&X-Amz-Expires=86400&X-Amz-Signature=b82f0a1ce649cbbb60f81f5995455acac7ab9dbe5baf368f249fa08397be6b8d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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

![columns-width](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/46461f59-033f-4afc-a554-dbebe451bb38/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T043912Z&X-Amz-Expires=86400&X-Amz-Signature=b8317be6d17c31b02e27fdd5331ce9b3b03b82bb1e67884dc7ef7f21e6d23c70&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## column-rule

`column-rule-width` `column-rule-style` `column-rule-color`를 축약한 형태.

단과 단 사이의 선을 넣어줄 수도 있다.

색깔이 명시되어 있지 않다면, 글자 색깔을 상속 받는다.

```html
...
column-rule: 4px solid;
```

![column-rule](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ad7e172b-99ce-4d70-8d27-56c02def3905/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T043940Z&X-Amz-Expires=86400&X-Amz-Signature=8b74f6179108acaa1e1b3e68789cc2e1672e04071b285e9f35c4845f6baf7a86&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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

![column-gap](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d569e441-a975-4156-8392-a95690758e7f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210922%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210922T043924Z&X-Amz-Expires=86400&X-Amz-Signature=95e2e21b594ec14acab9d38f37cf21a5b89c4b575e7b96c712ac3d8587f8f77a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)