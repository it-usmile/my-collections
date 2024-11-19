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
  // // console.log(result);
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
  var dataType = ["collections", "lists"];

  var title;
  await getResources(action, id)
    .then(async function (row) {
      var response = new Object();
      var name = row.label ? row.label : row.title;
      var type = row.type ? row.type : null;
      title = name;
      response.target = { id: row.id, name, type };
      response.type = row.label ? dataType[0] : dataType[1];
      response.members = new Array();
      if (row.members) {
        row.members.forEach(function (val) {
          if (!val.secret) {
            response.members.push(val);
          }
        });
      }
      $("h1#titleHead").html(title);
      if (row.resource) {
        title = row.type.name;
        await getResources("lists", row.resource).then(function (lists) {
          lists.members.forEach(function (val) {
            if (val.id != id && !val.secret) {
              response.members.push(val);
            }
          });
        });
      }
      return response;
    })
    .then(async function (data) {
      // // console.log(data);
      // title =
      switch (data.type) {
        case dataType[0]:
          // console.log(data);
          await getRecords(data.target.id).then(function (row) {
            // row.collection = await data.target.name;
            var length = row.length;
            var col = 4;
            if (length <= 1) {
              col = 12;
            }
            row.collection = data.target;
            $("#resources").append(
              cardComponent(data.target.type.name, row, col)
            );
          });
        // break;
        case dataType[1]:
          var typeArr = new Array();
          data.members.forEach(async function (row) {
            // console.log(row);
            var dataObj = {
              id: row.id,
              name: row.label,
            };
            var already;
            for (var i = 0; i < typeArr.length; i++) {
              var val = typeArr[i];
              if (val.type.id == row.type.id) {
                val.row.push(dataObj);
                // // console.log(val);
                already = true;
              }
            }

            if (typeArr.length == 0 || !already) {
              typeArr.push({ type: row.type, row: [dataObj] });
            }
          });
          for (var i = 0; i < typeArr.length; i++) {
            var dataArr = new Array();
            var length = typeArr[i].row.length;
            // console.log(typeArr[i]);
            // var col = 4;
            // if (length <= 1) {
            //   col = 12;
            // }
            // // console.log(typeArr[i]);
            for (var n = 0; n < typeArr[i].row.length; n++) {
              // // console.log(typeArr[i].row[n]);
              // console.log(typeArr[i].row[n]);
              // console.log(typeArr[i].row);
              await getRecords(typeArr[i].row[n].id).then(function (val) {
                // typeArr[i].row[n].collection
                // val.collection = typeArr[i].row;
                val.forEach(function (item) {
                  // // console.log(item);
                  item.collection = typeArr[i].row[n];
                  dataArr.push(item);
                });
                // result = val;
              });
            }
            // // console.log(dataArr);
            var col = 4;
            if (length <= 1) {
              col = 12;
            } else if (length <= 3 && length >= 2) {
              col = 6;
            }
            // // console.log(length);
            $("#resources").append(
              cardComponent(typeArr[i].type.name, dataArr, col)
            );
          }

          // typeArr.forEach(async function (row) {
          //   row.record.push(await getRecords(row.id));
          //   // console.log(row);
          // });
          // // console.log(typeArr);
          break;
      }

      // if (action == dataType[0]) {
      //   title = "";
      // }
      $("ol.breadcrumb").append(
        `<li class="breadcrumb-item active">${title}</li>`
      );
      $(".main-header").removeClass("d-none");
      $(".main-sidebar").removeClass("d-none");
      $(".content-wrapper").removeClass("d-none");
      $(".main-footer").removeClass("d-none");
    });

  hidePreloader();

  // if (dataObj) {
  //   // console.log(dataObj);
  //   // var access;
  //   // var target = result.target;
  //   // var addons = result.addons;

  //   // if (target.secret || target.encoded) {
  //   //   //   // if (action == "collections" || action == "lists") {
  //   //   //   //   addons = true;
  //   //   //   // }
  //   //   if (ssid == urlParams().get("id")) {
  //   //     access = true;
  //   //   }
  //   // } else {
  //   //   access = true;
  //   // }

  //   // // console.log(result);
  //   // if (access) {
  //   // if (id && action == actionArray[0]) {
  //   // target.members.forEach(function (row) {
  //   //   // console.log(row)
  //   // })
  //   // addons.push({ type: target.type, members: target.members });
  //   // await getRecords(target.id).then(function (row) {
  //   //   // console.log(row);
  //   //   // target.type.name = target.type ? target.type.name : ;
  //   //   // if (!result.target.title) {
  //   //   //   $("#resources").append(cardComponent(target.type.name, row))
  //   //   // } else {
  //   //   //   result.target.members.forEach(async function (row) {
  //   //   //     // // console.log(row)
  //   //   //     await getRecords(row.id).then(function (row) {
  //   //   //       // console.log(row);
  //   //   //       // target.type.name = target.type ? target.type.name : ;
  //   //   //       if (!result.target.title) {
  //   //   //         $("#resources").append(cardComponent(target.type.name, row))
  //   //   //       } else {
  //   //   //         result.target.members.forEach(function (row) {
  //   //   //           // console.log(row)
  //   //   //         })
  //   //   //       }
  //   //   //     })
  //   //   //   })
  //   //   // }
  //   // })
  //   // }

  //   // if (addons.length > 0) {
  //   //   addons.forEach(async function (item) {
  //   //     // // console.log(item)
  //   //     var title = item.type.name;
  //   //     var col = 4;
  //   //     var records = new Array();
  //   //     for (var i = 0; i < item.members.length; i++) {
  //   //       await getRecords(item.members[i].id).then(function (result) {
  //   //         result.forEach(function (foo) {
  //   //           records.push(foo);

  //   //         })
  //   //       })
  //   //       // records.push(getRecords(item.members[i].id))
  //   //     }
  //   //     // // console.log(item);
  //   //     // var records = await getRecords(item.id);
  //   //     // var records = new Array();
  //   //     // item.members.forEach(async function (data) {
  //   //     //   // records.push(await getRecords(data.id).then(function (row) {
  //   //     //   //   for (var i = 0; i < row.length; i++) {
  //   //     //   //     return row[i];
  //   //     //   //     // // console.log(row[i])
  //   //     //   //   }
  //   //     //   //   // // console.log(row)
  //   //     //   // }))
  //   //     //   // var target = awa
  //   //     //   //   // // console.log(data);
  //   //     //   //   records += await getRecords(data.id).then(function (target) {
  //   //     //   //     var response = target;
  //   //     //   //     // // console.log(target)
  //   //     //   //     //   // console.log(row);
  //   //     //   //     // $("#resources").append(cardComponent(item.type.name, item.members))
  //   //     //   //     return response;
  //   //     //   //   })
  //   //     // })
  //   //     // console.log(records);
  //   //     await $("#resources").append(cardComponent(title, records, col));
  //   //   })
  //   // }
  //   // // console.log(target);
  //   // awa

  //   // $(".main-header").removeClass("d-none");
  //   // $(".main-sidebar").removeClass("d-none");
  //   // $(".content-wrapper").removeClass("d-none");
  //   // $(".main-footer").removeClass("d-none");

  $("#resources").on("click", "img", function (e) {
    //
    // // console.log(e.target);
    if (e.target && e.target.matches(".block-image")) {
      var targetId = $(e.target).data("target-id");
      var targetName = $(e.target).data("target-name");
      var link = `https://lh3.googleusercontent.com/d/${targetId}=w1000`;
      $("#targetTitle").html(targetName);
      $("img#record").attr("src", link);
      $("#showRecord").modal("show");
      // // console.log();
    }
  });
  //   // } else {
  //   // $(".main-authen").removeClass("d-none");
  // }
}

function cardComponent(title, imageObj, col = 4) {
  console.log(imageObj);
  var component = `<div class="card card-primary mb-3">`;
  component += `<div class="card-header">`;
  component += `<h4 class="card-title">${title}</h4>`;
  component += `</div>`;
  component += `<div class="card-body row">`;
  // if (imageObj.collection) {
  // console.log(imageObj)
  // }
  // var targetTitle = imageObj.collection ? imageObj.collection.name : title;
  imageObj.forEach(function (target) {
    var targetTitle = imageObj.collection ? imageObj.collection.name : target.collection.name;
    component += `<div class="col-sm-${col} mb-3">`;
    component += `<a href="javascript:void(0);" class="linkTarget">`;
    component += `<img src="https://lh3.googleusercontent.com/d/${target.id}=w1000" class="w-100 h-100 mb-2 block-image" style="object-fit: cover;" alt="${target.name}" data-target-id="${target.id}" data-target-name="${targetTitle}" />`;
    component += `</a>`;
    component += `</div>`;
  });
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
