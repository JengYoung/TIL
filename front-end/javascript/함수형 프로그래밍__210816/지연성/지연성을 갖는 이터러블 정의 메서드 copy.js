"use strict"
const curry = f => (a, ..._) => _.length 
    ? f(a, ..._) // a라는 인자를 받았고 만약 뒤에 인자들이 있다면 일단 그 인자들이 끝날때까지 함수 연산
    : (..._) => f(a, ..._) // 다음 인자를 받아서, 함수를 만들고 끝낸다.

// 인자들을 다 받은 다음, 인자들을 배열로 만들었을 때, 이전에 이루어졌던 a라는 이터러블에 배열의 함수들을 순회하여 연산을 시킴.

const go = (...args) => reduce((a, f) => f(a), args);
// function go(arg, ...fs) {
//     return reduce((arg, f) => f(arg))(arg, fs);
// }
// 호출 시점에서 받은 ...as 인자들을 먼저 함수에서 돌리고, 그 다음 차례대로 go(순서대로 함수들을 순회)시킴.
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

// const map = curry((cb, iter) => {
//     let res = [];
//     for (const i of iter) {
//         res.push(cb(i));
//     };
//     return res;
// })

// const filter = curry((cb, iter) => {
//     let res = [];
//     for (const i of iter) {
//         if (cb(i)) res.push(i);
//     };
//     return res;
// });

const reduce = curry((cb, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    };
    for (const i of iter) {
        acc = cb(acc, i)
    };
    return acc;
});

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    };
    return res;
}
// const take = curry((l, iter) => {
//     let res = [];
//     iter = iter[Symbol.iterator]();
//     let cur;
//     while(!(cur = iter.next()).done) {
//         const a = cur.value;
//         res.push(a);
//         if (res.length === l) return res;
//     }
// });
// const take = curry((l, iter) => {
//     let res = [];
//     for (const a of iter) {
//         res.push(a);
//         if (res.length === l) return res;
//     };
// });
function take(limit) {
    return function* (iter) {
        for (const a of iter) {
            yield a;
            if (--limit === 0) break;
        }
    }
}

const join = curry((sep = ',', iter) => {
    reduce((a, b) => `${a}${sep}${b}`, iter);
});


/**
 * 지연 평가!
 */

const L = {};
L.range = function *(l) {
    let i = -1;
    while(++i < l) {
        yield i;
    };
};

// L.map = function *(f, iter) {
//     iter = iter[Symbol.iterator]();
//     let cur;
//     while (!(cur = iter.next()).done) {
//         const a =  cur.value;
//         yield f(a);
//     }
// }
// L.map = function(f) {
//     return function* (iter) {
//       for (const a of iter) yield f(a);
//     }
//   }
L.map = curry(function* (f, iter) {
    for (const a of iter) yield f(a);
});

// L.filter = function *(f, iter) {
//     iter = iter[Symbol.iterator]();
//     let cur;
//     while(!(cur = iter.next()).done) {
//         const a = cur.value;
//         if (f(a)) yield a;
//     }
// };
// L.filter = function (f) {
//     return function* (iter) {
//         for (const a of iter) if (f(a)) yield a;
//     }
// };
L.filter = curry(function* (f, iter) {
    for (const a of iter) if (f(a)) yield a;
});
const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter, takeAll));

L.entries = function *(obj) {
    for (const k in obj) yield [k, obj[k]];
};

const { log } = console;
const users = [
    { age: 32 },
    { age: 31 },
    { age: 37 },
    { age: 28 },
    { age: 25 },
    { age: 32 },
    { age: 31 },
    { age: 37 },
];

// (() => {
//     // 문제점: 하나의 결과만 빼는 것 같지만 모든 걸 돌고 있음. -> L.filter 사용하자!
//     const find = curry((f, iter) => go(
//         iter,
//         L.filter(a => (console.log(a), f(a))),
//         take(1),    
//         ([a]) => a
//     ));

//     // log(find(u => u.age < 30, users));


//     go(users,
//     L.map(u => u.age),
//     find(n => n < 30),
//     log);

// })();

// 이터러블 객체를 이터레이터 객체로 만들어서 사용하고 있기에 L.map도 가능
// log(L.map(a => a + 10, L.range(4)));

// const nmap = curry((f, iter) => go(
//     iter,
//     L.map(f),
//     take(Infinity),
// ));

// 이터러블 객체를 이터레이터 객체로 만들어서 사용하고 있기에 L.map도 가능
// log(nmap(a => a + 10, L.range()));
// log(nfilter(a => a % 2, L.range(4)));

const isIterable = a => a && a[Symbol.iterator];
L.flatten = function *(iter) {
    for (const a of iter) {
        if (isIterable(a)) {
            for (const b of a) yield b;
        } else {
            yield a;
        }
    }
}

var it = L.flatten([[1,2],3,4,[5,6],[7,8,9]]);
log([...it])

const flatten = pipe(L.flatten, takeAll, a => [...a]);
log(...flatten([[1,2],3,4,[5,6],[7,8,9]]))


L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = pipe(L.map, flatten)
var it = L.flatMap(map(a => a * a), [[1,2],[3,4],[5,6,7]]);
log([...it])
log(flatMap(map(a => a * a), [[1,2],[3,4],[5,6,7]]))
log(flatMap(range, map(a =>a + 1, [1,2,3])));


(() => {
    const users = [  
        { name: 'a', age: 21, family: [
            { name: 'a1', age: 53 },{ name: 'a2', age: 47 },
            { name: 'a3', age: 16 },{ name: 'a4', age: 15 }
        ] },
        { name: 'b', age: 24, family: [
            { name: 'b1', age: 58 },{ name: 'b2', age: 51 },
            { name: 'b3', age: 19 },{ name: 'b4', age: 22 }
        ] },
        { name: 'c', age: 31, family: [
            { name: 'c1', age: 64 },{ name: 'a2', age: 62 }
        ] },
        { name: 'd', age: 20, family: [
            { name: 'd1', age: 42 },{ name: 'd2', age: 42 },
            { name: 'd3', age: 11 },{ name: 'd4', age: 7 }
        ]}
    ];

    go(users, 
        L.map(u => u.family),
        L.flatten,
        L.filter(u => u.age < 20), // 나이가 미성년자
        L.map(u => u.age),
        take(3),
        a => [...a],
        log
    );
})()