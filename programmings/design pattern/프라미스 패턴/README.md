# 프라미스 패턴

## 사용법

`Promise`는 비동기 작업과, 그 결과를 갖고 해야 할 일을 캡슐화한 객체.  
작업 완료 시 객체에 캡슐화한 성공 콜백 / 실배 콜백을 호출하게 된다.

### 인자

비동기 작업을 감싼 콜백함수를 받는다. 이 함수는 또 두 인자를 받게 되는데, `resolve`와 `reject`에 대한 각각의 함수를 받게 된다.
이는 곧 `Promise`가 귀결 처리 될 때 숙명에 따라 처리하기 위한 함수들이다.


## 맹점

싱글스레드 방식으로 동작하는 자바스크립트에서, 프로미스 패턴의 경우 테스트를 다른 방법으로 실시해야 한다. 이유는 비동기로 인해 제어의 순서가 뒤바뀌기 때문이다.

테스트 기대식이 실행될 때 여전히 `pending`된 상태로 남는다는 것은 특히 주의할 일이다. 이로 인해 실패할 코드가, 비동기 로직이 아직 실행되지 않아 성공하는 경우가 발생하기 때문이다.

## 해결 방법

프라미스를 반환하도록 한다. 그리고 프라미스를 비동기 시점에서 검증할 수 있도록 `then`에서 테스트 코드를 넣어주면 된다. 

또한, `done`이라는 비동기 테스팅 함수를 사용하면, 비동기가 끝났음을 알림으로써 좀 더 안전한 테스팅이 가능해진다.

다음은 예시이다.

```js

  return {
    checkIn: function(attendee) {
      attendee.checkIn();

      // INFO: 다음과 같이 Promise를 반환값으로 전달하면 된다. 
      return recorder.recordCheckIn(attendee).then(
        function onRecordCheckInSucceded(checkInNumber) {
          attendee.setCheckInNumber(checkInNumber);
          return Promise.resolve(checkInNumber);
        },
        function onRecordCheckInFailed(reason) {
          attendee.undoCheckIn();
          return Promise.reject(reason);
        }
      )
    }
  }
```

이후 테스트 코드에서는 다음과 같이 프라미스의 `then`부분에서 호출해내며 검증한다.

```js
      it('참가자의 checkInNumber를 지정한다.', (done) => {
        checkInService.checkIn(attendee).then(
          function onPromiseResolved() {
            expect(attendee.getCheckInNumber()).toBe(checkInNumber);
            done();
          },
          function onPromiseRejected() {
            expect('이 실패 분기 코드가 실행되었다.').toBe(false);
          }
        )
      })
```

## 상태와 숙명

> [다음 글](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)을 원천으로 하여 적는다.

결국 프로미스는 기준에 따라 여러 카테고리로 나눌 수 있다.  
그중 대표적인 것은 상태(state)와 숙명(fates)이다.


### 상태(state)

프로미스는 3가지 상태로 존재할 수 있다.

+ `fulfilled`: 콜백을 실행하도록 이행된 상태이다.
+ `rejected`: 거부된 상태이다.
+ `pending`: 아직 보류 중인 상태이다.

### 숙명(fates)

하지만 결국 프로미스는 어떤 분기를 기점으로 결정을 해야 하는 상황이 놓인다.  
결과적으로 `resolve` 했는지, 하지 않았는지가 가장 주된 관심사이지 않을까.  

그렇기 때문에 숙명의 관점에서는 다음 2가지로 나눌 수 있다.

+ `resolved`: 귀결된 상태이다.
+ `unresolved`: 아직 해결되지 않은 상태이다.


