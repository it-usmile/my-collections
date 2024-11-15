var scriptUrl =
  "https://script.google.com/macros/s/AKfycbxkI48qk9ZJDgci-5slxYy8k8mfH2Rc_XNJ9Eu-zWidYkNyaYUQFHi5AWeqb0TiRcqs/exec";

var preloader = $(".preloader");
var toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
var currentTheme = localStorage.getItem("theme");
var mainHeader = document.querySelector(".main-header");

var destroy = urlParams().get("destroy");

// function


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
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + `; path=/secret.html; ` + expires;
}

if (currentTheme) {
  if (currentTheme === "dark") {
    if (!document.body.classList.contains("dark-mode")) {
      document.body.classList.add("dark-mode");
    }
    if (mainHeader.classList.contains("navbar-light")) {
      mainHeader.classList.add("navbar-dark");
      mainHeader.classList.remove("navbar-light");
    }
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    if (!document.body.classList.contains("dark-mode")) {
      document.body.classList.add("dark-mode");
    }
    if (mainHeader.classList.contains("navbar-light")) {
      mainHeader.classList.add("navbar-dark");
      mainHeader.classList.remove("navbar-light");
    }
    localStorage.setItem("theme", "dark");
  } else {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
    }
    if (mainHeader.classList.contains("navbar-dark")) {
      mainHeader.classList.add("navbar-light");
      mainHeader.classList.remove("navbar-dark");
    }
    localStorage.setItem("theme", "light");
  }
}

