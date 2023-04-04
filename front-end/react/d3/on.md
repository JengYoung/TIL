# d3selection.on(type[,listener, captuue])

현재 선택물의 각 문서요소에 인자로 지정한 타입(type) 의 이벤트 리스너(listener) 를 추가하거나 제거한다. 

+ `type` - "click", "mouseover", "submit" 같은 이벤트 타입의 이름을 의미하는 문자열 
+ `listener` - 각각의 DOM 문서요소에서 같은 방식으로 별도의 연산 함수처럼 호출된다. 이 함수는 데이텀 d와 색인 i을 인자로 가지며, 해당 DOM 문서요소가 this가 된다. 리스너에서 현재 이벤트에 접근할 때는 전역 객체인 d3.event를 사용한다.

선택한 문서요소에 등록하려는 이벤트 타입의 리스너가 이미 등록되어 있다면, 이전 리스너는 신규 리스너가 추가되기 전에 삭제 된다. 동일 타입에 여러 리스너를 등록하려면 "click.foo"나 "click.bar"같은 네임스페이스를 옵션으로 넣어야 한다.

리스너를 제거할 때는 listener 인자에 null를 넘긴다. 어떤 이벤트 타입에서 모든 리스너를 제거하려면 listener에는 null을, type에는 .type를 넘긴다. 

> ex: `selection.on(".abc", null)`

W3C의 useCapture 플래그와 해당하는 capture 플래그를 지정할 수 있다. useCapture 플래그 는 계층구조의 하단에 있는 EventTarget으로 이벤트가 전파되기 전에 등록된 EventListener로 먼저 전파된다. 계층구조를 통해서 버블링 되는 이벤트는 capture를 사용해서 지명한 EventListener를 호출하지 않는다.

listener 인자를 넘기지 않으면 지정한 type 을 위해 현재 할당된 이벤트가 있을 경우 이를 반환한다.