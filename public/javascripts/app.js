// // (function() {
"use strict";
// alert(123)

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

//     const pages = ["login", "register"];
//     console.log(url);
//     if (url.includes("admin")) {

//         fetch(`http://api.yowamusic.com.ng/v1/admin/${getCookie("email")}`).then(res => res.json()).then(data => {
//             document.querySelector("#adminName .fa-user").textContent = data.name;

//             console.log(data.data[0].name)
//         }).catch(err => console.error(err.msg));

//         // console.log($("#register"));
//         // $.ajax({
//         //     type: "POST",
//         //     url: url,
//         //     data: data,
//         //     success: success,
//         //     dataType: dataType
//         //   });
//     }
// }

// admin(document.location.href)
//     // }())