# 콜백 패턴

자바스크립트의 강력한 특성을 이용하는 패턴이다.  
자바스크립트에서 함수는 일급 객체이며, 일급 객체는 함수가 값으로 취급될 수 있다.  
따라서 콜백을 받는 고차 함수 형태로 운용이 가능한데, 이를 통해 콜백을 넘겨 원하는 로직을 실행하는 패턴이다.


## 콜백 함수 단점

### 콜백 화살

콜백 함수를 남발하다 보면, 마치 왼쪽에서 오른쪽으로 깊은 늪에 빠져드는 것 같은 코드 형상이 나타나게 된다.  
이러한 코드들은 읽기는 물론 고치기가 어려우며, 로직 오류가 생기면 유지보수가 상당히 까다롭다.

### 익명함수를 사용하지 말라.

콜백 화살을 막기 위해서는 익명함수를 가급적 자제하는 것이 좋다.  
콜백 함수 역시, 중첩 콜백을 눌러 편 코드가 훨씬 보기가 좋다.  
```js
// bad
const Callback = {};
Callback.rootFunc = () => {
   Callback.firstFunc(() => {
      Callback.secondFunc(() => {
         Callback.thirdFunc(() => {
            Callback.fourthFunc(() => {
               // ...
            })
         })
      }) 
   })
}
// good

Callback.rootFunc(Callback.firstFunc)
Callback.firstFunc(Callback.secondFunc)
Callback.secondFunc(Callback.thirdFunc)
Callback.thirdFunc(Callback.fourthFunc)
```

그 외에도 다른 단점들이 존재하므로 익명함수를 사용하지 않는 것이 좋다. 이유는 밑과 같다.

1. **익명함수는 콜백만 따로 떼어낼 방법이 없다.**
   특히 이는 자바스크립트에서 단위 테스트를 할 때 불리하게 작용한다.
2. **익명함수는 디버깅을 어렵게 만든다.**
   이름 없는 함수이므로 디버거에서 호출 스택에 식별자를 표시하지 않기 때문에, 디버깅이 어려워진다.

### this 사용에 민감하다

`this`를 제대로 사용하지 못한다면 원치 않은 엉뚱한 값을 참조할 수 있다.  
이는 화살표 함수가 나온 후로는 덜하는 편이지만, 여전히 이마저도 `function`을 겸용해서 사용해야 하는 상황에서는 난감하다.


## 테스트 코드를 통한 `this` 바인딩 단위 테스트

`TDD`를 통해 이러한 엣지 케이스들을 미리 예상하며 기댓값을 충족하는지 확인하면, 이러한 콜백 패턴의 단점을 어느정도 극복할 수 있다.

```js
import { Conference } from "../../src/chapter3/callback.js";

describe('Conference.checkedInAttendeeCounter', () => {
  let counter;

  beforeEach(() => {
    counter = Conference.checkedInAttendeeCounter();
    console.log(counter)
  })

  describe('increment()', () => {
    // increment
    it(() => {})
  })
  describe('getCount()', () => {
    // getCount
    it(() => {})
  })
  describe('countIfCheckedIn(attendee)', () => {
    let attendee;

    beforeEach(() => {
      attendee = Conference.attendee('화숙', '김');
    })

    it('참가자가 체크인하지 않으면 인원수를 세지 않는다', () => {
      counter.countIfCheckedIn(attendee);
      expect(counter.count).toBe(0);
    })

    it('참가자가 체크인하면 인원수를 센다', () => {
      attendee.checkIn();
      counter.countIfCheckedIn(attendee);
      expect(counter.count).toBe(1);
    })

    it('this를 잘못 바인딩하면 연산되면 오류가 난다.', () => {
      attendee.checkIn();
      counter.countIfCheckedIn.call({}, attendee);
      expect(counter.count).toBe(1)
    })
  })
})
```