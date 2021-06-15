function square(num) {
    return num * num
}
console.dir(square) // 함수 객체 내부 확인
console.log(Object.getOwnPropertyDescriptors(square))

console.log(Object.getOwnPropertyDescriptor(square, '__proto__')) // undefined

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__')) // undefined


function multiply(x, y) {
    
    const iterator = arguments[Symbol.iterator]();

    // next 메서드 호출 -> iterable 객체 arguments를 순회
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

    return x * y;
};

multiply(1,2,3)



const obj =  { a: 1 };

console.log(obj.__proto__ === Object.prototype); // true

console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('__proto__')); // false