# 싱글톤 패턴

+ 하나의 클래스에 오직 하나의 인스턴스만 가지는 패턴
+ 대개 DB 연결 모듈에 많이 사용

## 장점

+ 하나의 인스턴스를 만들고 해당 인스턴스를 다른 모듈들이 공유하며 사용하므로 인스턴스 생성 시 비용이 줄어듦

## 단점    

+ 의존성이 높아지는 단점 역시 존재
+ 특히 TDD를 할 때 이 의존성이 높다는 점이 단위 테스트마다의 독립성을 유지하는데 걸림돌이 된다.
+ 모듈 간의 결합을 강하게 만드는 단점 역시 존재한다.

## 자바스크립트의 싱글톤 패턴

기본적으로 자바스크립트는 객체 생성 시 다른 객체과 비교할 때 키, 값이 같더라도 다른 것으로 인식

따라서 자바스크립트는 그 자체만으로 싱글톤 패턴 형성이 용이

```js
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }

    return Singleton.instance;
  }

  getInstance() {
    return this.instance
  }
}

const a = new Singleton();
const b = new Singleton();

console.log(a === b) // true
```

결과적으로 a와 b는 하나의 인스턴스를 가지게 되는 것!

결과적으로 인스턴스에 대해 다른 모듈들이 서로 공유하면서 사용할 수 있기 때문에, 인스턴스 생성 비용이 감소하는 장점이 존재한다.

## Singleton in MongoDB

```js
Mongoose.prototype.connect = function(uri, options, cb) {
  const _mongoose = this instanceof Mongoose ? this : mongoose;
  const conn = _mongoose.connection;

  return _mongoose._promiseOrCallback(cb, callback => {
    conn.openUri(uri, options, err => {
      if (err !== null) {
        return callback(err);
      }

      return callback(null, _mongoose);
    })
  })
}
```

## Singleton in MySQL
```js
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, 
  host: 'example.com',
  user: 'jengyoung',
  database: 'dbtest'
})

pool.connect();

// module A
pool.query(query, function (err, results, fields) {
  if (err) throw error;
  conosle.log(`The solution is: ${results[0].solution}`);
})

// module B
pool.query(query, function (err, results, fields) {
  if (err) throw error;
  console.log(`The solution is: ${results[0].solution}`);
})
```

## 의존성이 높은 단점 해결 - 느슨한 결합

메인 모듈이 직접 다른 하위 모듈에 대한 의존성을 주기보다는, 중간에 의존성 주입자(dependency injector)가 해당 부분을 가로채 메인 모듈이 간접적으로 의존성을 주입시키도록 함.

결과적으로 상위 모듈은 하위 모듈에 대한 의존성이 떨어지고, 이를 디커플링이 된다고도 표현함.

이때   
+ 상위 모듈은 하위 모듈에서 어떠한 것도 가져오지 않아야 하며
+ 둘 다 추상화에 의존해야 하고, 추상화는 세부 사항에 의존하지 말아야 한다.

> 이를 **의존성 주입의 원칙**이라 함.
### 장점

+ 모듈들을 쉽게 교체할 수 있는 구조 형성
+ 마이그레이션, 테스팅 수월
+ 애플리케이션 의존성 방향 일관성 증가
+ 애플리케이션 추론이 쉬워짐
+ 모듈 간 관계 명확히 함
  
### 단점
+ 모듈들이 더욱 분리되어 클래스 수가 늘어나 복잡성 증가
+ 런타임 패널티가 생길 수 있음


# 참고자료

[dependency injection에 관하여 잘 설명된 블로그 글](https://tecoble.techcourse.co.kr/post/2021-04-27-dependency-injection/)

