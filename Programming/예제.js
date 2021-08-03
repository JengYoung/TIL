function StringNumber(string) {
    this.string = string;
}
StringNumber.prototype.calculate = function() {
    this.sum = 0;
    for (let i = 0; i < this.string.length; i += 1) {
        this.sum += this.string[i] - "0";
    }
};
function Printer(result) {
    this.result = result;
}
Printer.prototype.log = function() {
    console.log(this.result);
}
const stringNumber = new StringNumber("12345");
stringNumber.calculate();
const printer = new Printer(stringNumber.sum);
printer.log();

// const stringNumber = "12345";
// let sum = 0;
// for (let i = 0; i < stringNumber.length; i++) {
//     sum += stringNumber[i] - "0";
// }
// console.log(sum)

// console.log(stringNumber.split('').map(x => parseInt(x)).reduce((x, y) => x + y, 0))