# d3.selection.join()

어떻게 데이터의 변화를 보여줄 것인지를 정의한다.  
따라서 이는 셀렉션 객체에 대해 어떤 엘리먼트를 넣어주어 표현할지를 정의한다고 볼 수 있겠다.

가령 다음은 텍스트를 넣어 보여주는 예시이다.

```js
  svg.selectAll("text") // 모든 텍스트라는 객체에 대해
    .data(randomLetters()) // 임의의 랜덤 데이터를 바인딩해줄 것이다.
    .join("text") // 이때, 텍스트 엘리먼트로 데이터의 변화를 반영할 것이다.
      .attr("x", (d, i) => i * 16) // x 속성에는 인덱스마다 16픽셀씩의 간격을 줄 것이다.
      .text(d => d); // 텍스트를 그대로 필터링 없이 그려낸다.
```