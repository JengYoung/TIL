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