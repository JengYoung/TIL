function makeObj(idx) {
  return { a: idx * 1, b: idx * 2};
};

const { a, b } = makeObj(3);
let i = 1;
while(a < 10 && b < 20) {
  const { a, b } = makeObj(i++)
  console.log(a, b)
  console.log(a < 10 && b < 20)
}
console.log(a, b)