const { log } = console;
const reduce = (cb, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value
    }
    for (const a of iter) {
        acc = cb(acc, a);
    }
    return acc;
}
const add = (a, b) => a + b;
const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};
(() => {
    // range

    
    log(range(5));
    log(range(2));
    
    // 여기서 실행했을 때 이미 배열이 만들어짐. 완전히 평가가 되었음.
    let list = range(4);
    // console.log(list)
    
    // log(reduce(add, list));
})();

(() => {
    const L = {};
    // 느긋한 range
    L.range = function *(l) {
        // 전혀 실행된 것처럼 보이지 않음. 이는 평가를 최대한 지연시켰기 때문. 나중에 next 메서드로 호출해야만 평가가 됨.
        let i = -1;
        while (++i < l) {
            // log(i, 'L.range')
            yield i;
        }
    };
    // list 현재 이터러블. 안에서 이터러블을 이터레이터로 만든 다음 하나씩 조회하며 결과.
    let list = L.range(4);
    // log(i, list); // 여기까지 실행했을 때의 내부.
    // log(reduce(add, list))

    function test(name, time, f) {
        console.time(name);
        while (time--) f();
        console.timeEnd(name);
    }

    test('range', 10, () => reduce(add, range(1000000)))
    test('L.Range', 10, () => reduce(add, L.range(1000000)))
})();

(() => {
    console.log("___________________________________")
    
})()