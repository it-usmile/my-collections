var scriptUrl =
    "https://script.google.com/macros/s/AKfycbxkI48qk9ZJDgci-5slxYy8k8mfH2Rc_XNJ9Eu-zWidYkNyaYUQFHi5AWeqb0TiRcqs/exec";

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