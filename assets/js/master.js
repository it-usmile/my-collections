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
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

function hidePreloader() {
  setTimeout(function () {
    preloader.css("height", 0);
    preloader.children().hide();
  }, 1500);
}

function showPreloader() {
  // setTimeout(function () {
    preloader.attr("style", 'height: 100vh');
    preloader.children().show();
  // }, 1500);
}

function swalLoading() {
  Swal.fire({
    title: "Loading.",
    html: "Wait a moment please",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: function () {
      Swal.showLoading();
    },
  });
}

function swalProcessing() {
  Swal.fire({
    title: "Processing<b></b>",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      var i = 0;
      setInterval(() => {
        if (i < 3) {
          timer.textContent += `.`;
          i++;
        } else {
          timer.textContent = "";
          i = 0;
        }
      }, 1500);
    },
  });
}

function swalMessage(title, message, status = "success") {
  return Swal.fire({
    title: title,
    html: message,
    icon: status,
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

function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + `; path=/; ` + expires;
}

async function getGroups(type, collection) {
  var targetScriptUrl = scriptUrl + `?resource=groups`;
  targetScriptUrl += `&type=${type}&src=${collection}`;
  var result = await fetch(targetScriptUrl);
  var data = await result.json();
  //   console.log(scriptUrl);
  return data;
}

async function getRecords(collection) {
  var targetScriptUrl = scriptUrl + `?resource=records`;
  targetScriptUrl += `&collection=${collection}`;
  var result = await fetch(targetScriptUrl);
  var data = await result.json();
  //   console.log(scriptUrl);
  return data;
}

async function getResources(action, id = null) {
  var targetScriptUrl = scriptUrl + `?resource=${action}`;
  targetScriptUrl = id ? targetScriptUrl + `&id=${id}` : targetScriptUrl;
  var result = await fetch(targetScriptUrl);
  var data = await result.json();
  //   console.log(scriptUrl);
  return data;
}

async function postResources(action, data = null) {
  var targetScriptUrl = scriptUrl + `?resource=${action}`;
  targetScriptUrl = data ? targetScriptUrl + `&${data}` : targetScriptUrl;
  var result = await fetch(targetScriptUrl, {
    method: "POST",
  });
  var response = await result.json();
  //   console.log(scriptUrl);
  return response;
}
