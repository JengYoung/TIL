
const photoupload = document.querySelector('.photoupload');

photoupload.addEventListener('change', e => console.log(e.target.files[0].name))

console.log