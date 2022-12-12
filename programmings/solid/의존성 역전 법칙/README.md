# 의존성 역전 법칙

상위 수준의 모듈은 하위 수준의 모듈에 의존해서는 안 되며, 이 둘은 추상화에 의존해야 한다는 원칙이다.  

예컨대 다음과 같다.  
만약 A 클래스가 B 클래스의 서비스가 필요하다면, A는 B를 생성하는 것이 아니라, A 생성자에 건낸 파라미터가 B를 서술하는 방식인 것이다.

이렇게 되면, 더이상 B에 의존하지 않아도 된다. 어차피 파라미터가 다음 B의 인터페이스를 만족한다는 전제하게 진행되고, 이를 타입가드 등으로 체크하기 때문이다.
즉, 개방/폐쇄 원칙을 지키면서도, 안정적인 개발이 가능해지는 것이다!


## 예제: 개발자 D, 사이즈 업 기능을 만들어주세요!

카페 관리 솔루션으로 점차 업계에서 이름을 알리게 된 개발자 D의 회사, <커피를만드는건개발자의코피>  
벌써부터 설립 약 1년 만에 약 13만 개의 커피 영업점과 제휴를 맺고, 키오스크를 통한 주문 서비스까지 성공적으로 마쳤다.
항상 점주들의 목소리를 잘 들어주고 반영하기에 이번 역시 D에게 다음과 같은 사이즈 업 기능을 요청했다.

이번에도 개발자 D, 만드는 건 뚝딱 잘 만들어냈다.


```js
class Coffee {
  constructor({ name, price, size = "tall" }) {
    this.name = name;
    this.price = price;
    this.size = size;
  }

  changeSize(size) {
    this.size = size

    return this;
  }
}

class CafeOrderKiosk {
  constructor() {
    this.orders = [];
  }

  addOrder(product, size) {
    const updatedProduct= this.updateSize(product, size);
    this.showMoneyUpCount(updatedProduct, product.price);

    this.orders.push(updatedProduct);
  }
  
  updateSize(product, size) {
    return product?.changeSize(size);
  }

  showMoneyUpCount(product, nowPrice) {
    let now = nowPrice;

    if (product?.price >= nowPrice) {
      while (product?.price !== now) {
        now -= 1;
        this.showMoneyUpAnimation(); // 돈이 1부터 내려가는 것을 화면에서 보여준다.
      }
    } else {
      while (product?.price < now) {
        now += 1;
        this.showMoneyUpAnimation(); // 돈이 1부터 올라가는 것을 화면에서 보여준다.
      }
    }
  }

  showMoneyUpAnimation(nowPrice) {
    console.log(nowPrice)
  }
}
```

그렇게 오늘도 실수가 나지 않을까 살짝 고민했지만, 이래뵈도 내가 누군가.
범접할 수 없는 5년차 개발자 D다. 후훗.

그렇게 또 열심히 일을 하는 척 월급 루팡을 하던 D는 눈치껏 칼퇴를 했다.


### 아니, 도대체 무슨 일이?!

그렇게 싱글벙글 웃으며 회사에 도착한 D.  
그런데... 사내 분위기가 심상치 않다.

갑자기 침울해하던 주니어 개발자 E가 설렁설렁 오는 개발자 D를 보고 달려오더니, 다음과 같은 말을 했다.

> D님, 큰일났어요!
> **무인 카페 5만 곳의 약 100만 명의 유저가 키오스크를 이용할 수 없어서 난리났어요!**

청천벽력 같은 충격적인 일.  
옆 고객상담센터를 보니 다들 계속 걸려오는 전화에 난처해보였다.  
심지어 네이버 뉴스에서는 '무인 카페 대란, 디저트 주문하는 게 5성급 호텔 요리 먹는 것보다 힘들어요'라는 기사가 나오고 있음을, 사내 공지를 통해 확인했다.

영상에서는 **키오스크의 가격 카운트가 리코타 치즈 샐러드: 53억 원**까지 찍히고 있음을 확인했다.

아니... 내게 왜 이런 일이...  
호다닥 앉아서 부랴부랴 코드를 확인한 그는, 다음 코드를 읽었다. 

```js
class CafeOrderKiosk {
  constructor() {
    this.orders = [];
  }

  addOrder(product, size) {
    const updatedProduct= this.updateSize(product, size);
    this.showMoneyUpCount(updatedProduct, product.price);

    this.orders.push(updatedProduct);
  }
  
  updateSize(product, size) {
    product.changeSize(size);
  }

  showMoneyUpCount(product, nowPrice) {
    let now = nowPrice;

    if (product?.price >= nowPrice) {
      while (product?.price !== now) {
        now -= 1;
        this.showMoneyUpAnimation(); // 돈이 1부터 내려가는 것을 화면에서 보여준다.
      }
    } else {
      while (product?.price < now) {
        now += 1;
        this.showMoneyUpAnimation(); // 돈이 1부터 올라가는 것을 화면에서 보여준다.
      }
    }
  }

  showMoneyUpAnimation(nowPrice) {
    console.log(nowPrice)
  }
}
```

머리를 탁! 치며 좌절한 그는 다음과 같이 중얼거리며 고개를 숙였다.

> ...그동안 즐거웠다. 회사야...
> 난 이만 갈게...^^

## 원인: 저수준의 Coffee 객체에 의존한 CafeOrderKiosk

현재 `addOrder`에서는 다음과 같은 로직으로 전개하고 있다.

1. 상품과 사이즈를 입력받는다.
2. 사이즈를 업데이트하여 `updatedCoffee`를 만든다.
3. 달라진 금액만큼 1씩 더하거나 뺀 금액을 화면사에서 출력하는 기능을 `while`문으로 구현했다. (같으면 그냥 생략)
4. 오더에 추가한다.

얼핏 보면 정상 기능 같다. 결국 사이즈가 업데이트 되면 애니메이션만 보여주면 되니!
그런데 다음이 문제다.

> `Product`가 과연 커피만 존재할까?

예컨대 `Product`에는 디저트도 있고, 차도 있고, 카페 특성마다 수많은 상품들이 존재한다.

이 상품들에 과연 `SizeUp`의 기능은 공통적인 특성일까?  
따라서 이 설계는 `Coffee`에 지극히 의존적인 로직인 것이지, 그 상위 객체인 `Product`에 의존적이지 않다.

이를 타입스크립트 등을 검토했다면 충분히 예견한 문제였지만, 우리의 개발자 D는 ~~열심히 꿀 빠느라~~ 이를 간파하지 못한 것이다.

결과적으로 리코타 치즈 샐러드를 고른 유저는 다음에서 무한 루프가 걸린 것이다.

```js
showMoneyUpCount(product, nowPrice) {
  let now = nowPrice;

  if (product?.price >= nowPrice) {
    while (product?.price !== now) {
      now -= 1;
      this.showMoneyUpAnimation(); // 돈이 1부터 내려가는 것을 화면에서 보여준다.
    }
  } else {
    while (product?.price < now) {
      now += 1;
      this.showMoneyUpAnimation(); // 돈이 1부터 올라가는 것을 화면에서 보여준다.
    }
  }
}
```
샐러드에서는 현재 사이즈가 없기 때문에 `undefined`를 받았다고 가정하자.
그러면 결과적으로 `product`는 `changeUpSize` 메서드로 인해  undefined가 나오게 될 것이다.


## 해결 방법: 고수준 모듈에 의존하도록.

이제 `Product`라는 고수준 모듈에서 추상화시킨 것들을 받도록 하면 어떨까?  
바로 다음과 같이 말이다.

```js
class Product {
  constructor({ name, price }) {
    this.name = name;
    this.price = price;
  }

  get isSizable() {
    return 'size' in this;
  }
}

class Sizable extends Product {
  constructor({ name, price, size = 'tall' }) {
    super({ name, price });
    this.size = size;
  }

  changeSize(size) {
    this.size = size
  }
}

class Coffee extends Sizable {
  constructor({ name, price, size = "tall" }) {
    super({ name, price, size })
  }
}
```

모든 상품들은 이제 `Product`로부터 상속이 될 것이고, `isSizable`을 통해 사이즈 업이 가능한지 확인할 수 있게 됐다.

고로, 키오스크에서는 이제 `isSizable`인 것들만 변경 로직을 수행한다면, `while` 문으로 인한 무한루프로 앱이 잘못되는 현상이 걸리지 않는 것이다.

따라서 최대한 어떤 특정 객체의 상태와 동작이 저수준 모듈에 의존하지 않도록 해서는 안 된다.  
이는 고수준 모듈로 추상화하여 언제든지 변경 가능한 파라미터에 대해서도 유연하게 대응할 수 있도록, 의존성을 최소화해야 한다.