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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/308aca3b-846f-4c2e-b8ac-fd1c2b0a455f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T083019Z&X-Amz-Expires=86400&X-Amz-Signature=09260eb331a9c7aaf207d00cb821eefa314bcf91d2aece1bcb93be5d1067decb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ad61b5dc-a7a8-47cf-92f1-7188e18d0aab/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T083034Z&X-Amz-Expires=86400&X-Amz-Signature=7bdfaa36987a72e48ee7d38584c897098b2d768d0689bbe327f362b6e0728eb1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

실제로 바꾸면, 잘 바뀐 데이터가 반환된다.

이후, summit의 상태를 바꿀 때에도 잘 반환된다.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/52d0b295-3c95-4e57-b0a4-17f980cc2a78/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T083044Z&X-Amz-Expires=86400&X-Amz-Signature=264e4a77b1a5b4ba42d43b975c192d6e73edd0637904be6113ecb48cfb4239b3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)