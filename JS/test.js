'use strict'
const person = {
    name: 'Jaeyoung',
    greeting: function() {
        console.log(`${name}: Hello!`)
    }
};

console.log(typeof person);
console.log(person);


function makeObj () {
    return {
        this: 'is',
        Object: 'literal'
    }
}
const whatIsThis = makeObj();
console.log(whatIsThis);


console.dir(add)
console.dir(sub)
console.log(add(2,5))

function add(x, y) {
    return x + y;
};

var sub = function(x, y) {
    return x - y; 
}

console.log(sub(2,5))


function repeat(n, f) {
    for (var i = 0; i < n; i++) {
        f(i)
    }
}

var logAll = function(i) {
    console.log(i);
}

// 반복 호출할 함수를 인수로 전달
repeat(5, logAll); // 0 1 2 3 4

var logOdds = function (i) {
    if (i % 2) console.log(i);
};
console.log("---")
repeat(5, logOdds);

var count = 0;
function increase2() {
    return ++count;
}
console.log("---")
console.log(increase2());
console.log(increase2());



var count = 0;

// 이는 순수함수다. 그저 어떤 것들이 들어와도, 1을 더하기 때문.
function increase(n) {
    return ++n;
}
console.log("---")
// count = increase(count);
console.log(increase(count)); // 1
console.log(increase(count)); // 1
console.log(increase(count)); // 1