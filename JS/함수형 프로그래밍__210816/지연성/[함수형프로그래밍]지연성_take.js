const { log } = console;
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._); 
const reduce = curry((cb, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value
    }
    for (const a of iter) {
        acc = cb(acc, a);
    }
    return acc;
});
const L = {};
// 느긋한 range
L.range = function *(l) {
    // 전혀 실행된 것처럼 보이지 않음. 이는 평가를 최대한 지연시켰기 때문. 나중에 next 메서드로 호출해야만 평가가 됨.
    let i = -1;
    while (++i < l) {
        yield i;
    }
};

const go = (...args) => reduce((a, f) => f(a), args);
const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};
/*
    이터러블을 따르고 있고, 이터러블을 받아서 이터러블 안의 값을 next를 통해 push만 함.

    지연성을 가지고 있으며
    프로토콜만 잘 따른다면 조합성 및 효율성 높은 코드를 만들 수 있다.
*/
const take = (l, iter) => {
    console.log(iter, l)
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === l) return res;
    }
    res;
}
range(100);
(() => {
    go(
        range(10000),
        take(5),
        reduce(add),
        log
    );

    go(
        L.range(10000),
        take(5),
        reduce(add),
        log
    )
})()