// // 'use strict' // strict mode에서는 일반 함수 내부의 this에는 undefined가 바인딩된다. 그 이유는, this는 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다고 판단하기 때문이다.

// console.log("--------------------------------")

// function Say(name) {
//     this.name = name;
//     this.greeting = function () {
//         console.log(`Hello, ${this.name}`)
//     }
// };
// // 일반 함수 호출
// // window 전역 객체에 this가 바인딩된다.
// const young1 = Say('jengyoung')
// // console.log(window.greeting());

// // 메서드 Case
// // young2 객체에 this가 바인딩된다.
// const young2 = {
//     Say
// };
// young2.Say('Jengyoung');
// young2.greeting();


// // 생성자 함수 Case
// // 새롭게 생성된 young3 객체에 this가 바인딩된다.
// const young3 = new Say('Jengyoung'); 
// young3.greeting();



// function Clock () {
//     this.time = Date.now()
//     setTimeout (function() {
//         console.log(this.time)
//     }, 1000)
// };

// const nowTime = new Clock();


function makeArr(...args) {
    console.log(args) // = arguments
    return this.arr;
}
const arrObj = { arr: [1,2,3], makeArr } // this -> arrObj
console.log(arrObj.makeArr(1,2,3)); //argsArray에 대응

const objective = [6,7,8,9,10]
console.log(arrObj.makeArr.apply({ arr: objective }, null)) // this -> { arr: objective }, argsArray -> [6,7,8,9,10]
console.log(arrObj.makeArr.call({ arr: objective }, 6,7,8,9))

console.log(arrObj.makeArr.bind({ arr: objective }))

// function Clock () {
//     this.time = Date.now()
//     return setTimeout (function(cb) {
//         cb.bind(this), 1000
//     })
// };

// const cb = function() {
//     return `now time is: ${this.time}`
// }
// const nowTime = new Clock(cb)


// const arrowfunction = () => {
//     console.log("now", this)
// }
// arrowfunction();

// const add = (cb) => {
//     this.a = 10;
//     return cb.bind(this)();
// }

// const cb = function() {
//     return `result: ${this.a}`;
// }
// console.log(add(cb))

const date = new Date();
date.func = function () {
    console.log("now", this);
    let test = () => {
        console.log("before test: ",this);
    }    
    test()
    this.date = Date.now();
    test = function() {
        console.log("after test: ",this);
        const test2 = () => {
            console.log("test2 in test: ", this);
        }
        test2();
    }
    test()
}
// date.arrowFunc = () => {
//     console.log(this);
// }
date.func() // date에 바인딩
// date.arrowFunc() // window 객체 가리킴


// const person = (name) => {
//     this.name = name;
// }
// const p = new person('jaeyoung');
// console.log(p);

function Clock () {
    this.time = Date.now()
    function alertTime() {
        console.log(this.time)
    }
    setTimeout(alertTime, 1000)
};

const nowTime = new Clock();