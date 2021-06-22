// // (function() {
// $("#go-up").;

"use strict";
// alert(123)
$(document).ready(() => {
    let y;
    $(document).on('scroll', e => {
        y = window.scrollY;
        console.log(y)

        if (window.scrollY > 400) {

            $("#go-up").addClass('go-up');
        } else $("#go-up").removeClass('go-up');
    })

})

function clearCookie() {
    document.cookie = "info=j; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

function navbarToggler() {
    $("#sidebartoggle").toggleClass('sidebartoggled');
    document.querySelector("#sidebar").classList.toggle("sidebar");
    $("#body").toggleClass("body");
}
$("#sidebartoggle").click(navbarToggler);
$("#adminName").click(navbarToggler);