const arr = Array.from(new Array(3), (_, i) => () => i);
arr.forEach(f => console.log(f()));