// const array = [1,2,3]
// const { log } = console;
// log(Symbol.iterator in array); // true;
// log(Symbol.iterator in new Map()); // true;
// log(Symbol.iterator in new Set()); // true;
// log(Symbol.iterator in {}) // false;

// const iterator = array[Symbol.iterator]();
// console.log(iterator)
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());


// const iterable = [1,2,3];
// const iterator = iterable[Symbol.iterator]();

// for(;;) {
//     const res = iterator.next();
//     if (res.done) break;

//     const item = res.value;
//     console.log(item);
// }

const fibonacci = {
    [Symbol.iterator]() {
        let [pre, cur] = [0, 1];
        const max = 10;

        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return { value: cur, done: cur >= max };
            }
        };
    }
};

for (const num of fibonacci) {
    console.log(num);
}

const factorial = (limit) => {
    let prev = 1;
    let now = 0;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            now++;
            prev *= now;
            return { value: prev, done: now === limit + 1}
        }
    }
}
for (const f of factorial(10)) {
    console.log(f);
}

const iter = factorial(10);

for (const f of iter) {
    console.log(iter.next())
}
const products = [
    { name: '반팔티', price: 10000},
    { name: '긴팔티', price: 20000},
    { name: '핸드폰케이스', price: 15000},
    { name: '후드티', price: 30000},
    { name: '바지', price: 25000},
];
const { log } = console;
(() => {

    let names = [];
    for (const p of products) {
        names.push(p.name);
    }
    let prices = [];
    for (const p of products) {
        prices.push(p.price);
    }
    log(names, prices)
    /*
        map은 `log` names는 직접 명령을 일으켜서 외부 영역에 직접적으로 변화를 일으킴. 함수형 프로그래밍에서는 인자와 리턴 값으로 소통하는 것을 권장. 다른 메서드나 함수로 보내는 것이 아니라, 결과를 리턴해서 리턴된 값을 다시 개발자가 이후에 쓰도록 함.
    */
    const map = (cb, iter) => {
        let res = [];
        for (const value of iter) {
            res.push(cb(value));
        }

        return res;
    }

    log(map(p => p.name, products));
})();

(() => {
    const filter = (cb, iter) => {
        let res = [];
        for (const a of iter) {
            if (cb(a)) res.push(a);
        };
        return res;
    }
    // let over20000 = [];
    // for (const p of products) {
    //     if (p.price >= 20000) over20000.push(p);
    // }
    // log(...over20000);
    log(filter(item => item.price >= 20000, products));
})();

(() => {
    const nums = [1, 2, 3, 4, 5];
    const reduce = (cb, acc, iter) => {
        if (!iter) {
            iter = acc[Symbol.iterator]();
            acc = iter.next().value;
        }
        for (const a of iter) {
            acc = cb(acc, a);
        }
        return acc;
    }
    log(reduce((acc, cur) => acc + cur, nums))
    log(reduce((total, product) => total + product.price, 0, products));
})();

(() => {
    /*
        함수형 프로그래밍은 코드를 값으로 다룸.
        코드인 함수를 받아서 평가하는 시점을 원하는 대로 다룸.
    */
    const reduce = (cb, acc, iter) => {
        if (!iter) {
            iter = acc[Symbol.iterator]();
            acc = iter.next().value;
        }
        for (const a of iter) {
            acc = cb(acc, a);
        }
        return acc;
    }
    const go = (...args) => reduce((a, f) => f(a), args);
    go(0, a => a + 1, a => a + 10, a => a + 100, log);
})();

(() => {
    const reduce = (cb, acc, iter) => {
        if (!iter) {
            iter = acc[Symbol.iterator]();
            acc = iter.next().value;
        }
        for (const a of iter) {
            acc = cb(acc, a);
        }
        return acc;
    };
    const go = (...args) => reduce((a, f) => f(a), args);
    // ...as: f(0,1)에서 (0,1). 호출 시점에서 결국 또 받은 인자!(매개변수 자리잖아요?!)
    const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
    const f = pipe(
        (a, b) => a + b,
        a => a + 10,
        a => a + 100,
    );
    log(f(0, 1))
})();

(() => {
    
    // curry: 함수를 받아서 함수를 리턴하고 인자를 받아서 인자가 원하는 개수가 들어오면 받아들어왔던 함수를 나중에 평가시키는 방식.
    const curry = f => (a, ..._) => {
        // 그러니까 결국 첫번째 인자가 받는 게 여러 개면 그걸 시키고 아니면 그 뒤의 함수 인자들을 함수의 인자로 받겠다~는 거네.
        return _.length ? f(a, ..._) : (..._) => f(a, ..._); 
    }

    const add = (a, b) => a + b;
    const map = curry((cb, iter) => {
        let res = [];
        for (const a of iter) {
            res.push(cb(a));
        };
        return res; 
    });
    const filter = curry((cb, iter) => {
        let res = [];
        for (const a of iter) {
            if (cb(a)) res.push(a)
        };
        return res;
    });
    const reduce = curry((cb, acc, iter) => {
        if (!iter) {
            iter = acc[Symbol.iterator]();
            acc = iter.next().value;
        }
        for (const a of iter) {
            acc = cb(acc, a);
        }
        return acc;
    });
    const go = curry((...args) => reduce((a, f) => f(a), args));
    const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
    go(
        products,
        filter(p => p.price < 20000),
        map(p => p.price),
        reduce(add),
        log
    );
    const mult = curry((a, b) => a * b);
    log(mult(1)(1,2,3,4,5))

    const total_quantity = products => pipe(products,
        map(p => p.quantity),
        reduce((a, b) => a + b),
        );
    log(total_quantity(products))
})();

(() => {
    const products = [
        { name: '반팔티', price: 10000, quantity: 1, is_selected: true },
        { name: '긴팔티', price: 20000, quantity: 2, is_selected: false },
        { name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: true },
        { name: '후드티', price: 30000, quantity: 4, is_selected: false },
        { name: '바지', price: 25000, quantity: 5, is_selected: false },
    ];
    const add = (a, b) => a + b;

    const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._)
    const go = (...args) => reduce((a, f) => f(a), args);
    const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
    const map = curry((cb, iter) => {
        let res = [];
        for (const a of iter) {
            res.push(cb(a));
        };
        return res; 
    });
    const filter = curry((cb, iter) => {
        let res = [];
        for (const a of iter) {
            if (cb(a)) res.push(a)
        };
        return res;
    });
    const reduce = curry((cb, acc, iter) => {
        if (!iter) {
            iter = acc[Symbol.iterator]();
            acc = iter.next().value;
        }
        for (const a of iter) {
            acc = cb(acc, a);
        }
        return acc;
    });
    // const total_price = pipe(
    //     map(p => p.price),
    //     reduce(add)
    // );
    // const base_total_price = predi => pipe(
    //     filter(predi),
    //     total_price
    // )
    // go(
    //     products,
    //     base_total_price(p => p.price < 20000),
    //     log
    // );
    
    // go(
    //     products,
    //     base_total_price(p => p.price >= 20000),
    //     log
    // );
    go(
        products,
        map(p => p.quantity),
        reduce((a, b) => a + b),
        log
    );

    // const sum = (f, iter) => go(
    //     iter,
    //     map(f),
    //     reduce(add)
    // );
    const sum = curry((f, iter) => go(
        iter,
        map(f),
        reduce(add)
    ));
    log(sum(p => p.quantity * p.price, products))
    const total_quantity = sum(p => p.quantity);

    log(total_quantity(products))
    
    const total_price = pipe(
        map(p => p.price * p.quantity),
        reduce(add)
    );
    log(total_price(products));
    log(sum(u => u.age)([
        { age: 30 },
        { age: 20 },
        { age: 10 }
    ]))

    document.querySelector('#cart').innerHTML = `
        <table>
            <tr>
                <th></th>
                <th>상품 이름</th>
                <th>가격</th>
                <th>수량</th>
                <th>총 가격</th>
            </tr>
            ${go(products,
                sum(p => `
                    <tr>
                        <td><input type="checkbox" ${p.is_selected ? 'checked' : ''} /></td>
                        <td>${p.name}</td>
                        <td>${p.price}</td>
                        <td><input type="number" value="${p.quantity}" /></td>
                        <td>${p.price * p.quantity}</td>
                    </tr>
                `) // 문자열을 하나의 문자열로 더해줌. 현재는 map이 array를 반환하기 때문에 쉼표가 발생.
            )}
            <tr>
                <td colspan="2">합계</td>
                <td>${total_quantity(filter(p => p.is_selected)(products))}</td>
                <td>${total_price(filter(p => p.is_selected)(products))}</td>
            </tr>
        </table>
    `
})()