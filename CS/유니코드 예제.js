const poo = "๐ฉ";
console.log(poo.charCodeAt(0).toString(16));
console.log(poo.charCodeAt(1).toString(16));
// ์ด๋ชจํฐ์ฝ์ 4๋ฐ์ดํธ๋ฏ๋ก ์ฝ๋ํฌ์ธํธ๊ฐ 2๊ฐ์ฉ์ผ๋ก ์ด๋ฃจ์ด์ง
// ์ฒซ ๋ฒ์งธ ์ฝ๋ํฌ์ธํธ๊ฐ Surrogate ๋ฌธ์๊ฐ ๋จ.


const unicodePoo = "\uD83D\uDCA9";
console.log(unicodePoo);

console.log(poo === unicodePoo);

// ์ด๋ชจํฐ์ฝ์ 4๋ฐ์ดํธ๋ฏ๋ก 2์นธ ์ฐจ์ง.
console.log(poo.length);

// ์ํ๋ฒณ์ด๋  ํ๊ธ์ด๋  2๋ฐ์ดํธ๋ก ์ฝํ.
console.log("ํ๊ธ".length);