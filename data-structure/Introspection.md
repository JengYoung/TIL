## 인트로스펙션

인트로스펙션을 통해 현재 API 스키마의 세부 사항에 대한 쿼리를 작성할 수 있다.

따라서 GraphQL 플레이그라운드 인터페이스에서 GraphQL 문서를 살펴볼 수 있다.

```graphql
query {
	__schema {
		types {
			name
			description
		}
	}
}
```

만약 특정 타입에 대한 세부 사항을 살펴보고 싶다면 `__type` 쿼리에 타입명을 인자로 넘기고 작성한다.

```graphql
query liftDetails {
  __type(name: "Lift") {
    name
    fields {
      name
      description
      type {
        name
      }
    }
  }
}
```

그 결과, 특정 타입에 어떤 필드가 있고, 어떤 스칼라 타입을 가지는지를 알 수 있다.  
따라서, 맨 처음 사용할 때에는 루트 타입에서 받아볼 수 있는 필드가 무엇인지를 알아보는 게 좋다.

```graphql
query roots {
  __schema {
    queryType {
      ...typeFields
    }
    mutationType {
      ...typeFields
    }
    subscriptionType {
      ...typeFields
    }
  }
}
```

```graphql
fragment typeFields on __Type {
  name
  fields {
    name
  }
}
```