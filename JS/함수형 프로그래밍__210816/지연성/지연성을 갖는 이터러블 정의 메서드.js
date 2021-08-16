const curry = f => (a, ..._) => _.length 
    ? f(a, ..._) // a라는 인자를 받았고 만약 뒤에 인자들이 있다면 일단 그 인자들이 끝날때까지 함수 연산
    : (..._) => f(a, ..._) // 다음 인자를 받아서, 함수를 만들고 끝낸다.

// 인자들을 다 받은 다음, 인자들을 배열로 만들었을 때, 이전에 이루어졌던 a라는 이터러블에 배열의 함수들을 순회하여 연산을 시킴.
const go = (...args) => reduce((a, f) => f(a), args);

// 호출 시점에서 받은 ...as 인자들을 먼저 함수에서 돌리고, 그 다음 차례대로 go(순서대로 함수들을 순회)시킴.
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const map = curry((cb, iter) => {
    let res = [];
    for (const i of iter) {
        res.push(cb(i));
    };
    return res;
})

const filter = curry((cb, iter) => {
    let res = [];
    for (const i of iter) {
        if (cb(i)) res.push(i);
    };
    return res;
});

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
L.map = function *(f, iter) {
    for (const a of iter) {
        yield f(a);
    }
}


// L.filter = function *(f, iter) {
//     iter = iter[Symbol.iterator]();
//     let cur;
//     while(!(cur = iter.next()).done) {
//         const a = cur.value;
//         if (f(a)) yield a;
//     }
// };
L.filter = function *(f, iter) {
    for (const a of iter) {
        if (f(a)) yield a;
    }
};

L.entries = function *(obj) {
    for (const k in obj) yield [k, obj[k]];
};

const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === l) return res;
    };
});

const join = curry((sep = ',', iter) => {
    reduce((a, b) => `${a}${sep}${b}`, iter);
});
