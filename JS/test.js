const button = document.querySelector('button');
button.addEventListener('click', printTarget);

function printTarget(e) {
    console.log(e.target);
}

function hello() {
    console.log('hi')
}