var scriptUrl =
    "https://script.google.com/macros/s/AKfycbxkI48qk9ZJDgci-5slxYy8k8mfH2Rc_XNJ9Eu-zWidYkNyaYUQFHi5AWeqb0TiRcqs/exec";

var preloader = $(".preloader");
// var urlParams = urlParams();

function hidePreloader() {
    setTimeout(function () {
        preloader.css("height", 0);
        preloader.children().hide();
    }, 1500);
}

function swalLoading() {
    Swal.fire({
        title: "Loading.",
        html: "Wait a moment please",
        didOpen: function () {
            Swal.showLoading();
        },
    });
}

function swalError() {
    Swal.fire({
        title: "Not found!",
        html: "Please try again.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: "Retry",
        cancelButtonText: "Home",
    }).then(function (result) {
        if (result.isConfirmed) {
            window.location.reload();
        } else {
            window.location.href = `/`;
        }
    });
}

function urlParams() {
    var queryString = window.location.search;
    var result = new URLSearchParams(queryString);
    return result;
}

function setCookie(cname, cvalue, exdays = 1, path = "") {
    path = "/" + path;
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // $.cookie(cname, cvalue, { expires, path });
    document.cookie = cname + "=" + cvalue + `; path=/secret.html; ` + expires;
    // console.log(path);
}