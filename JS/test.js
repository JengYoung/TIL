// const person = new Object();

// person.name = 'Hwang';
// person.greeting = function() {
//     console.log(`Hi! ${this.name}`)
// };

// console.log(person);
// person.greeting();


// function Circle(radius) {
//     this.radius = radius;
//     this.getDiameter = function() {
//         return 2 * this.radius;
//     };

//     return { name: 'jaeyoung'};
// };

// const circle = new Circle(1);

// console.log(circle)


// function foo() {}


// foo.prop = 10;

// foo.method = function() {
//     console.log(this.prop);
// }
// foo.method() // 10

// function foo () {}
// const bar = function() {};

// const baz = {
//     x: function () {}
// };

// console.log(new foo())
// console.log(new bar())
// console.log(new baz.x());

// const arrow = () => {}; 

// // new arrow()// Type Error! (non-constructor)

// const obj = {
//     x() {}
// };

// // new obj.x(); // Type Error! (non-constructor)

// function add (x,y) {
//     return x + y;
// };

// let inst = new add();
// console.log(inst)

function Circle(radius) {
    // if not call by using new operator -> undefined
    if (!new.target) {
        return new Circle(radius);
    }
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

const circle = Circle(5);
console.log(circle.getDiameter())

const str = String(123);
console.log(str, typeof str);

const num = Number('123');
console.log(num, typeof num);

const bool = Boolean('true');
console.log(bool, typeof bool);