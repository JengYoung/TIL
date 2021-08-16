function* range(start = 0, stop = start, step = 1) {
    if (arguments.length === 1) start = 0;
    if (arguments.length < 3 && start > stop) step *= -1;

    if (start < stop) {
        while (start < stop) {
            yield start;
            start += step;
        }
    } else {
        while (start > stop) {
            yield start;
            start += step;

        }
    }
}

function map(f) {
    return function *(iter) {
        for (const a of iter) yield f(a)
    }
}   

function filter(f) {
    return function *(iter) {
        for (const a of iter) if (f(a)) yield a;
    }
};

function take(limit) {
    return function *(iter) {
        for (const a of iter) {
            yield a;
            if (--limit === 0) break;
        }
    }
}

function reduce(f) {
    return function (acc, iter) {
        if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
        for (const a of iter) acc = f(acc, a);
        return acc;
    }
}

function each(f) {
    return function (iter) {
        for (const a of iter) f(a);
        return iter;
    }
}

function go(arg, ...fs) {
    return reduce((arg, f) => f(arg))(arg, fs);
}

const head = ([a]) => a;
const find = f => iter => head(filter(f)(iter));

function inc(parent, k) {
    parent[k] ? parent[k]++ : (parent[k] = 1);
    return parent;
}

const countBy = f => iter => reduce((counts, a) => inc(counts, f(a)))({}, iter);

const identity = a => a;

const count = countBy(identity);

// 그룹에다 집어넣어줍니다.
const groupBy = (f) => (iter) =>
    reduce(
        (group, a, k = f(a)) => ((group[k] = (group[k] || [])).push(a), group)
    )({}, iter);


function* entries(obj) {
    for (const k in obj) yield [k, obj[k]];
}

function* values(obj) {
    for (const k in obj) yield obj[k];
}

const isFlatable = a =>
    a != null && !!a[Symbol.iterator] && typeof a !== 'string';

function* flat(iter) {
    for (const a of iter) isFlatable(a) ? yield* a : yield a;
}

function zip(a) {
    return function* (b) {
        a = a[Symbol.iterator]();
        b = b[Symbol.iterator]();
        while (true) {
            const { value, done } = a.next();
            const { value: value2, done: done2 } = b.next();
            if (done && done2) break;
            yield [value, value2];
        }
    }
}

function concat(...args) {
    return flat(args);
}

console.log(
    [...go(
        range(10),
        filter(a => a % 2),
        take(3)
    )]
)

go(
    range(10),
    filter(a => a % 2),
    take(4),
    iter => [...iter],
    arr => console.log(arr)
);

go(
    range(10),
    filter(a => a % 2),
    take(3),
    map(a => a * 10),
    reduce((a, b) => a + b),
    console.log
);

console.log(
    reduce((a, b) => `${a}${b}`)('10', [1, 2, 3])
);

const users = [{ age: 10 }, { age: 13 }, { age: 20 }, { age: 23 }, { age: 27 }];
go(
    users,
    countBy(({ age }) => age - (age % 10)),
    console.log
)

go(
    flat([10, [20, 3], [4], 5]),
    take(4),
    each(console.log)
);

const { log } = console;
console.log("-------------------------------------------------------------------------")
function inc(parent, k) {
    parent[k] ? parent[k]++ : (parent[k] = 1);
    return parent;
}
// const countBy = f => iter => reduce((counts, a) => inc(counts, f(a)))({}, iter);
function dec(parent, k) {
    parent[k] > 1 ? parent[k]-- : 0;
    return parent;
}

const convertCountObj = f => iter => reduce((countedObject , a) => f(countedObject, a))({}, iter);

const participant = ["marina", "josipa", "nikola", "vinko", "filipa"];
const completion = ["josipa", "filipa", "marina", "nikola"];

// function computeObjByCompletionArr(completion) {
//     return function(iter) {
//         return reduce(((obj, name) => ({ ...obj, [name]: obj[name] - 1 })))(iter, completion) 
//     }
// }
function computeObjByCompletionArr(completion) {
    return function(iter) {
        return go(
            iter,
            
        )
    }
}
function findInCompletion(iter) {
    for (const name in iter) {
        if (iter[name]) return name;
    }
}
(() => {
    const solution = (participant, completion) => 
    go(
        participant,
        countBy(name => name),
        // convertCountObj((parent, k) => inc(parent, k)),
        computeObjByCompletionArr(completion),
        findInCompletion
    )
    log(solution(participant, completion))
})();

// (() => {
//     function reduce(f) {
//         return function (acc, iter) {
//             if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
//             for (const a of iter) acc = f(acc, a);
//             return acc;
//         }
//     }
//     function go(arg, ...fs) {
//         return reduce((arg, f) => f(arg))(arg, fs);
//     }
//     function substractByCompletion (completion) {
//         return function(iter) {
//             return reduce((obj, name) => ({ ...obj, [name]: obj[name] - 1 }))(iter, completion);
//         }
//     } 
//     function findInCompletion(obj) {
//         for (const name in obj) {
//             if(obj[name] > 0) return name;
//         }
//     }
//     function countByFunc(f) {
//         return function(iter) {
//             return reduce((countObject , a) => f(countObject, a))({}, iter);
//         }
//     }
//     const solution = (participants, completion) => 
//         go(
//             participants,
//             countByFunc((obj, k) => inc(obj, k)),
//             substractByCompletion(completion),
//             findInCompletion,
//         )
//     console.log(solution(participant, completion));
// })()

//   participants.find(participants => !completion[participants]--, completion.map(participants => completion[participants] = (completion[participants] | 0) + 1))