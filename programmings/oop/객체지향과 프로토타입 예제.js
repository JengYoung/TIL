// const person = {
//     name: "젱영",
//     company: "집",
//     move() {
//         console.log(`내가 ${this.company}으로 사라져 볼게!`)
//     },
// };

// console.log(person.name);
// console.log(person.company);
// person.move()


function Person(name) {
    this.name = name;
}
Person.prototype.getName = function() {
    return this.name || "재영"
}

function Korean(name) {
    Person.apply(this, arguments)
}

Korean.prototype = new Person();
Korean.prototype.setName = function(name) {
    this.name = name;
}

const hwang = new Person("황재영");
const jengyoung = new Korean("대한민국 건아 황재영");
console.log(hwang.getName());
console.log(jengyoung.getName());
jengyoung.setName("재영재영");
console.log(jengyoung.getName());


const jaeyoung = {
    name: "황재영",
    getName() {
        return this.name;
    }
}

const young = Object.create(jaeyoung);
young.name = "젱영";

console.log(jaeyoung.getName());
console.log(young.getName());
console.log(jaeyoung.__proto__);
console.log(young.__proto__);