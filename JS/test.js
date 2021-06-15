// const person = {
//     // 데이터 프로퍼티
//     firstName: 'Jaeyoung',
//     lastName: 'Hwang',

//     get fullName() {
//         return `${this.firstName} ${this.lastName}`
//     },

//     set fullName(name) {
//         [this.firstName, this.lastName] = name.split(' ');
//     }
// };

// // 데이터 프로퍼티를 통한 프로퍼티 값 참조
// console.log(person.firstName + ' ' + person.lastName);

// // 접근자 프로퍼티를 통한 프로퍼티 값 저장
// // 접근자 프로퍼티 fullName에 값 저장 시 setter 함수 호출
// person.fullName = 'Jengyoung Hwang';
// console.log(person) 
// // { firstName: 'Jengyoung', lastName: 'Hwang' }
// console.log(person.fullName)

// // 여기서 firstName은 데이터 프로퍼티.
// let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
// console.log(descriptor) // 데이터 프로퍼티 어트리뷰트

// // fullName은 접근자 프로퍼티
// descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
// console.log(descriptor) // 접근자 프로퍼티 어트리뷰트  

const dog = {};

Object.defineProperty(dog, 'name', {
    value: 'POMI',
    writable: true,
    enumerable: true,
    configurable: true,
});

Object.defineProperty(dog, 'age', {
    value: '9',
})

let descriptor = Object.getOwnPropertyDescriptor(dog, 'name'); 
console.log('name', descriptor);
descriptor = Object.getOwnPropertyDescriptor(dog, 'age');
console.log('age', descriptor);

// [name] (enumerable)
console.log(Object.keys(dog)); 

// ignored (writable: false)
dog.age = 10;

// ignored (configurable: false)
// delete dog.age; 

descriptor = Object.getOwnPropertyDescriptor(dog, 'age');
console.log('age', descriptor);

Object.defineProperty(dog, 'info', {
    // getter
    get() {
        return `${this.name}:${this.age}`
    },
    set(name) {
        [this.name, this.age] = name.split(' ')
    },
    enumerable: true,
    configurable: true,
});
console.log("I LOVE ", dog)
descriptor = Object.getOwnPropertyDescriptor(dog, 'info');
console.log(descriptor);

dog.info = 'BOBBY 3';
console.log(dog);


// const person = { name: 'Hwang Jaeyoung' };

// console.log(Object.isExtensible(person)); // true

// Object.preventExtensions(person);

// // person 객체는 확장이 금지된 객체
// console.log(Object.isExtensible(person)); // false

// // 프로퍼티 추가가 금지
// person.age = 20; // 무시. strict mode에서는 예외
// console.log(person);

// // 프로퍼티 추가는 금지되지만 삭제는 가능
// delete person.name;
// console.log(person);

// // 프로퍼티 정의에 의한 프로퍼티 추가도 금지
// // Object.defineProperty(person, 'age', { value: 20 });
// // TypeError: Cannot define property age, object is not extensible


// const person = { name: 'Hwang' };

// // person 객체는 밀봉된 객체가 X
// console.log(Object.isSealed(person)); // false

// // person 객체를 밀봉하여 프로퍼티 추가, 삭제, 재정의 금지
// Object.seal(person);

// // person 객체는 밀봉된 객체
// console.log(Object.isSealed(person));

// // 밀봉된 객체는 configurable이 false
// console.log(Object.getOwnPropertyDescriptors(person));

// /* 
//     {
//         name: { value: 'Hwang', writable: true, enumerable: true, configurable: false }
//     }
// */

// // 프로퍼티 추가 금지
// person.age = 20;
// console.log(person);

// // 프로퍼티 삭제 금지
// delete person.name;
// console.log(person);

// // 프로퍼티 값 갱신 가능
// person.name = 'young';
// console.log(person); // { name: "young" }

// // 프로퍼티 어트리뷰트 재정의 금지
// // Object.defineProperty(person, 'name', { configurable: true });
// // TypeError: Cannot redefine property name;


// const person = { name: 'Hwang Jaeyoung' };

// // person 객체는 밀봉된 객체가 X
// console.log(Object.isFrozen(person)); // false

// // person 객체를 밀봉하여 프로퍼티 추가, 삭제, 재정의 금지
// Object.freeze(person);

// // person 객체는 밀봉된 객체
// console.log(Object.isFrozen(person));

// // 밀봉된 객체는 configurable이 false
// console.log(Object.getOwnPropertyDescriptors(person));

// /* 
//     {
//         name: { value: 'Hwang', writable: false, enumerable: true, configurable: false }
//     }
// */

// // 프로퍼티 추가 금지
// person.age = 20;
// console.log(person);

// // 프로퍼티 삭제 금지
// delete person.name;
// console.log(person);

// // 프로퍼티 값 갱신 가능
// person.name = 'young';
// console.log(person); // { name: "young" }

// // 프로퍼티 어트리뷰트 재정의 금지
// // Object.defineProperty(person, 'name', { configurable: true });
// // TypeError: Cannot redefine property name;

function deepFreeze(target) {
    if (target && typeof target === 'object' && !Object.isFrozen(target)) {
        Object.freeze(target);
        /*
            모든 프로퍼티를 순회하며 재귀적으로 동결
            Object.keys 메서드는 열거 가능한 프로퍼티 키를 배열로 반환
            forEach 메서드는 배열을 순회하며 콜백함수를 실행
        */
        Object.keys(target).forEach(key => deepFreeze(target[key]));
    }
    
    return target;
}

const person = {
    name: "Hwang",
    address: { city: 'Seoul' }
};

deepFreeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
console.log(person); // { name: 'Hwang', address: { city: 'Seoul' }}
