const poo = "💩";
console.log(poo.charCodeAt(0).toString(16));
console.log(poo.charCodeAt(1).toString(16));
// 이모티콘은 4바이트므로 코드포인트가 2개씩으로 이루어짐
// 첫 번째 코드포인트가 Surrogate 문자가 됨.


const unicodePoo = "\uD83D\uDCA9";
console.log(unicodePoo);

console.log(poo === unicodePoo);

// 이모티콘은 4바이트므로 2칸 차지.
console.log(poo.length);

// 알파벳이든 한글이든 2바이트로 읽힘.
console.log("한글".length);