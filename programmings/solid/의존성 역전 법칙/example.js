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

    return this;
  }
}

class Coffee extends Sizable {
  constructor({ name, price, size = "tall" }) {
    super({ name, price, size })
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

const a = new Sizable({ name: 1, price: 2, size: 'grande' });
console.log(a.size)