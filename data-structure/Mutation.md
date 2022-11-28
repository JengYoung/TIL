## 뮤테이션

백엔드 데이터를 조작하기 위한 요청을 수행하는 방법이다.  
조작 한 번 만으로 모든 데이터에 영향을 줄 수 있기 때문에 가급적 사용에 주의해야 한다.  
따라서, 다음과 같이 사용하는 뮤테이션은 꽤나 위험하다.

```graphql
mutation burnItDown {
	deleteAllData
}
```

`Mutation`은 루트 객체 타입이며,이 안에 사용할 수 있는 필드를 API 스키마에 정의한다.  
예컨대 새롭게 데이터를 만들 수도 있다.

```graphql
mutation createSong {
	addSong(title: "No Scrubs", numberOne: true, performerName: "TLC") {
		id
		title
		numberOne
	}
}
```

해당 코드가 의미하는 것은 다음과 같다.

1. `title` `numberOne` 여부, `performName`이 인자로 넘어가므로 음악 데이터가 데이터베이스에 추가된다.
2. 객체를 반환할 것인데, 이는 셀렉션 세트를 추가해야 한다. (예제는 Song 타입의 객체를 반환)

기존 데이터를 변경할 수도 있다.

```graphql
mutation closeLift {
	setLiftStatus(id: "jazz-cat", status: CLOSED) {
		name
		status
	}
}
```