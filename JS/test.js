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