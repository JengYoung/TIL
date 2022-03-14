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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/856d86ac-2071-4919-aec4-d26bbef80311/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T083142Z&X-Amz-Expires=86400&X-Amz-Signature=1b4c05a8249126e5ca2a75577dd747e6dd7d29d6f5e4b2585f6d5add8c3d0230&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f07eeb1a-9a1c-4e4a-89d0-e228acf31523/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T083201Z&X-Amz-Expires=86400&X-Amz-Signature=fd952efc38c1bdf00915e19bebe379dd88a98b119625226c2e1e583a60a47427&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

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

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0787dbca-6caa-4692-a559-acfb42f038a7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220314T083216Z&X-Amz-Expires=86400&X-Amz-Signature=b35c131da41fd588d6d19c82b7af514848bdef722333a59e774e27d97e902dc4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)