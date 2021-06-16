// function Circle(radius) {
//     this.radius = radius;
// };

// Circle.prototype.getArea = function() {
//     return Math.PI * this.radius ** 2;
// }

// // 인스턴스 생성
// const circle1 = new Circle(1);
// const circle2 = new Circle(2);

// /* 
//     Circle 생성자 함수가 생성한 모든 인스턴스는 
//     부모 객체의 역할을 하는 프로토타입으로부터 getArea 메서드를 상속받는다.
//     모든 인스턴스는 하나의 메서드를 공유하게 된다.
// */

// console.log(circle1.getArea === circle2.getArea) // true
// console.log(circle1.getArea()); //3.141592653589793
// console.log(circle2.getArea()); //12.566370614359172

// const person = { name: 'Hwang Jaeyoung' };

// console.log(person.hasOwnProperty('__proto__')); // false

// console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// // { get: f, set: f, enumerable: false, configurable: true }

// // 모든 객체는 Object.prototype의 __proto__를 상속받아 사용
// console.log({}.__proto__ === Object.prototype); // true

// const parent = {}
// const child = {}

// child.__proto__ = parent;
// // parent.__proto__ = child; // TypeError: Cyclic __proto__ value

// // 프로토타입 체인의 종점 생성. (__proto__ 상속 불가)
// const obj  = Object.create(null);

// console.log(obj.__proto__); // undefined

// console.log(Object.setPrototypeOf(obj, {})) // null


// function Person(name) {
//     this.name = name;
// }

// const me = new Person('Jaeyoung');

// console.log(Person.prototype === me.__proto__);


// const obj = {}
// console.log(obj.constructor === Object)



// 2. Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출, 빈 객체 생성
// let obj = new Object();
// console.log(obj); // {}

// // 1. new.target이 undefined나 Object가 아닌 경우
// // 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성
// class Foo extends Object {}
// new Foo(); // Foo {}

// // 3. 인수가 전달된 경우에는 인수를 객체로 변환
// // Number 객체 생성
// obj = new Object(123);
// console.log(obj); // Number {123}


// // String 객체 생성
// obj = new Object('123');
// console.log(obj); // String {"123"}

// const obj = { x: 1 };

// // 객체 리터럴에 의해 생성된 obj는 Object.prototype을 상속받는다.
// console.log(obj.constructor === Object); // true
// console.log(obj.hasOwnProperty('x')); // true


// function Person(name) {
//     this.name = name;
// }

// //프로토타입 메서드
// Person.prototype.greeting = function() {
//     console.log(`Hi, I am ${this.name}!`)
// }

// const me = new Person('Jaeyoung');
// const you = new Person('Sunyoung');

// me.greeting();
// you.greeting();

// console.log(Object.prototype.hasOwnProperty.call(me, 'name'))


// function User(username) {
// 	if (!new.target) {
// 		return new User(username);
// 	}
// 	this.username = username;
// }

// const tester = User('jengyoung');
// console.log(tester) // { username: 'jengyoung' }

// const Person = (function () {
// 	// 생성자 함수
// 	function Person(name) {
// 		this.name = name;
// 	};

// 	Person.prototype.sayHello = function () {
// 		console.log(`Hi! My Name is ${ this.name }`)
// 	};

// 	return Person;
// }());

// const me = new Person('Hwang');

// me.sayHello = function () {
// 	console.log(`Hey! ${ this.name } ! Nice to meet you.`)
// };

// me.sayHello();

// const Person  = (function () {
// 	function Person(name) {
// 		this.name = name;
// 	}

// 	Person.prototype = {
// 		sayHello() {
// 			console.log(`Hi! My name is ${ this.name }`);
// 		}
// 	};

// 	return Person;
// }());

// const me = new Person('Hwang');

// console.log(me.constructor === Person);
// console.log(me.constructor === Object);

// function Person(name) {
// 	this.name = name;
// }
// const me = new Person('Hwanxg Jaeyoung');

// // 프로토타입으로 교체할 객체

// const parent = {
// 	constructor: Person,
// 	sayHello() {
// 		console.log(`Hi! Nice To Meet you, ${this.name}`)
// 	}
// };

// Person.prototype = parent;
// Object.setPrototypeOf(me, parent); // = me.__proto__ = parent;
// me.sayHello()
// console.log(Person.prototype === Object.getPrototypeOf(me))


// function Person(name) {
// 	this.name = name;
// }

// const me = new Person('Hwang Jaeyoung');

// const parent = {};
// Object.setPrototypeOf(me, parent);

// console.log(me instanceof Person);
// console.log(me instanceof Object);



// function isInstanceof(instance, constructor) {
// 	const prototype = Object.getPrototypeOf(instance);

// 	if (prototype === null) return false;

// 	return prototype === constructor.prototype || isInstanceof(proottype, constructor);
// }

// // 생성된 객체: 프로토타입 체인 종점
// let obj = Object.create(null);
// console.log(Object.getPrototypeOf(obj)) // null

// obj = Object.create(Object.prototype);
// console.log(Object.getPrototypeOf(obj) === Object.prototype)

// // obj -> Object.prototype -> null
// // obj === { x: 1 }

// obj = Object.create(Object.prototype, {
// 	x: { value: 1, writable: true, enumerable: true, configurable: true }
// });

// // 위 코드는 아래와 동일
// // obj = Object.create(Object.prototype);
// // obj.x = 1;
// console.log(obj.x); // 1
// console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// const myProto = { x: 10 };
// // 임의의 객체 직접 상속
// obj = Object.create(myProto);
// console.log(obj.x) // 10;
// console.log(Object.getPrototypeOf(obj) === myProto); // true

// //생성자 함수
// function Person(name) {
// 	this.name = name;
// }

// // obj = Person.prototype -> Object.prototype -> null;
// // obj = new Person('Hwang');

// obj = Object.create(Person.prototype);
// obj.name = 'Hwang';

// console.log(obj.name);
// console.log(Object.getPrototypeOf(obj) === Person.prototype);

// obj = Object.create(null);
// obj.a = 1;
// console.log(Object.getPrototypeOf(obj));
// console.log(Object.prototype.hasOwnProperty.call(obj, 'a'));
// // console.log(obj.hasOwnProperty('a'));

function Person(name) {
	this.name = name;
}
Person.staticProp = 'static prop';8
Person.staticMethod = function () {
    console.log('static method');
}

Person.staticMethod()

const me = new Person('JY');
// me.staticMethod()


function Foo() {}

//프로토타입 메서드
Foo.prototype.x = function () {
	console.log('x')
};

Foo.x = function() {
	console.log('xx');
}

Foo.prototype.x();
Foo.x();