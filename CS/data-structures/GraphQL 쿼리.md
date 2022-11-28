## GraphQL 쿼리

> 이 작업을 실제로 체험해보려면, [https://snowtooth.moonhighway.com/](https://snowtooth.moonhighway.com/)에 들어가 직접 해보자.
> 

쿼리 작업으로 API에 데이터를 요청할 수 있다.  
쿼리 안에는 `GraphQL` 서버에서 받고 싶은 데이터를 써 넣고, 보낼 때에는 요청 데이터를 필드로 적어 놓는다.

여기서 필드는 서버에서 받아 오는 JSON 응답 데이터의 필드와 일치한다.

```graphql
query {
	allLifts {
		name
		status	
	}
}
```


쿼리는 다음과 같이 여러 개 추가할 수도 있다. 다만, 작업은 한 번에 한 쿼리에 대해 이루어진다.

```graphql
query lifts {
	allLifts {
		name
		status
	}
}

query trails{
	allTrails{
		name
		difficulty
	}
}
```

실제로도 둘 중 하나만 택하라고 쿼리에서 메뉴 형식으로 사용자에게 전달한다.  

만약 둘 다 한 번에 받고 싶다면 어떻게 해야 할까?  
이를 같은 쿼리 안에 전부 써주면 그만이다.

```graphql
query liftsAndTrails {
  liftCount(status: OPEN)
  allLifts {
    name
    status
  }
  allTrails	{
    name
    difficulty
  }
}
```

이처럼 한 번에 여러 종류의 데이터를 받는다는 것이 바로 GraphQL의 강점이다. 

## 루트 타입

`Query`가 계속해서 요청할 데이터를 감싸고 있다.   
이를 루트 타입이라 하며, 타입 하나가 곧 하나의 작업을 수행하며, 작업이 곧 쿼리 문서의 루트를 의미한다. 

> query에 사용 가능한 필드 → API 스키마에 정의

## 셀렉션 세트

그리고 쿼리를 작성할 때에는 필요한 필드를 중괄호로 감싸는데, 이러한 중괄호로 묶인 블록을 셀렉션 세트라고 한다. 위의 쿼리에서, `allLift`, `allTrails`와 같은 것들이 셀렉션 세트이다.  
이러한 셀렉션 세트는 별칭도 부여할 수 있다.

```graphql
query liftsAndTrails {
	open: liftCount(status: OPEN)
	chairlifts: allLifts {
		liftName: name
		status
	}
	skiSlopes: allTrails {
		name
		difficulty
	}
}
```

데이터의 값은 같지만, 키의 이름이 달라진 것을 확인할 수 있다.

## 쿼리 인자

만약 쿼리 결과에 대해 필터링 작업을 하고 싶다면, 쿼리 인자를 넘기면 된다.  
예컨대 현재 가동 중이 아닌 리프트의 이름만 받고 싶다면 다음과 같이 넘긴다.

```graphql
query closedLifts {
	allLifts(status: CLOSED) {
		name
		status
	}
}
```

응용하면, 데이터를 선택하는 용도로 인자를 활용할 수 있다.   
만약 리프트의 아이디를 사용하여 해당 데이터를 추출하고 싶다면 다음과 같이 할 수 있다.

```graphql
query jazzCatStatus {
	Lift(id: "jazz-cat") {
		name
		status
		night
		elevationGain
	}
}
```

## 엣지와 연결

필드는 **스칼라 타입, 혹은 객체 타입**이다.

### 스칼라 타입

스칼라 타입은 쉽게 설명하자면 원시 타입과 비슷하며, 쿼리 셀렉션 세트의 ‘잎'이 되어주는 타입이다.

대표적으로

- Int
- Float
- String
- Boolean
- ID (String + Unique)

가 스칼라 타입이다.

### 객체 타입

스키마에 정의한 필드를 그룹 형태로 묶어 둔 것을 의미한다.  
응답으로 반환되어야 할 JSON 객체 형태를 하고 있다. 

필드 안에 객체를 끝없이 중첩할 수 있는데, 특정 객체가 있다면 해당 객체의 정보에 접근하는 쿼리를 작성하여 객체를 연결할 수 있다.

예컨대, 만약 특정 리프트에서 접근할 수 있는 코드 목록을 받고 싶다면

```graphql
query trailsAccessBySummit {
	Lift(id: "summit") {
		capacity
		trailAccess {
      name
			status
      difficulty
    }
	}
}
```

이라고 작성하면 된다. 

여기서 `trailAccess`는 Lift 타입 안에 있는 필드이다. 따라서 서밋의 Lift 정보를 활용해 특정 코스만 필터링한다. 

## 프래그먼트

셀렉션 세트 안의 중복되는 필드들을 재사용하기 위한 코드이다. 

```graphql
fragment liftInfo on Lift {
	name
	status
	capacity
	night
	elevationGain
}

query {
	Lift(id: "jazz-cat") {
		...liftInfo,
		trailAccess {
			name
			difficulty
		}
	}
	Trail(id: "river-run") {
		name
		difficulty
		accessedByLifts {
			...liftInfo
		}
	}
}
```

마치 `spread` 연산자와 비슷해 보인다. 

이때, `liftInfo` 를 Trail 안에 넣는 것은 불가능하다. 프래그먼트는 `Lift` 타입에 속하는 필드만 사용할 수 있기 때문이다. 따라서 만약 `trail`에 관한 프래그먼트를 사용하고 싶다면, 이에 맞춰 추가로 작성해야 한다.

```graphql
fragment trailInfo on Trail {
  name
  difficulty
  accessedByLifts {
    ...liftInfo
  }
}

fragment liftInfo on Lift {
	name
	status
	capacity
	night
	elevationGain
}

query {
	Lift(id: "jazz-cat") {
		...liftInfo,
		trailAccess {
			...trailInfo
		}
	}
	Trail(id: "river-run") {
		...trailInfo
    groomed
    trees
    night
	}
}
```

## 유니언 타입

만약 타입 여러 개를 한 번에 리스트에 담아 반환하고 싶다면 유니언 타입을 활용한다.  
유니언 타입이란 두 가지 타입을 마치 하나의 집합처럼 묶는 것이다.  
결과적으로 반환되는 데이터는 두 타입을 같이 갖고 있는 배열의 형태로 반환되는 것이다. 

이때, `...on [[셀렉션 세트]]`을 통해 인라인 프래그먼트의 형식으로 만들 수도 있다.

```graphql
query schedule{
  agenda{
    ...on Workout{
      name
      reps
    }
    ...on StudyGroup{
      name
      subject
      students
    }
  }
}
```

## 인터페이스

필드 하나로 객체 타입을 여러 개 반환할 때 사용한다.

이는 추상적이며, 어떤 완성된 객체 타입이 있다면, 이를 완성시키기 위해 사용해야 하는 필드 리스트를 쭉 모아둔 것이다.

이때 인터페이스를 갖고 타입을 구현할 때에는,

1. 인터페이스에 정의된 필드는 필수이며
2. 고유한 필드도 추가로 넣을 수 있다.

예컨대 다음과 같은 인터페이스를 만들었다고 치자.

```graphql
query schedule {
	agenda {
		name
		start
		end
	}
}
```

다른 건 다 상관 없다고 하더라도, name, start, end는 반드시 들어가야 한다.  
이때, 프래그먼트를 사용하면 필드가 더 들어간 객체 타입을 반환할 수 있다.

```graphql
query schedule {
	agenda {
		name
		start
		end
	}
	...on Workout {
		reps
	}
}
```