var cname = "sc_" + urlParams().get("action");
var ssid = sessionStorage.getItem(cname);

pageLoaded();

// var recordBody = "";
$("#resourceGallery").on("click", "img", function (e) {
  //
  // console.log(e.target);
  if (e.target && e.target.matches(".block-image")) {
    var targetId = $(e.target).data("target-id");
    var targetName = $(e.target).data("target-name");
    var link = `https://lh3.googleusercontent.com/d/${targetId}`;
    $("#targetTitle").html(targetName);
    $("img#record").attr("src", link);
    $("#showRecord").modal("show");
    // console.log();
  }
});

var currentTheme = localStorage.getItem("theme");
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
  // console.log(result);
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
  var id = urlParams().get("id");
  var action = urlParams().get("action");
  var dataArray = ["lists", "collections"];
  var dataObj = new Object();
  dataObj.target = new Object();
  dataObj.members = new Array();

  var result = await getResources(action, id).then(async function (row) {
    dataObj.target = { info: row, result: await getRecords(row.id) };
    var resource = await getResources(dataArray[0], row.resource);

    var members = resource.members ? resource.members : row.members;
    members.forEach(function (collection) {
      var dataRow = getRecords(collection.id);
      dataObj.members.push({
        info: collection,
        result: dataRow,
      });
    });
    return dataObj;
  });

  if (result) {
    var access;
    var resource = result.target.info;
    if (resource.secret || resource.encoded) {
      if (ssid == urlParams().get("id")) {
        access = true;
      }
    } else {
      access = true;
    }

    if (access) {
      var resource = result.target.info;
      var title = resource.title ? resource.title : resource.label;

      $("#titleHead").html(title);
      if (result.target.result.length > 0) {
        var length = result.target.result.length;
        var col = 4;
        if (length <= 1) {
          col = 12;
        } else if (length <= 4 && length >= 2) {
          col = 6;
        }
        result.target.result.forEach(function (row) {
          // console.log(result.target.info.label);
          row.type = { name: result.target.info.label};
          $("#resourceGallery").append(imageComponent(row, col));
        });
      }
      if (result.members.length > 0) {
        // console.log(result);
        result.members.forEach(async function (row) {
          if (row.info.id != id && !row.info.secret && !row.info.encoded) {
            var items = await row.result;
            // console.log(row.info.label);
            items.forEach(function (val) {
              val.type = { name: row.info.label};
              $("#resourceGallery").append(imageComponent(val));
            });
          }
        });
      }

      $(".main-header").removeClass("d-none");
      $(".main-sidebar").removeClass("d-none");
      $(".content-wrapper").removeClass("d-none");
      $(".main-footer").removeClass("d-none");
    } else {
      $(".main-authen").removeClass("d-none");
    }
  } else {
    $(".main-error").removeClass("d-none");
  }
  hidePreloader();
}

function imageComponent(target, col = 4) {
  var component = `<div class="col-sm-${col} mb-3 mx-auto">`;
  component += `<a href="javascript:void(0);" class="linkTarget">`;
  component += `<img src="https://lh3.googleusercontent.com/d/${target.id}" class="w-100 h-100 mb-2 block-image" style="object-fit: cover;" alt="${target.name}" data-target-id="${target.id}" data-target-name="${target.type.name}" />`;
  component += `</a>`;
  component += `</div>`;
  return component;
}

toggleSwitch.addEventListener("change", switchTheme, false);
