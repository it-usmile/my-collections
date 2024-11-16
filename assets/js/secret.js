var cname = "sc_" + urlParams().get("action");
var ssid = sessionStorage.getItem(cname);

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
  var result;
  if (urlParams().get("id") && urlParams().get("action")) {
    var data = await fetch(
      `${scriptUrl}?resource=${urlParams().get("action")}&id=${urlParams().get(
        "id"
      )}`
    );
    result = await data.json();
  }
  if (result) {
    if (ssid == urlParams().get("id")) {
      var data = new Array();

      switch (urlParams().get("action")) {
        case "lists":
          result.members.forEach(function (row) {
            if (!row.secret) {
              data.push(row);
            }
          });
          break;
        case "collections":
          data = result;
          break;
      }
      // if (urlParams().get("action") == "lists") {
      //   result.members.forEach(function (row) {
      //     if (!row.secret) {
      //       collections.push(row);
      //     }
      //   });
      // }

      console.log(result);
      $(".main-header").removeClass("d-none");
      $(".main-sidebar").removeClass("d-none");
      $(".content-wrapper").removeClass("d-none");
      $(".main-footer").removeClass("d-none");
      // console.log(result.members);
    } else {
      $(".main-authen").removeClass("d-none");
    }
  } else {
    $(".main-error").removeClass("d-none");
  }
  hidePreloader();
}

toggleSwitch.addEventListener("change", switchTheme, false);
