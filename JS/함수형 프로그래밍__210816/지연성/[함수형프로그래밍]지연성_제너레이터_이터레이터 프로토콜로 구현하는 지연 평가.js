/*
    평가를 최대한 미룬다!

    값을 만드는 걸 최소화하고 연산을 최대한 줄이는 아이디어.

    과거에는 이러한 것이 가능한 프로토콜 기반이 있지 않았음.

    별개의 연산이 많이 추가되어야 했었는데(비공식적이었기에 호환성이 떨어졌음.) 이제는 프로토콜화되어 지연 평가나 코드의 평가를 미루는 코드를 값으로 다루는 프로그래밍을 할 때 더 공식적인 자바스크립트 일반 값으로써 구현이 가능해짐

    서로 다른 라이브러리, 함수들이 가장 안전한 조합성이나 합성성들을 가져갈 수 있음.

    이터러블 중심 프로그래밍, 리스트 중심 프로그래밍, 컬렉션 중심 프로그래밍.

    - map filter reduce, take 기반 구현.
    이터러블 중심 프로그래밍 시 어떻게 지연성을 구현할 수 있으며, 지연성에 대해 공식적인 값으로써 공식을 만들어가는지를 살펴 봄.
*/
const { log } = console;

const curry = cb => (a, ..._) => _.length ? cb(a, ..._) : (..._) => cb(a, ..._);
const map = curry((cb, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(cb(a))
    }
    return res;
})
const filter = curry((cb, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur = iter.next()).done) {
        const a = cur.value;
        if (cb(a)) res.push(a)
    }
    return res;
})
const reduce = curry((cb, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }
    let cur;
    while(!(cur = iter.next()).done) {
        const a = cur.value;
        acc = cb(acc, a)
    }
    return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};
/*
    L.map
    평가 순서를 달리 조작할 수 있는 준비가 되어있는 이터레이터를 반환하는 제너레이터 함수.
*/ 

const L = {};

L.map = function *(f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur = iter.next()).done) {
        const a = cur.value;
        yield f(a);
    };
};

L.filter = function *(f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur = iter.next()).done) {
        const a = cur.value;
        if (f(a)) yield a;
    }
};

L.entries = function *(obj) {
    for (const k in obj) yield [k, obj[k]];
};


const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while(!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(a);
        if (res.length === l) return res;
    }
});
/**
 * 평가가 없는 함수형 프로그래밍의 이점.
 */
// (() => {
//     let it = L.map(a => a + 10, [1, 2, 3]);
//     log([...it])
// })();
// (() => {
//     const it = L.filter(a => a % 2, [1, 2, 3, 4]);
//     log(it.next());
//     log(it.next());
// })();
(() => {
    go(range(10), map(n => n + 10), filter(n => n % 2), take(3), log)
})();

/**
 * 
 * 
 * 1. take한테 먼저 들어감. 
 * 2. iter는 반환된 이터레이터를 호출하는데, 반환된 이터레이터는 또 반환된 이터레이터를 반환하므로 그대로 쭉 갖고 있는다.
 * 3. iter.next()를 했을 때 그 안으로 들어가지 않고  filter로 들어가게 된다. 
 * 4. 왜 그럴까? 지연평가에 있다/ L.range는 최대한 미룬다. 따라서 일단 이터레이터를 반환해놓는다. 그리고 map도 이터레이터를 반환만 해놓는다. 
 * 또 filter도 반환만 해놓은 상태인데, 지금이제 next를 통해 호출이 된 상태인 것이다.
 * 5. 즉, 가로로 진행되는 것이 아닌, 코드의 세로로 진행되는 형태이다!
 * 
 * 이러한 방법의 장점은, 결국 원하는 결과만 만들어내고 끝낸다는 것.
 * 따라서 그 과정이 무한 수열이 포함되어도, 최적의 결과 탐색만 해내고 끝내기 때문에 오류가 나지 않는다.
 */

/**
 * 
 * 결합 법칙
 * 사용하는 데이터가 무엇이든지
 * 사용하는 보조 함수가 순수함수라면 무엇이든지
 * 아래와 같이 결합하면 둘 다 결과가 같음
 * [[mapping, mapping],[filtering, filtering],[mapping, mapping]]
 * [[mapping, filtering, mapping],[mapping, fiiltering, mapping]]
 */

/* 
    지연 평가의 장점: 

    정해진, 약속된 값이 아니라 전혀 다른 형태의 규약들을 만들어서 해당하는 라이브러리 안에서만 지연 평가를 구현한 과거와 달리, 공식적인 값을 통해 함수와 함수가 실제 리턴 값을 통해서
    자바스크립트와 개발자가 약속된 것을 가지고 만들 수 있게 됨.
    지연성을 다루는 것은 자바스크립트의 고유한 약속에 의해 구현되고 합성 및 동작할 수 있다. 이러한 방식으로 구현된 지연성은 서로 다른 라이브러리 및 함수에서도 약속된 일반 값(기본 값, 객체)로 소통되기 때문에 조합성 및 안전성이 높다.
*/ 

/**
 * reduce, take
 * map이나 filter: 이터러블한 값, 배열의 안쪽에 있는 원소들에 함수들을 합성하는 역할
 * reduce, take = 이터러블, 배열같이 안쪽 값을 꺼내서 더한다거나하는 식으로, 값을 유지시키는 것이 아닌 값을 꺼내서 깨뜨리는 역할. 이는 최종적으로 결과를 만드는 함수라 볼 수 있다. 
 * reduce는 연산의 시작점을 알리는 역할. 
 * 함수들을 만들 때 map, filter를 반복하다가 특정 지점에서 reduce를 통해서 깨뜨려서 연산을 시키고 함수를 종료한다거나, 그 다음 로직을 만든다는 식으로 중간 연산을 시작하는 그런 역할을 한다고 볼 수 있음.
 * 항상 생각할 때도 a -> b를 만들 때 a를 받아서 map, filter 반복하다가 reduce로 어떻게 끝낼지 고민하면 좋다.
 * take도 값을 2개만 yield하기로 약속할 수도 있지만 
 * take같은 함수는 실제로 몇 개로 떨어질지 모르는 배열에서 특정 개수로 축약 및 완성짓는 성질이 있기 때문에 지연성을 가지고 유지시키기 보다는 테이크한 시점에 연산이 이루어지는 것이 더 확실하고 좀 더 편리하다고 할 수 있다.
 */

(() => {
    const join = curry((sep, iter) =>
        reduce((a, b) => `${a}${sep}${b}`, iter)
    );
    // 객체로부터 url의 queryString을 만드는 queryStr함수 만들기
    const queryStr = pipe(
            Object.entries,
            map(([key, value]) => `${key}=${value}`),
            // reduce((a, b) => `${a}&${b}`),
            join('&')
        );
    // const queryStr = obj => go(
    //     obj,
    //     Object.entries,
    //     map(([key, value]) => `${key}=${value}`),
    //     reduce((a, b) => `${a}&${b}`)
    // );
    log(queryStr({ limit: 10, offset: 10, type: 'notice' }));

    function *a() {
        yield 10;
        yield 10;
        yield 10;
        yield 10;
    }
    // 조합성이 높다. 기존 것은 배열만 가능하지만, 이건 이터러블만 따라주면 된다. 또한 이터레이터를 반환하므로 지연 평가가 가능하다. 
    log(join(' - ', a()));

    // 클래스로 추상화하는 것보다 훨씬 유연한 join.
    // 연산을 다루는 재밌는 기법도 활용이 가능.
    // 연산을 맞춰 깨뜨린 결과를 주는 게 아닌 해당하는 함수를 적용하기로 약속, 준비된, 미뤄진 결과를 조인에게 던져줘도 됨.
    // 위에서 내려주는 값이 iterator여도 되기 때문에 
})()