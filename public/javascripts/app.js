// // (function() {
// // "use strict";

// function admin(url) {
//     function getCookie(cname) {
//         var name = cname + "=";
//         var ca = document.cookie.split(';');
//         for (var i = 0; i < ca.length; i++) {
//             var c = ca[i];
//             while (c.charAt(0) == ' ') {
//                 c = c.substring(1);
//             }
//             if (c.indexOf(name) == 0) {
//                 return c.substring(name.length, c.length);
//             }
//         }
//         return false;
//     }

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