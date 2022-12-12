# 인터페이스 분리 원칙

## 배경: 인터페이스

어떤 기능을 구현하지 않고 명칭, 파라미터, 반환 타입을 서술만 한 코드이다.  
예컨대, 타입스크립트에서 인터페이스란 다음과 같다.

```ts
interface IParams {
  param1: string;
  param2: number;
}
```

## 정의: 덩치 큰 인터페이스를 작게 나누자!

클라이언트는 자신이 이용하지 않는 메서드에 의존해서는 안 된다.  
예컨대 프린터에서 갑자기 마이크 기능을 추가했다고 하자.  
굉장히 어울리지 않을 뿐더러, 저 마이크 기능이 없어지면 결합도가 높을 수록 추가로 손을 봐야 할 것들이 매우 많아진다.  

따라서, 인터페이스를 최대한 분리하자는 원칙이다.  
좀 더 정확히 말하자면, **기능이 많은 인터페이스를 더 작게 응축시킨 조각으로 나누어야 한다**는 의미이다.

## 예제: 개발자 D, 신사업을 담당하다.

이제 개발자 D는 엄청난 수모들을 겪고 신사업에 관한 큰 프로젝트를 맡게 되었다.  
최근 디저트의 유행에 따라 디저트 메뉴에 관한 솔루션을 개발하게 된 것이다.
수많은 역경을 딛고 이겨낸 개발자 D, 이제는 어려운 없을 줄 알았다.

> 그때부터였어요. 항상 개발이 무서워진 게...

### 디저트들을 개발해주세요!

매우 간단했다. 결국 샐러드랑 빵에 대한 객체를 만들어달란 거였다.  
주어진 기획 대로 객체를 만드는 건 이제 일도 아니었다.

```js
class Dessert {
  constructor({ name, price, ingredients, makingDuration }) {
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
    this.makingDuration = makingDuration;
  }

  cook() {
    console.log('조리합니다!');
  }
  
  bake() {
    console.log('굽습니다!');
  }
}

class Bread extends Dessert {
  constructor({ name, price, ingredients, makingDuration }) {
    super({ name, price, ingredients, makingDuration });
  }
}

class Salad extends Dessert {
  constructor({ name, price, ingredients, makingDuration }) {
    super({ name, price, ingredients, makingDuration });
  }
}
```

그래서 30분만에 개발을 끝내고, 대충 일하는 척을 하며 오늘도 칼퇴하는 ~바람직한~ 개발자 D.  


### 응? E! 도대체 디저트 메뉴 객체를 어떻게 만든 거야!

간만에 꿀잠을 잔 D. 오늘따라 하늘이 맑아 보였다.  
이렇게 여유를 느낄 때마다 자신이 성장했음을 느낀다. 개발이 재밌다.

그렇게 회사에 들어선 D. 그런데... 후배 E의 상태가 심상치 않다.  
가뜩이나 생초보여서 불안한데, 진땀을 흘리며 거의 온 옷이 땀으로 범벅이었다.

우리의 고수 D는 E의 어깨를 두드리며, 다음과 같이 멋진 선배의 모습을 보여줬다.  
"무슨 문제 있어?"

그러자 E는 울먹이면서 다음과 같이 말했다.
"이 로직이 분명히 맞는데... 메뉴에서... 샐러드가 나와요... 저는 아무래도 개발을 하면 안되는 것 같아요. 이런 것도 못 이해하는데... 회사 그만두겠습니다..."


```js
class DessertMenus {
  constructor() {
    this.menus = [];
  }

  add(menu) {
    if (this.menus.some(v => v.name === menu.name)) {
      this.udpate(menu);
      return;
    }

    this.menus.push(menu);

    return this;
  }

  remove(menu) {
    this.menus = this.menus.filter(v => v.name !== menu.name)
  }

  udpate(menu) {
    let flag = false;
    this.menus = this.menus.map(v => {
      if (v.name === menu.name) {
        flag = true;
        return menu;
      }

      return v;
    });

    return flag;
  }

  showBread() {
    const breads = [];
    this.menus.forEach(menu => {
      if ('bake' in menu) {
        breads.push(menu)
      }
    })

    return breads;
  }
}
```

그때서야 문제점을 알아차린 D, 이마를 툭 치며 다음과 같이 말한다.
'아! 내가 코드로 가스라이팅을 했구나!'  


## 해결 방법: 인터페이스를 작게 나눈다.

E가 좀 더 어렵게 코드를 작성한 것은 맞다. 
예컨대 `cook`으로 찾는 것이 아니라 클래스의 카테고리를 지정하거나, 생성자명을 통해 찾았으면 더욱 명료했을 것 같다.

그런데, 엄연히 말하자면 이는 디저트 객체를 설계한 사람의 잘못이 가장 크다.  
`bake`가 상위에 위치했던 게 바람직했을까?  
디저트는 빵만 있는 것이 아니다. 샐러드도 있을 수 있고, 때에 따라서는 나중에 쿠키 등이 개발될 수도 있는 것이다.  
따라서 이는 다음과 같이 분리되어야 했을 것이다.

```js
class Dessert {
  constructor({ name, price, ingredients, makingDuration }) {
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
    this.makingDuration = makingDuration;
  }  
}

class Bread extends Dessert {
  constructor({ name, price, ingredients, makingDuration }) {
    super({ name, price, ingredients, makingDuration });
  }

  bake() {
    console.log('굽습니다!');
  }
}

class Salad extends Dessert {
  constructor({ name, price, ingredients, makingDuration }) {
    super({ name, price, ingredients, makingDuration });
  }

  cook() {
    console.log('조리합니다!');
  }
}

class DessertMenus {
  constructor() {
    this.menus = [];
  }

  add(menu) {
    if (this.menus.some(v => v.name === menu.name)) {
      this.udpate(menu);
      return;
    }

    this.menus.push(menu);

    return this;
  }

  remove(menu) {
    this.menus = this.menus.filter(v => v.name !== menu.name)
  }

  udpate(menu) {
    let flag = false;
    this.menus = this.menus.map(v => {
      if (v.name === menu.name) {
        flag = true;
        return menu;
      }

      return v;
    });

    return flag;
  }

  showBread() {
    const breads = [];
    this.menus.forEach(menu => {
      if ('bake' in menu) {
        breads.push(menu)
      }
    })

    return breads;
  }
}

const dessertMenus = new DessertMenus()
  .add(new Bread({ name: '크림치즈 베이글', price: 3000, ingredients: ['크림 치즈', '밀가루'], makingDuration: 60 * 1000 * 60}))
  .add(new Bread({ name: '블루베리 베이글', price: 2500, ingredients: ['블루베리', '밀가루'], makingDuration: 60 * 1000 * 60}))
  .add(new Salad({ name: '라코타 치즈 샐러드', price: 7000, ingredients: ['리코타치즈', '양상추', '베이비채소', '방울토마토', '블랙올리브', '슬라이스아몬드', '발사믹글레이즈'], makingDuration: 60 * 1000 * 5}));

console.log(dessertMenus.showBread()) // Array(2) - 크림치즈 베이글, 블루베리 베이글
```

자, 이제 각자가 필요한 메서드가 정확히 분리되었다.  
각 하위 클래스는 더이상 상위 클래스로 인해 불필요한 메서드를 갖고 있지 않아도 된다.  
따라서 나중에는, 오버라이드를 하지 않아 일어날 수 있는 오류의 늪에서, 좀 더 자유로워질 수 있는 것이다.