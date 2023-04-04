# D3 Selections

결국 쿼리 셀렉터의 역할을 하는 메서드.  
어떻게 `SVG elements`에 접근할지를 결정할 수 있다.

> D3가 문서요소를 선택하기 위해서는 `select`, `selectAll`. 딱 2가지만 제공한다.

## 사용법 

예컨대 다음과 같은 DOM 노드가 존재한다고 가정하자.

```html
<svg width="760" height="140">
  <g transform="translate(70, 70)">
    <circle/>
    <circle cx="120" />
    <circle cx="240" />
    <circle cx="360" />
    <circle cx="480" />
  </g>
</svg>
```

여기서 `circle`들을 찾으려면 어떻게 해야 할까? 이를 찾아낼 때, 다음과 같이 할 수 있다.

```js
d3.selectAll('circle')
```

### d3.select(selector)

인자로 지정한 셀렉터 문자열과 일치하는 첫번째 문서요소를 선택한다. 단일 문서요소를 선택해서 반환한다. 지정한 셀렉터 문자열과 일치하는 문서요소가 현재 문서에 없다면 빈 선택물을 반환한다. 셀렉터와 일치하는 문서요소가 여러개면 문서순서상 첫번째로 일치하는 문서요소를 선택한다.

### d3.select(node)

인자로 지정한 노드( node )를 선택한다. 이벤트 리스너에서 d3.select(this)같이 선택한 노드나 document.body같이 선택한 전역 노드에 대한 참조값을 이미 가지고 있을 때 유용하다.

### d3.selectAll(selector)

인자로 지정한 선택자( selector )와 일치하는 모든 문서요소를 선택한다. 문서요소는 문서상의 순서대로(위에서 아래로) 선택된다. 현재 문서에 선택자와 일치하는 문서요소가 없다면 빈 선택물을 반환한다.

### d3.selectAll(nodes)

인자로 지정한 문서요소의 배열을 선택한다. 이벤트 리스너에서 d3.selectAll(this.childNodes)같이 선택한 노드나 document.links같이 선택한 **전역 노드에 대한 참조값을 이미 가지고 있을 때** 유용하다. 인자 nodes 는 명확하게 배열은 아니다. **배열로 변경 가능한 유사배열이 동작**한다.(NodeList나 arguments)