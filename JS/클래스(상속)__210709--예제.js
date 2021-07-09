// class Animal {
//     constructor(age, weight) {
//         this.age = age;
//         this.weight = weight;
//     }
//     eat() {
//         return 'Jo...JohnMatteng ! X)';
//     }
//     move() {
//         return 'Do.... DomHwangChya !';
//     }
// }

// // 상속을 통해 Animal class 확장

// class Bird extends Animal {
//     fly() {
//         return 'Annyunghi Gyeseyo Yeoreoboon!';
//     }
// }

// const pensu = new Bird(3, 92);

// console.log(pensu);
// console.log(pensu instanceof Bird);
// console.log(pensu instanceof Animal);

// console.log(pensu.eat());
// console.log(pensu.move());
// console.log(pensu.fly());

const Animal = (function () {
    function Animal(age, weight) {
        this.age = age;
        this.weight = weight;

        Animal.prototype.eat = function () {
            return 'eat';
        };
        Animal.prototype.move = function () {
            return 'move';
        };
    }
    return Animal;
}());

// Animal 생성자 함수를 상속하여 확장한 Bird 생성자 함수
const Bird = (function () {
    function Bird() {
        // Animal 생성자 함수에게 this와 인수를 전달하면서 호출
        Animal.apply(this, arguments);
    }
    
    //Bird.prototype을 Animal.prototype을 프로토타입으로 갖는 객체로 교체
    Bird.prototype = Object.create(Animal.prototype);
    Bird.prototype.constructor = Bird;

    Bird.prototype.fly = function () {
        return 'fly';
    }

    return Bird;
}());

const bird = new Bird(1, 5);
console.log(bird);
console.log(bird.eat());
console.log(bird.move());
console.log(bird.fly());




/**
 * 동적 상속
 */

function Base(a) {
    this.a = a;
}


class Derived extends Base {};

const derived = new Derived(1);
console.log(derived);

/**
 * super keyword
 * */ 

class SuperClass {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

// sub class
class SubClass extends SuperClass {
    // constructor(...args) { super(...args) }
    constructor(a, b, c) {
        super(a, b);
        this.c = c;
    }
}

const subClass = new SubClass(1, 2, 3);
console.log(subClass);




class SuperMethod {
    constructor(singer, song) {
        this.singer = singer;
        this.song = song;
    }
    getSong() {
        return `${this.singer}: ${this.song}`;
    }
}

class SubMethod {
    getSong() {
        // __super -> SuperMethod.prototype 참조
        const __super = Object.getPrototypeOf(SuperMethod);
        return `${__super.getSong.call(this)}`
    }
    // 위의 코드는 다음과 같이 동작한다.
    // getSong() {
    //     return `${super.getSong()}`;
    // }
}





class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    toString() {
        return `width = ${this.width}, height = ${this.height}`;
    }
}

class ColorRectangle extends Rectangle {
    constructor(width, height, color) {
        super(width, height);
        this.color = color;
    }
    toString() {
        return super.toString() + `, color = ${this.color}`
    }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle); 

console.log(colorRectangle.getArea());
console.log(colorRectangle.toString());



/**
 * 표준 빌트인 생성자 함수 확장
 * */ 


class ArrExample extends Array {
    // 만약 Array에서 생성한 인스턴스를 반환하게 하고 싶을 경우 정적 접근자 프로퍼티 추가 (모든 메서드가 Array 타입 인스턴스를 반환하도록 함)
    static get [Symbol.species]() { return Array; }
    // 중복된 배열 요소 제거 후 반환
    uniq() {
        // 맞다. 자기 자신의 인덱스를 탐색할 때에는 맨 처음 인덱스부터 조회하는데, 이에 따라 만약 다르면, 앞에 이미 중복된 게 존재한다는 뜻.
        return this.filter((v, i, self) => self.indexOf(v) === i);
    }
    // 모든 배열 요소의 평균 구함
    average() {
        return this.reduce((pre, cur) => pre + cur, 0) / this.length;
    }
}

const arr = new ArrExample(3, 1, 2, 1);
console.log(arr);

console.log(arr.uniq());
console.log(arr.average());

console.log(arr.uniq() instanceof ArrExample)
console.log(arr.uniq() instanceof Array)

// 만약 Array 인스턴스를 반환하게 된다면, average 메서드 호출 불가 (ArrExample 메서드이기 때문)
// console.log(arr.uniq().average())