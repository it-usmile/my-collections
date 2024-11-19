var cname = "sc_" + urlParams().get("action");
var ssid = sessionStorage.getItem(cname);

pageLoaded();

// var recordBody = "";

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
  var actionArray = ["lists", "collections"];
  // var dataObj = new Object();

  var result = await getResources(action, id).then(async function (row) {
    var response = { target: row, addons: new Array() }

    await getResources(actionArray[0], row.resource).then(function (resource) {
      if (resource.members) {
        resource.members.forEach(function (member) {
          // console.log(member);
          if (!member.secret && member.id != row.id) {
            var already;
            for (var i = 0; i < response.addons.length; i++) {
              // console.log(response.addons[i]);
              // for (var n = 0; n < response[i].addons.length; n++) {
              if (response.addons[i].type.id == member.type.id) {
                already = true;
                response.addons[i].members.push(member);
              }
              // 
              // }
              // alre
            }
            if (response.addons.length == 0 || !already) {
              response.addons.push({ type: member.type, members: [member] })
              // response.addons.members.push(member)
            }
            // response.addons.forEach(function (item) {
            //   if (item.type.id == member.type.id) {
            //     var data = { type: member.type.name, members: new Array() };
            //     response.addons
            //   }
            // })
            // console.log(member.type)
          }
        })
        if (id && action == actionArray[0]) {
          response.addons.push(member);
        }
      }
      // console.log(resource.members);
    });
    // console.log(row)
    return response;
  });

  if (result) {
    var access;
    var target = result.target;
    var addons = result.addons;

    if (target.secret || target.encoded) {
      //   // if (action == "collections" || action == "lists") {
      //   //   addons = true;
      //   // }
      if (ssid == urlParams().get("id")) {
        access = true;
      }
    } else {
      access = true;
    }

    console.log(result);
    if (access) {
      // if (id && action == actionArray[0]) {
      // target.members.forEach(function (row) {
      //   console.log(row)
      // })
      // addons.push({ type: target.type, members: target.members });
      await getRecords(target.id).then(function (row) {
        console.log(row);
        // target.type.name = target.type ? target.type.name : ;
        // if (!result.target.title) {
        //   $("#resources").append(cardComponent(target.type.name, row))
        // } else {
        //   result.target.members.forEach(async function (row) {
        //     // console.log(row)
        //     await getRecords(row.id).then(function (row) {
        //       console.log(row);
        //       // target.type.name = target.type ? target.type.name : ;
        //       if (!result.target.title) {
        //         $("#resources").append(cardComponent(target.type.name, row))
        //       } else {
        //         result.target.members.forEach(function (row) {
        //           console.log(row)
        //         })
        //       }
        //     })
        //   })
        // }
      })
      // }

      if (addons.length > 0) {
        addons.forEach(async function (item) {
          // console.log(item)
          var title = item.type.name;
          var col = 4;
          var records = new Array();
          for (var i = 0; i < item.members.length; i++) {
            await getRecords(item.members[i].id).then(function (result) {
              result.forEach(function (foo) {
                records.push(foo);

              })
            })
            // records.push(getRecords(item.members[i].id))
          }
          // console.log(item);
          // var records = await getRecords(item.id);
          // var records = new Array();
          // item.members.forEach(async function (data) {
          //   // records.push(await getRecords(data.id).then(function (row) {
          //   //   for (var i = 0; i < row.length; i++) {
          //   //     return row[i];
          //   //     // console.log(row[i])
          //   //   }
          //   //   // console.log(row)
          //   // }))
          //   // var target = awa
          //   //   // console.log(data);
          //   //   records += await getRecords(data.id).then(function (target) {
          //   //     var response = target;
          //   //     // console.log(target)
          //   //     //   console.log(row);
          //   //     // $("#resources").append(cardComponent(item.type.name, item.members))
          //   //     return response;
          //   //   })
          // })
          console.log(records);
          await $("#resources").append(cardComponent(title, records, col));
        })
      }
      // console.log(target);
      // awa

      $(".main-header").removeClass("d-none");
      $(".main-sidebar").removeClass("d-none");
      $(".content-wrapper").removeClass("d-none");
      $(".main-footer").removeClass("d-none");

      $("#resources").on("click", "img", function (e) {
        //
        console.log(e.target);
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
    } else {
      $(".main-authen").removeClass("d-none");
    }
  } else {
    $(".main-error").removeClass("d-none");
  }
  hidePreloader();
}

function cardComponent(title, imageObj, col = 4) {
  var component = `<div class="card card-primary mb-3">`
  component += `<div class="card-header">`
  component += `<h4 class="card-title">${title}</h4>`
  component += `</div>`
  component += `<div class="card-body row">`
  imageObj.forEach(function (target) {
    component += `<div class="col-sm-${col} mb-3 mx-auto">`;
    component += `<a href="javascript:void(0);" class="linkTarget">`;
    component += `<img src="https://lh3.googleusercontent.com/d/${target.id}" class="w-100 h-100 mb-2 block-image" style="object-fit: cover;" alt="${target.name}" data-target-id="${target.id}" data-target-name="${title}" />`;
    component += `</a>`;
    component += `</div>`;
  })
  component += `</div>`;
  component += `</div>`;
  component += ``;
  return component;
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
