# 프라미스 사용법

`Promise`는 비동기 작업과, 그 결과를 갖고 해야 할 일을 캡슐화한 객체.  
작업 완료 시 객체에 캡슐화한 성공 콜백 / 실배 콜백을 호출하게 된다.


## 맹점

싱글스레드 방식으로 동작하는 자바스크립트에서, 프로미스 패턴의 경우 테스트를 다른 방법으로 실시해야 한다.  
이유는 비동기로 인해 제어의 순서가 뒤바뀌기 때문이다.

## 해결 방법

프라미스를 반환하도록 한다.  
그리고 프라미스를 비동기 시점에서 검증할 수 있도록 `then`에서 테스트 코드를 넣어주면 된다.  
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