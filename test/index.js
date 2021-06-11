'use strict'


// 일반 함수 
function printThis() {
    console.log(this)
}
printThis();

// 메서드
const student = {
    name: 'jengyoung',
    say() {
        return this.name
    }
}
console.log(student.say())

// 생성자 함수
function Person(name) {
    this.name = name;
    console.log(this);
}


const me = new Person('jengyoung');


// 어떤 배열을 만드는 함수.
function makeArr(...args) {
    console.log(args) // = arguments
    return this.arr;
}

const arrObj = { arr: [1,2,3], makeArr } // this = arrObj (메서드를 호출한 객체)
console.log(arrObj.makeArr(1,2)); //argsArray에 대응

const objective = [6,7,8,9,10]
console.log(arrObj.makeArr.apply({ arr: objective }, [6,7,8,9])) 
// this = { arr: objective }, argsArray = [6,7,8,9]
console.log(arrObj.makeArr.call({ arr: objective }, 6,7,8,9)) 
// this = { arr: objective }, argsArray = 6,7,8,9

function Clock () {
    this.time = Date.now() // 2. nowTime.time = Date.now()
    setTimeout (function() { // 3. 응? 일반적인 함수 호출이네?
        console.log(this.time) // 4. undefined인 상태인데, 그냥 전역에 강제해야겠다~
    }, 1000)
};

const nowTime = new Clock(); // 1. 호출할 시 this 결정 -> this가 nowTime을 가리키게 함.