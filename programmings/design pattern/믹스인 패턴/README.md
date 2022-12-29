# 믹스인 패턴

## 재래식 믹스인 패턴

다음과 같이, 한 객체를 다른 객체에 뒤집어 씌우기 위해 사용한다.

```js
Conference.mixins.idMixin = function() {
  'use strict';

  return {
    id: undefined,
    getId() {
      return this.id;
    },
    setId(idValue) {
      this.id = idValue;
    }
  }
}

// newAttendee라는 객체의 프로퍼티와 메서드를 믹스인합니다.
ReliableJavaScript.extend(newAttendee, Conference.mixins.idMixin());
```

### 단점: 프로퍼티가 노출된다.

안타깝지만, `this`로 바인딩되어 있기 때문에 믹스인하는 순간, `id`가 자칫하면 다른 프로퍼티로 연결될 가능성이 존재한다.  
즉, 믹스인된 메서드가 일관된 로직으로 이어질 수 있음을 보장할 수 없다.  
이를 해결하기 위해서는, 클로저 방식으로 믹스인 패턴을 적용하는 함수형 믹스인 패턴을 사용하는 것을 권장한다.

## 함수형 믹스인 패턴

앵거스 크롤은 '새로운 시각으로 바라본 자바스크립트 믹스인'이라는 글을 통해 함수형 믹스인이라는 패턴을 제시했다.  
이 방법의 장점은, 데이터를 감추는 게 강력하다는 것이다.

```js
Conference.mixins.addId = function() {
  'use strict';

  let id;

  if ('getId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + 'getId');
  }

  if ('setId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + 'setId');
  }

  this.getId = function() {
    return id;
  }

  this.setId = function(idValue) {
    id = idValue;
  }
}
```

## 주의사항

+ 오버라이딩 시 프로토타입 프로퍼티/메서드를 오버라이딩하지 말자.
  결국 체인 상에 존재하는 모든 것들을 오버라이딩하게 되면 유지보수가 어려워지고 복잡도가 매우 상승하게 된다.  
  따라서 웬만하면 현재 객체의 프로퍼티/메서드만 믹스인할 수 있도록 하자.
+ 타깃 객체는 (만약 믹스인이 의존하고 있는 프로퍼티가 있다면) 믹스인이 의존하는 프로퍼티를 제공해야 한다.
+ 의도한 대로 프로퍼티가 잘 믹스인되고 있는지 확인한다.
+ 믹스인한 함수가 정상적으로 동작한다.