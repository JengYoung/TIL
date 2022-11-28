## 서브스크립션

서브스크립션 구독은 `GraphQL` API를 사용해 실시간 데이터 변경 내용을 받을 수 있는 기능이다.  
서브스크립션은 `query`, `mutation`에 이어 3번째 루트 타입이며, `subscription` 타입 아래 필드로 정의되어 API 스키마에 들어간다.

예컨대 다음과 같이 상태 변경 내용을 구독하는 작업문을 작성할 수 있다.

```graphql
subscription {
	liftStatusChange {
		name
		capacity
		status
	}
}
```

서브스크립션이 시작될 시, 웹소켓으로 리프트 상태 변경 내용을 받아 본다.   
이때, 재생 버튼을 눌러도 바로 데이터가 반환되지는 않는다.  
요청이 전송되면, 데이터의 변경 사항 여부를 듣기만 하기 시작할 뿐이기 때문이다.  
즉, 대상 데이터의 변경 내용을 포착하고 싶다면 **데이터가 실제로 다른 곳에서 바뀌어야 한다.**

```graphql
mutation closeLift {
	setLiftStatus(id: "astra-express", status: HOLD) {
		name
		status
	}
}
```

실제로 바꾸면, 잘 바뀐 데이터가 반환된다.  
이후, summit의 상태를 바꿀 때에도 잘 반환된다.
