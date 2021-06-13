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
