# 단일 책임 원칙

이전에 쓴 글은 다음과 같이 서술되었다.

> - 모든 클래스는 각각 하나의 책임만 가져야 한다.
> - 클래스는 그 책임을 완전히 캡슐화

하지만 전혀 와닿지 않는다. 이것은 좋은 공부 습관이라고 볼 수 없다.  
내가 납득할 수 있는 단일 책임의 원칙을 직접 느껴보고자, 이번에 새로 작성한다.

## 함수는 한 가지 변경 사유가 존재해야 한다.

핵심은 **한 가지 사유**이다.  
왜 한 가지의 목적만 갖고 있어야 할까?  
이유는, 복합적인 목적은 결국 그 코드를 **재사용하기 어렵게 만들기 때문**이다.

어떤 예시를 들으면 좋을까 하다가, 지금 마침 카페에 있다.  
카페를 예시로 들어보겠다.

> 🚦 주의: 실제로는 더 세분화되고 구체적으로 추상화해야 하지만, 정말 "예시"이므로, 요지에 집중해서 생각하도록 한다.


```js
class Cafe {
  constructor(table, chair, operationTime, menus) {
    this.state = {
      orderNumber: 0,
      table,
      chair,
      operationTime,
      isOpen: false,
      orders: [],
      menus
    }
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState
    }
  };

  open() {
    this.setState({ isOpen: true })
  }

  close() {
    this.setState({ isOpen: true })
  }

  isPossibleStay(cnt) {
    return (this.state.avilableChair >= cnt && this.state.avilableTable)
  }

  orderMenu(menu) {
    if (this.state.menus[menu] === undefined) return;
    this.setState({
      orders: [
        ...this.state.orders,
        { 
          id: this.state.orderNumber, 
          menu,
          price: this.state.menus[menu]
        }
      ],
      orderNumber: this.state.orderNumber + 1
    })
  }

  get totalSales() {
    return this.state.orders.reduce((acc, obj) => acc + obj.price, 0);
  }
}
```

카페를 객체로 추상화한다면, 정말 간단하게 이런 식으로 나올 수 있다.  
추상화된 카페를 요약하자면 다음과 같은 특성이 있다.


1. 운영시간, 메뉴, 의자, 책상 수는 가게마다 정의할 수 있게 파라미터로 정의
2. 열고 닫을 수 있음.
3. 주문을 받고, 정산할 수 있음
4. 테이블이 있고, 사람 수보다 의자가 많다면 앉아서 쉴 수 있음

따라서 공통된 인터페이스와 상태, 메서드를 추상화했다는 점에서 나름 나쁘지 않은 예시라 생각한다. 

> **그렇다면, 본격적으로 단일 책임 원칙을 살펴볼까?**

--- 


### 잘못된 단일 책임 원칙의 예시

#### A카페를 위해 방 상태를 넣어주자!

개발자 D는 카페의 관리를 돕는 프로그램을 이번에 개발했다.  
아직까지는 단순한 카페들이 많아서, 나름대로 꿀빠는 개발자의 삶을 살고 있었다.

A 카페는 이번에 코로나로 인해 많은 피해를 받았다고 치자.
그래서 내놓은 방안은, **"2m 제한의 단점이 어차피 존재하는데, 아예 스터디 카페로 만들자"** 였다.

그래서, A 카페는 이 클래스에 불만을 가졌다.
> **저희는 이제 방이란 걸 만들 건데, 이걸 추상화시켜주세요!**

우리의 개발자 D는 매우 불만을 많이 가졌지만, 역시 투덜대며 만들기 시작한다.
(갑자기 눈물이... 😭)

```js
class Cafe {
  constructor(table, chair, operationTime, menus, rooms) {
    this.state = {
      // ...
      rooms
    }

    // ...
  }
  // ...
}
```

오, 상태 추가에 대해서는 뭔가 그렇게 큰 변화는 없었다.  
그런데, 만약 카페에서 **더이상 이용이 불가능하다는 것을 알려주는 메서드를 만든다면 어떨까?**


```js
  isPossibleStay(cnt) {
    return this.state.avilableChair >= cnt && this.state.avilableTable || this.state.rooms
  }
```

어떤가! 로직 자체는 매우 간결하다.
1. 테이블이 있고 의자가 현재 앉으려는 사람보다 많다면 가능
2. 혹은 방이 있다면 가능

하지만, **점차 불안해진다.**  
눈치를 아직 못 챘는가? 그렇다면 다음 예시를 살펴 본다.

#### B카폐: 우리는 미팅룸을 운영할 건데요...

인근에 회사가 많은 `B카페`는 미팅룸을 운영함으로써 쏠쏠하게 오후에도 사람을 잡으려고 시도하고 있다.

따라서 현재 이 프로그램이 진짜 개발도 잘 반영해주는 맛집이라는 소문을 듣고(...) 이번에 다른 주문을 하기 시작했다.

> 우리는 미팅룸을 무조건 **전일 예약제**로 할 거에요. 전날에 예약을 한 사람만 이용이 가능하게 해주세요! 🥰

##### 터져버린 로직

안타깝지만, 이 순간, 상태 정의와 `isPossibleStay` 메서드 정의에 대해 고민에 빠지게 된다.  

> 미팅룸... (쓰읍) 이것도 방이잖아.  
> 그러면 저거 분기 처리 어떻게 하지...?

물론 답을 내는 건 어렵지 않다.
그냥 상태 하나 추가하고, 또 상태에 따른 분기 추가하면 된다.

```js
class Cafe {
  constructor(table, chair, operationTime, menus, rooms, roomsReservationList = []) {
    this.state = {
      // ...
      rooms,
      roomsReservationList
    }

    // ...
  }
  // ...

  isPossibleStay(cnt, revervationId = null) {
    return this.state.roomsReservationList.some(v => v.id === reservationId && v.cnt === cnt) || (this.state.avilableChair >= cnt && this.state.avilableTable || (this.state.rooms && !reservationId))
  }
}
```

어떤가, 이제 불안해지지 않는가?
이제 `isPossibleStay`는 B카페의 요구 하나만 추가되었는데 매우 로직이 어려워졌다.

1. 리스트 중에 아이디와 인원수가 일치하는 게 있으면 이용 가능
2. 수용할 수 있는 의자와 테이블이 있어도 가능(어차피 수용할 수 있는 건 맞으니)
3. 스터디 카페의 경우 예약한 아이디가 없는 단순 고객일 경우에 한해서만 룸 예약 가능

그래도 음... 여튼 돌아간다.  
개발자인 D는 머리를 싸매며, 오늘도 문제를 해결했다고 다행의 한 숨을 내뱉고 11시에 퇴근한다.

---

#### 카페 C: 저희는 스터디 카페도 예약제로 할 거에요!

개발자 D는 오전에 도착했다.
그런데 카페 C가 이번에 스터디 카페를 완전 예약제로 운영한다고 한다.

> 저희도 프로그램 이용할 수 있게 해주세요! 🥰

... 개발자 D는 눈물을 흘린다.  
**왜냐하면 isPossibleStay 메서드를 어떻게 수정할지 고민이 되었기 때문이다.**


---

## 해결 방안: 단일 책임 원칙을 적용한다.

지금까지 눈물 젖은 어느 D씨의 이야기를 보았다. (내 얘기인가...?)  
여태까지 개발자 D에 대한 행동이 잘못되었다고 할 수 있을까?  

**나는 그렇게까지는 생각하지 않는다.** 어찌되었든, 그는 제한된 시간 안에, 나름대로 야근까지 했고, 자신의 능력을 최대한 발휘하며 문제를 해결했기 때문이다.

> **이 개발자에게 주어진 리소스를 헤아리지 않고, 지금 예시만 보고 단순 비난만 했다면, 자신의 '오만함'이 어디까지인지 의심해보아야 할 것이다. 그것은 상대 개발자에게 엄청난 실례이니. ~~지금 프리스타일로 20분 동안 예제를 설렁 내며 글을 쓰는 내가 뜨끔해서 하는 말이 아니다. 쿨럭...~~**

다만 그 시간 동안에 단일 책임의 원칙이란 것을 접하고 알 수 있었다면, 더 깔끔하고 쉽게 유지보수할 수 있지 않았을까?

예컨대 다음과 같이 말이다.

### Cafe를 좀 더 공통 인터페이스로 추상화

예컨대, 테이크아웃 전용 카페에서는 테이블과 의자가 필요 없다. 따라서 이런 것 역시 나중에는 분리해서 적용하는 것이 타당하다.
여러 카페들의 특성에 맞게 다시 추상화를 적용해보자.

```js
class Cafe {
  constructor({ orderNumber = 0, operationTime, menus, isOpen, orders = [] }) {
    this.state = {
      orderNumber,
      operationTime,
      isOpen,
      orders,
      menus,
    }
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState
    }
  };

  open() {
    this.setState({ isOpen: true })
  }

  close() {
    this.setState({ isOpen: true })
  }

  orderMenu(menu) {
    if (this.state.menus[menu] === undefined) return;
    this.setState({
      orders: [
        ...this.state.orders,
        { 
          id: this.state.orderNumber, 
          menu,
          price: this.state.menus[menu]
        }
      ],
      orderNumber: this.state.orderNumber + 1
    })
  }

  get totalSales() {
    return this.state.orders.reduce((acc, obj) => acc + obj.price, 0);
  }
}
```

그저 주문을 하고, 영업을 하고, 정산을 할 수 있다는 기능에 초점을 맞췄다.

### A의 요구를 위한 `StudyCafe` 클래스 분리

```js
class StudyCafe extends Cafe {
  constructor({ 
    orderNumber = 0, 
    operationTime, 
    menus, 
    isOpen, 
    orders = [], 
    rooms, 
    reservationList 
  }) {
    super({ orderNumber, operationTime, menus, isOpen, orders });

    this.state = {
      ...this.state,
      rooms, // [{ id: 0, cnt: 4 }]
      reservationList, // [{ id: 0, phoneNumber: '000-xxxx-xxxx', cnt: 4 }]
    }
  }
  
  isPossibleStay(cnt) {
    return this.state.rooms.some(v => v.cnt >= cnt);
  }
}

```

어떤가?  
매우 간결해졌다.
이제, 스터디 카페는 인원이 들어왔을 때, 이를 수용할 수 있는 공간의 방만 있다면 들어갈 수 있다.

단일 책임의 원칙을 따른다면 매우 간편해지는데, 100% 예약제로 운영하는 C의 요청이 들어와도 유지보수가 간편하다.  

```js
  isValidReservation({id, phoneNumber, cnt}) {
    return this.state.reservationList.some(v => v.id === id && v.phoneNumber === phoneNumber, v.cnt === cnt)
  }
```

단일 책임의 원칙에 맞게 그저 유효한 예약인지만 검토해주자.
이러면 이 메서드는 굳이 다른 것을 신경쓸 필요가 없다. 예약 리스트에서 해당 요청한 정보와 일치하는 게 있는 것만 확인하면 끝이다.

이렇게, 우리는 개발자 D의 소중한 워라밸을 지켜줄 수 있었다. 
~~워라밸... 지켜!~~


# 🌈 결론

단일 책임 원칙은 막 분리하라는 것이 아니다.
함수의 유일한 관심사를 한정지어줌으로써, 각자가 좀 더 재사용성 높고 유지보수가 쉽게 만들어주자는 것이 이 원칙의 핵심이다.  
갑자기 SOLID 원칙을 톺아보니, 코드를 얼른 리팩토링하고 싶다는 욕망이 쑥쑥 자란다. 🥰

