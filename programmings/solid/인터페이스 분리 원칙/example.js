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

console.log(dessertMenus.showBread())