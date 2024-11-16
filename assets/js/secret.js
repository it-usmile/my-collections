var cname = "my_" + urlParams().get("action");

pageLoaded();

// if (destroy) {
//   document.cookie =
//     cname + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//   window.location.href = "index.html";
// }

$("form#authen").submit(async function (e) {
  e.preventDefault();
  var input = $(e.target).find("input");
  var secret = input[0].value;
  var link = `${scriptUrl}?hash=${urlParams().get(
    "action"
  )}&id=${urlParams().get("id")}&secret=${secret}`;
  swalLoading();
  var data = await fetch(link);
  var result = await data.json();
  if (result.message) {
    // alert(result.message);
    swalMessage("Something went wrong", "Please try again", "error");
  } else {
    // setCookie(cname, result.id, 0.25);
    sessionStorage.setItem(cname, result.id);
    window.location.reload();
  }
});

async function pageLoaded() {
  var ssid = sessionStorage.getItem(cname);
  console.log(ssid);
  if (
    urlParams().get("id") &&
    ssid == urlParams().get("id") &&
    urlParams().get("action")
  ) {
    $(".main-header").removeClass("d-none");
    $(".main-sidebar").removeClass("d-none");
    $(".content-wrapper").removeClass("d-none");
    $(".main-footer").removeClass("d-none");
  } else {
    if (urlParams().get("id")) {
      var data = await fetch(
        `${scriptUrl}?resource=${urlParams().get(
          "action"
        )}&id=${urlParams().get("id")}`
      );
      var result = await data.json();
      if (result.length <= 0) {
        $(".main-error").removeClass("d-none");
      } else {
        $(".main-authen").removeClass("d-none");
      }
    } else {
      $(".main-error").removeClass("d-none");
    }
  }
  hidePreloader();
}

toggleSwitch.addEventListener("change", switchTheme, false);
