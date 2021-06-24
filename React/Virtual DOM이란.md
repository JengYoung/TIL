## **2-1. `virtual DOM`이란?**

[React 공식 문서](https://ko.reactjs.org/docs/faq-internals.html#gatsby-focus-wrapper)를 살펴보자.

> Virtual DOM (VDOM)은 UI의 이상적인 또는 “가상”적인 표현을 메모리에 저장하고 ReactDOM과 같은 라이브러리에 의해 “실제” DOM과 동기화하는 프로그래밍 개념

이라고 `virtual DOM`을 명시함.

그렇다면 우리는 이 글을 봤을 때, 이런 의문이 들 수 있다.

> **왜 '가상'적인 표현을 메모리에 저장하는가?**

리액트가 DOM의 상태를 조작하기 보다는,

우리가 직접 `DOM`에다 변경된 부분을 바로 넣으면 되기 때문.

따라서 우리는 필요한 이유를 정확히 알아야 한다.

## **2-2.`Virtual DOM`이 필요해진 이유 - DOM**

- 동적으로 웹을 반영하려면, 사실상 DOM을 조작하면서 리플로우는 발생
- **매순간마다 DOM 조작으로 인해 각각 리플로우가 발생한다면, 성능저하의 원인**

`virtual DOM`은 이러한 배경에서 파생된 아이디어이다.

1. 진짜 DOM이 아니라, 이러한 DOM의 변화를 일차적으로 비교해주고,

2. 변경 사항을 전달해주는 객체

결과적으로 변화된 전체 결과물을 DOM과 비교하며 렌더링을 딱! 한 번 수행해줌으로써 브라우저에서 발생하는 연산을 줄여줌

---

## **2-3. `virtual DOM`의 동작 방식**

- 일반적으로 리액트에서는 `state`나 `props`의 변화가 발생한다면, `render()`를 통해 새로운 React 엘리먼트 트리를 반환
- `virtual DOM`이 비교를 통해 변화될 부분을 찾아내고 바꾸는 과정. **재조정**
- `virtual DOM`은 엄연히 객체. 정확히 말하면 DOM 같이 엘리먼트간 상하관계가 있는 **트리구조의 객체**인데, 이를 최소한의 연산으로 바꿀 때의 시간 복잡도는 O(n<sup>3</sup>)의 복잡도
- 이러한 트리구조의 객체를 최소한의 연산으로 바꾸는 알고리즘의 경우 O(n)의 복잡도

따라서 엘리먼트가 많을 수록, 성능은 엄~청 느려짐.
따라서, 리액트는 다음과 같은 꼼수(?)를 통해 복잡도를 O(n)까지 줄이는 데 성공

### **2-3-1. 핵심 아이디어**

리액트는 2가지 핵심 아이디어를 통해 휴리스틱을 구현

1. **서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.**
2. **개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.**

> **2-3-1-a. 만약 루트가 다른 타입의 엘리먼트인 경우**

```
//Before
<div>
  <Counter />
</div>

//After
<span>
  <Counter />
</span>

```

1. 비교 후 엘리먼트가 달라짐을 확인하면 아예 `Before`을 `After`과 아예 다른 트리다!라고 생각하고 버림
2. 이전 `DOM Node`는 없어지는 절차를 밟게 됨.

**만약 컴포넌트라면**

1. 먼저 `componentWillUnmount()`를 통해 언마운트
2. 이후 새로운 노드를 `componentDidMount()`

> **2-3-1-b. 만약 루트 엘리먼트 타입이 같다면?**

일단 OK! 하고 속성을 비교

```
//Before
<div className="A"/>

//After
<div className="B"/>
```

- 속성이 다르다면, 다른 부분만 캐치해서 virtual DOM에 표기
- 만약 컴포넌트 인스턴스라면, `componentDidUpdate`가 실행

---

하지만 다음과 같은 예외 상황도 발생

```
//Before
<div className="comment">
	<div>hi!</div> // a
   	<div>hello!</div> // b
</div>

//After
<div className="comment">
	<div>nice To meet You!</div> // 다
   	<div>hi!</div> // 가
   	<div>hello!</div> // 나
</div>

```

일단 지금껏 배운 걸 응용하자면, 루트의 엘리먼트와 속성은 같음. 그럼 루트 엘리먼트는 통과.
그런데 문제는 말이죠, 안의 자식 노드들을 보아하니, 위에 하나만 추가되어 있는 상황.

간단함. 원래는 새로 생긴 노드만 추가시키면 됨.

**하지만 `React`에서는 애석하게도 이를 애매하다!라고 판단하고 모든 자식을 변경**.

그럴만도 한 것이, **형제간 이동에 있어** **누가 기존 노드인지를 파악하지를 못함.**

이것이 다음 가정이 중요한 이유.

> **2-3-2. 개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.**

- 일반적으로 `React`는 `DOM Tree`를 `level by level`로 탐색하는 알고리즘을 사용
- 따라서 같은 레벨의 노드들을 순회하며 비교
- 하지만 해당 노드의 위치가 아까처럼 바뀌어버린다면, 이를 인식 X 순회를 하는 데에 있어, 위치의 변화까지는 감지하지 못하기 때문.
- **결과적으로 이는 통째로 모든 자식을 변경하므로 성능이 저하되는 큰 원인**

따라서 이때 사용하는 것이 `key` prop

```
//Before
<div className="comment">
	<div key="2">hi!</div> // a
   	<div key="1">hello!</div> // b
</div>

//After
<div className="comment">
	<div key="3">nice To meet You!</div> // 다
   	<div key="2">hi!</div> // 가
   	<div key="1">hello!</div> // 나
</div>

```

다만, 인덱스를 키로 설정할 경우 오류가 발생할 수 있으므로 반드시 변하지 않고, 예상 가능하며, 유일한 값을 권장.

[이 글](https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e)에서 다음 그림을 갖고 왔습니다. 해당 그림은, 리액트에서 재조정이 일어나는 과정이에요.

![https://miro.medium.com/max/875/1*chzMjpfd821rcHntjWb8rQ.png](https://miro.medium.com/max/875/1*chzMjpfd821rcHntjWb8rQ.png)

---

## **2-4. 여담**

이렇게 효율적으로 재조정이 일어납니다.
**결과적으로 여러 노드를 비교하면서, 기존에 DOM 조작으로 발생할 수 있는 여러 리렌더링 대신 딱! 한 번만 렌더링을 시켜주는 것이죠.**

어떻게 보면 메모리에 DOM을 복사하고, 이를 다시 변경하는 과정이 복잡하고 비용이 많이 드는 것처럼 보일 수 있지만, 여러 리렌더링을 방지할 수 있는 패턴이라면, 꽤나 매력적입니다.

그렇다면 이런 생각이 들 수 있습니다.

> **virtual DOM이 훨씬 빠른 거 아냐?!**

이에 대해서는, 충분히 빠르지만 실제 최적화한 돔보다 빠르지는 않다고 일축하였습니다. 그 이유는, 그 안에서 해야하는 일들이 상당히 많기 때문입니다. (상태관리도 해야하고, 돔에 대한 복사도 해야하고, 변화도 감지해야하죠.)

오히려, [오버헤드가 많이 발생한다는 한계도 지적](https://svelte.dev/blog/virtual-dom-is-pure-overhead#Where_does_the_overhead_come_from)되고 있습니다.

> **Most obviously, You can't apply changes to the real DOM without first comparing the new virtual DOM with the previous snapshot.**

그러면 반대로 또 이런 생각을 해볼 수 있죠.

> **그렇다면 왜 굳이 virtual DOM을 쓰는데? 빠르지도 않다며!**

이에 대한 변호로는, 생산성을 들 수 있겠습니다.
만약 `DOM`에서 이를 최적화하려면, `DOM fragment`을 사용하며 일일이 따져야 합니다. 이에 대한 고민과, 또 만약 잘못 사용했을 때의 비용 역시 꽤나 골치 아프죠.

이러한 한계점에 있어서, 리액트의 `virtual DOM`은 고민 자체를 해결해주기 때문에, 꽤나 생산성에 있어서 파워풀하다고 할 수 있겠습니다.

**p.s. 수정 - 현재는 "2-3-2의 경우, 형제간 이동"까지는 표현할 수 있다고 하네요.**

> 현재 구현체에서는 한 종속 트리가 그 형제 사이에서 이동했다는 사실을 표현할 수는 있지만, 아예 다른 곳으로 이동했다는 사실은 표현할 수 없습니다. 알고리즘은 전체 종속 트리를 재렌더링할 것입니다.

---

# **4. 참고자료**

[https://ko.reactjs.org/docs/faq-internals.html#gatsby-focus-wrapper](https://ko.reactjs.org/docs/faq-internals.html#gatsby-focus-wrapper)

[https://ko.reactjs.org/docs/reconciliation.html](https://ko.reactjs.org/docs/reconciliation.html)

[https://velopert.com/3236](https://velopert.com/3236)

[https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e](https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e)

[https://jeong-pro.tistory.com/210](https://jeong-pro.tistory.com/210)

[https://blog.naver.com/dndlab/222007423326](https://blog.naver.com/dndlab/222007423326)

[https://svelte.dev/blog/virtual-dom-is-pure-overhead#Where_does_the_overhead_come_from](https://svelte.dev/blog/virtual-dom-is-pure-overhead#Where_does_the_overhead_come_from)
