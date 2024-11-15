var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
var currentTheme = localStorage.getItem('theme');
var mainHeader = document.querySelector('.main-header');

// cookieStore.set({
//     name: 'ckscript',
//     value: {
//         id: '1kEj5UTp3iNy-aMHXi0V4pJDm5ZlnSkCH'
//     },
//     expires: 30 * (60 * 1000)
// })
var cname = 'my_' + urlParams().get('action');
var destroy = urlParams().get("destroy");
if (destroy) {
    // if()
    document.cookie = cname + "=; path=/secret.html; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
// setCookie(cname, urlParams().get('id'), 0.25, 'secret.html');

pageLoaded();

$("form#authen").submit(async function (e) {
    e.preventDefault();
    var input = $(e.target).find("input");
    var secret = input[0].value;
    var link = `${scriptUrl}?hash=${urlParams().get('action')}&id=${urlParams().get('id')}&secret=${secret}`;
    var data = await fetch(link);
    var result = await data.json();
    // console.log(scriptUrl);
    // console.log(link);
    // console.log(result)
    if (result.message) {
        alert(result.message);
    } else {
        setCookie(cname, result.id, 0.25, 'secret.html');
        window.location.reload();
    }
})

async function pageLoaded() {
    var myCookie = await cookieStore.get(cname);
    if (myCookie) {
        if (urlParams().get('id') == myCookie.value) {
            // $(".main-authen").addClass('d-none');
            $(".main-header").removeClass('d-none');
            $(".main-sidebar").removeClass('d-none');
            $(".content-wrapper").removeClass('d-none');
            $(".main-footer").removeClass('d-none');
        } else {
            $(".main-authen").removeClass('d-none');
        }
    } else {
        var data = await fetch(`${scriptUrl}?resource=${urlParams().get('action')}&id=${urlParams().get('id')}`);
        var result = await data.json();
        if (result.length <= 0) {
            $(".main-error").removeClass('d-none');
        } else {
            $(".main-authen").removeClass('d-none');
        }
    }
    hidePreloader();
}

// function showAuthenticator() {
// 
// }

// var ckscript = { id: '1kEj5UTp3iNy-aMHXi0V4pJDm5ZlnSkCH' }
// var ckid = cookieStore.get('ssid');

var backdrop = `rgba(0,0,0,0.96)`;
var allowOutsideClick = false;
var allowEscapeKey = false;


// if (!ckid) {
// hidePreloader();
// Swal.fire({
//     title: "Enter your password",
//     input: "password",
//     inputAttributes: {
//         autocapitalize: "off"
//     },
//     showCancelButton: false,
//     allowOutsideClick,
//     allowEscapeKey,
//     confirmButtonText: "Look up",
//     showLoaderOnConfirm: true,
//     backdrop,
//     preConfirm: async (password) => {
//         try {
//             const myUrl = scriptUrl + `?hash=lists&id=${ckscript.id}&encode=${password}`;
//             const response = await fetch(myUrl);
//             if (!response.ok) {
//                 return Swal.showValidationMessage(`
//                 ${JSON.stringify(await response.json())}
//               `);
//             }
//             return response.json();
//         } catch (error) {
//             Swal.showValidationMessage(`
//               Request failed: ${error}
//             `);
//         }
//     },
//     // allowOutsideClick: () => !Swal.isLoading()
// }).then((result) => {
//     if (result.isConfirmed) {
//         // console.log(result.value);
//         if (result.value.message) {
//             Swal.fire({
//                 title: result.value.message,
//                 icon: 'error',
//                 allowOutsideClick,
//                 allowEscapeKey,
//                 backdrop,
//                 confirmButtonText: "Retry",
//             }).then(function () {
//                 window.location.reload();
//             });
//             // Swal.showValidationMessage(`Request failed: ${result.value.message}`);

//         }
//     }
// });
// }

if (currentTheme) {
    if (currentTheme === 'dark') {
        if (!document.body.classList.contains('dark-mode')) {
            document.body.classList.add("dark-mode");
        }
        if (mainHeader.classList.contains('navbar-light')) {
            mainHeader.classList.add('navbar-dark');
            mainHeader.classList.remove('navbar-light');
        }
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        if (!document.body.classList.contains('dark-mode')) {
            document.body.classList.add("dark-mode");
        }
        if (mainHeader.classList.contains('navbar-light')) {
            mainHeader.classList.add('navbar-dark');
            mainHeader.classList.remove('navbar-light');
        }
        localStorage.setItem('theme', 'dark');
    } else {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove("dark-mode");
        }
        if (mainHeader.classList.contains('navbar-dark')) {
            mainHeader.classList.add('navbar-light');
            mainHeader.classList.remove('navbar-dark');
        }
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);
// $(".content").removeClass('d-none');
// hidePreloader();