// jshint esversion:6
console.info(window.innerWidth);

document.addEventListener('scroll', e => {
    if (window.pageYOffset > 2) {
        // document.querySelector('.navbar').classList.add('navbar-light');
        document.querySelector('.navbar').classList.add('bg-white');
        document.querySelector('.navbar').classList.add('fixed-top');
        document.querySelector('.navbar').classList.add('shadow');
    } else {
        // document.querySelector('.navbar').classList.remove('navbar-light');
        document.querySelector('.navbar').classList.remove('bg-white');
        document.querySelector('.navbar').classList.remove('fixed-top');
        document.querySelector('.navbar').classList.remove('shadow');
    }
    console.log(window.pageYOffset);
});