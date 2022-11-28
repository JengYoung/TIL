## grid-template-rows

`grid`의 행마다의 너비를 설정해준다.

## grid-template-columns

`grid`의 열마다의 너비를 설정해준다.

```html
<body>
  <style>
    .container {
      border: 4px solid;
      display: grid;
      grid-template-rows: 100px 100px;
      grid-template-columns: 200px 200px 200px;
    }
    .container .item {
      border: 2px solid;
      font-size: 30px;
    }
  </style>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
  </div>
</body>
```

이때 블록이 쌓이는 순서는, 좌에서 우로, 위에서 밑으로 진행된다!  
또한 부모 컨테이너 쪽에서 그리드를 사용하겠다!고 명시해주면 된다.

## `grid-row[column]: span [n];`

`grid`에서 특정 아이템에 관하여 `row`나 `column`을 늘리고 싶을 때, `span`이라는 값을 주면, n만큼의 길이를 갖도록 만들 수 있다.


## `inline-grid`

컨테이너의 `grid`의 block을 마치 `inline`처럼 하는 효과가 있다!

```html
<style>
  .container {
    border: 4px solid;
    display: inline-grid;
    grid-template-rows: 50px 50px;
    grid-template-columns: 120px 120px 120px;
  }
  .container .item {
    border: 2px solid;
    font-size: 2.5rem;
    background: orange;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
```

`inline`은 글씨처럼 하는 효과가 있으며, 그렇기 때문에 띄어쓰기가 반영이 된 채로 나온다!

## `1fr` (fraction)

`grid`에서 사용하는 단위. 비율을 맞춰주는 데 용이한 단위!

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: 50px 50px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .container .item {
    border: 2px solid;
    font-size: 2.5rem;
    background: orange;
  }
</style>
```


## `repeat(n, size)`

`grid`에서 사용 가능한 함수.  
n만큼의 개수에 맞춰 `size`에 맞는 `grid`를 만든다!

## `grid`역시 `block` 요소이다.

따라서 `height`가 `auto`라면 최대한 줄어들려 할 것이다.  
다음 예제에서 보이듯이, 4개의 행만 `grid`로 다룰 때 나머지 요소는 `font-size`에만 높이가 설정되어 있는 것을 볼 수 있다.

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 100px);
    grid-template-columns: repeat(2, 1fr);
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background: orange;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
</div>
```


## `grid-auto-rows`

이러한 문제를 해결하기 위해, `grid-auto-rows`속성을 사용할 수 있다.

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 100px);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 100px;
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background: orange;
  }
</style>
```

## `grid-column[row]`

명시적으로 특정 행/열의 line (맨 앞이 1부터 시작)에 특정 아이템을 집어 넣을 수 있다.  
이에 따라 자동으로 행, 열의 크기가 명시되며, 원치 않은 변화가 생길 수 있다.

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 100px);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 100px;
    grid-auto-columns: 100px;
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background: orange;
  }
  .container .item:nth-child(5) {
    grid-column: 4;
  }
</style>
```


만약 ~번째 열에서 ~번째 열까지를 나타내주고 싶다면? 다음과 같이 /로 구분해주면 된다.

```html
<style>
  .container {
    border: 4px solid black;
    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column;
    color: white;
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background-color: midnightblue;
  }
  .container .item:nth-child(1) {
    grid-column: 2 / span 2;
  }
  .container .item:nth-child(2) {
    grid-column: span 3;
  }
</style>
```

결론:   
`grid`는 명시적으로 행/열을 지정할 수 있지만, 그 외의 벗어나는 영역에 대해서는 암시적으로 만들 수도 있다. 또한 `grid-auto-...`로 암시적인 아이템들 역시 너비, 높이를 지정할 수 있다.

## `grid-auto-flow`

`(row는 생략 가능) dense`로 지정할 경우, 빈 공간에 대해서 최대한 줄여줄 수 있다.  
기본값은 `row`이며, 행으로 순서대로 쌓이게 해준다는 의미를 갖고 있다.

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 100px);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 100px;
    grid-auto-columns: 100px;
    grid-auto-flow: dense;
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background: orange;
  }
  .container .item:nth-child(5) {
    grid-column: 4;
  }
</style>
```


다른 예시를 살펴보면, 다음 역시도 `grid-auto-flow`를 통해 빈 공간을 메워줄 수 있다!

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 1fr);
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background-color: midnightblue;
  }
  .container .item:nth-child(2) {
    grid-column: span 3;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```


```html
<style>
  .container {
    border: 4px solid black;
    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense;
    color: white;
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background-color: midnightblue;
  }
  .container .item:nth-child(2) {
    grid-column: span 3;
  }
</style>
```

그렇다면 `column`으로 설정하면 어떻게 될까?

이는 열로 순서대로 쌓임을 알 수 있다.

```html
<style>
  .container {
    border: 4px solid black;
    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column;
    color: white;
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background-color: midnightblue;
  }
  .container .item:nth-child(2) {
    grid-column: span 3;
  }
</style>
```

`grid-auto-flow`의 값으로 `column dense` 역시 사용 가능하다.

```html
<style>
  .container {
    border: 4px solid black;
    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column dense;
    color: white;
  }
  .container .item {
    border: 2px solid;
    font-size: 20px;
    background-color: midnightblue;
  }
  .container .item:nth-child(1) {
    grid-column: 2 / span 2;
  }
  .container .item:nth-child(2) {
    grid-column: span 3;
  }
</style>
```


## `grid contents`

우리는 하나의 그리드 안에 위치를 배치시킬 수도 있다! 이때 grid안에 있는 아이템들을 일정한 규칙 하에 한 데 모아져 있는 것을 `grid-contents`라 한다.

정렬 방법은 다음 속성을 지정하면 된다.

- `align-content` 열 정렬을 지정
- `justify-content` 행 정렬을 지정

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(3, 70px);
    grid-template-columns: repeat(3, 70px);
  }
  .container .item {
    background-color: orange;
    border: 2px solid;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div class="item">9</div>
</div>
```

```html
<style>
  .container {
    width: 500px;
    height: 500px;
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(3, 70px);
    grid-template-columns: repeat(3, 70px);
    justify-content: center;
    align-content: center;
  }
  .container .item {
    background-color: orange;
    border: 2px solid;
  }
</style>
```


기타 속성 값으로는

- `space-evenly`
- `space-around`
- `space-between`
- `start`
- `end`
- `center`
- `stretch`: 만약 너비나 길이가 정해져 있지 않으면 끝까지 쭉 늘어나려는 성질을 가지게 됨. (`normal` 속성과 동일)

## `justify-items` `align-items`

그리드로 나누어진 각 셀마다의 정렬 방법을 지정한다.  
이때, 어차피 셀에는 한 아이템만 있으므로 `space-` 값은 없다.

```html
<style>
  .container {
    width: 500px;
    height: 500px;
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
  .container .item {
    background-color: orange;
    border: 2px solid;
  }
</style>
```

## `grid-template-area`

그리드 템플릿을 일종의 변수를 만들어서 직접 만들 수도 있다!

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "header header header"
      "main main aside"
      ". . aside"
      "footer footer footer";
  }
  .container > * {
    border: 2px solid;
  }
  .container header {
    grid-area: header;
  }
  .container main {
    grid-area: main;
  }
  .container aside {
    grid-area: aside;
  }
  .container footer {
    grid-area: footer;
  }
</style>
<div class="container">
  <header>HEADER</header>
  <main>MAIN</main>
  <aside>ASIDE</aside>
  <footer>FOOTER</footer>
</div>
```


## `grid-gap`

각 셀 간의 간격을 설정할 수 있다. 이를 그리드에서는 `line` 혹은 `gutter`라고 부른다.

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "header header header"
      "main main aside"
      ". . aside"
      "footer footer footer";
    grid-gap: 10px;
  }
  .container > * {
    border: 2px solid;
  }
  .container header {
    grid-area: header;
  }
  .container main {
    grid-area: main;
  }
  .container aside {
    grid-area: aside;
  }
  .container footer {
    grid-area: footer;
  }
</style>
```

## grid의 line에 관하여

`line`의 경우 양수의 값으로도, 음수의 값으로도 가질 수 있다!  
앞에서 시작할 경우 1부터 시작하고, 뒤에서 시작할 경우, -1부터 시작한다!

## `grid-row[column]-start`

몇 번째 행에서 시작할 지를 명시해준다.  
`span` 값을 사용할 수 있으며, 이는 현재로부터 몇까지 확장하게 해라!라는 의미이다.

```html
<style>
  .container {
    width: 300px;
    height: 300px;
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
  .container .item {
    border: 2px solid;
    background-color: skyblue;
    font-size: 20px;
  }
  .container .item:nth-child(1) {
    grid-row-start: 2;
  }
</style>
```


## `grid-row[column]-end`

어디서 끝날지를 지정해줄 수 있다

```html
.container .item:nth-child(1) { grid-row-start: 2; grid-row-end: 4; }
```


## `grid-row[column]`

`grid-row[column]-start`와 `grid-row[column]-end`를 한 번에 지정할 수 있다.

구분자는 '/' 이다!

```html
<style>
  .container {
    width: 300px;
    height: 300px;
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
  .container .item {
    border: 2px solid;
    background-color: skyblue;
    font-size: 20px;
  }
  .container .item:nth-child(1) {
    grid-row: 1 / 3;
    grid-column: 1 / 3;
  }
</style>
```


## `justify[align]-self`

행/열의 아이템들을 각각 셀 안에서 정렬시킬 수 있다!

```html
<style>
  .container {
    width: 400px;
    height: 400px;
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
  .container .item {
    width: 100px;
    height: 100px;
    border: 2px solid black;
    background-color: royalblue;
    color: white;
  }
  .container .item:nth-child(1) {
    justify-self: center;
    align-self: start;
  }
  .container .item:nth-child(2) {
    width: auto;
    height: auto;
    justify-self: normal;
    align-self: normal;
  }
</style>
```


## `order`

순서를 지정할 수 있다. 기본은 0.

```html
<style>
  .container {
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
  .container .item {
    border: 2px solid;
    background-color: orange;
    font-size: 40px;
  }
  .container .item:nth-child(3) {
    order: -1;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
```


## `grid`의 쌓임 맥락

`**grid-row`와 `grid-column`이 명시되어야 겹칠 수 있다!  
이때 쌓이는 건 예전 → 최신 순서로 쌓인다.

**이때 만약 둘 다 겹친다면, `z-index`를 활용하여 쌓이는 순서를 정해줄 수 있다.**

```html
<style>
  .container {
    width: 400px;
    height: 250px;
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
  .container .item {
    border: 4px solid;
    font-size: 40px;
  }
  .container .item:nth-child(1) {
    background-color: tomato;
    grid-column: 1 / span 2;
  }
  .container .item:nth-child(2) {
    background-color: orange;
    grid-row: 1 / span 2;
    grid-column: 2;
  }
  .container .item:nth-child(3) {
    background-color: yellowgreen;
    grid-column: 2 / span 2;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```html
<style>
  .container {
    width: 400px;
    height: 250px;
    border: 4px solid;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
  .container .item {
    border: 4px solid;
    font-size: 40px;
  }
  .container .item:nth-child(1) {
    background-color: tomato;
    grid-row: 1;
    grid-column: 1 / span 2;
  }
  .container .item:nth-child(2) {
    background-color: orange;
    grid-row: 1 / span 2;
    grid-column: 2;
  }
  .container .item:nth-child(3) {
    background-color: yellowgreen;
    grid-column: 2 / span 2;
    grid-row: 2;
    z-index: -1;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```


## `minmax`
첫 번째 인자로 최솟값, 두 번째 인자로 최댓값을 적어준다.

```css
grid-template-columns: minmax(100px, 1fr) minmax(200px, 1fr);
```

만약 컨테이너가 더 작아질 경우, 아이템들이 넘쳐나는 현상을 볼 수 있다.  
`grid-auto-rows, grid-auto-columns`에 또 `minmax`를 지정해주면, 결과적으로 암시적 행의 넘쳐나는 부분에 대해서 자동으로 늘려줄 수 있다.

```css
grid-auto-rows: minmax(100px, auto);
```


## `fit-content`
최대한 너비를 맞춰주되, 너비의 한계치를 지정해줄 수도 있다.

```css
grid-template-columns: fit-content(300px) fit-content(300px);
```


## `min-content`
최소한의 `content` 길이에 맞춰 너비를 설정한다.  
특이한 것은, 한글의 경우 **글자 단위**로 인식하며, 영어의 경우 **인식할 수 있는 단어 단위**로 인식한다.



## `max-content`
최대한의 `content` 길이에 맞춰 너비를 설정한다.


## `word-break`
`min-content`를 보완.  


### `keep-all`
한글도 단어 단위로 줄바꿈 처리를 하도록 돕는다.


## `auto-fit` / `auto-fill`
`repeat` 함수와 같이 사용할 수 있다.

+ `auto-fit`: 지정할 수 있는 너비의 최대에 맞춰서 적용
+ `auto-fill`: 지정할 수 있는 너비의 최소에 맞춰서 적용
+ 
```css
grid-template-coilumns: repeat(auto-fit, minmax(100px, 1fr));