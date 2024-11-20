var ssuid = sessionStorage.getItem("ssuid");
var action = urlParams().get("action");
var id = urlParams().get("id");
pageLoaded().then(function (callback) {
  if (callback) {
    $("#example")
      .DataTable({
        responsive: true,
        lengthChange: false,
        stateSave: true,
        autoWidth: false,
        buttons: [
          "copy",
          "csv",
          "excel",
          "pdf",
          {
            extend: "print",
            exportOptions: {
              columns: [0, 1, 2],
            },
          },
          "colvis",
        ],
        columnDefs: [{ orderable: false, targets: [1, 2, 3] }],
      })
      .buttons()
      .container()
      .appendTo("#example_wrapper .col-md-6:eq(0)");
  }
  hidePreloader();
});


$("a.btn-sign-out").click(function (e) {
  e.preventDefault();
  Swal.fire({
    title: "Please confirm to signout",
    icon: 'question',
    showCancelButton: true,
  }).then(function (result) {
    if (result.isConfirmed) {
      sessionStorage.removeItem("ssuid");
      swalMessage("Session destroyed", "Please reload resources page").then(function () {
        // swalLoading();
        showPreloader();
        window.location.reload();
      })
    }
  });
})
// if (ssuid) {
// var resource = new Object();
// var action = urlParams().get("action");
// var allowLists = ["lists", "types", "collections"];
// if (allowLists.includes(action)) {
//   resource.target = action;
//   resource.id = urlParams().get("id") ? urlParams().get("id") : null;
//   var options = "";
//   getResources("types")
//     .then(function (types) {
//       // // console.log(types);
//       types.forEach(function (row) {
//         // // console.log(item);
//         options += `<option value="${row.id}">${row.name}</option>`;
//       });
//     })
//     .then(function () {
//       getResources(resource.target, resource.id).then(function (row) {
//         // // console.log(row);
//         $(".main-header").removeClass("d-none");
//         $(".main-sidebar").removeClass("d-none");
//         $(".content-wrapper").removeClass("d-none");
//         $(".main-footer").removeClass("d-none");
//         var output = "";

//         switch (action) {
//           case "types":
//             var output;
//             if (row.length > 0) {
//               row.forEach(function (val) {
//                 // // console.log(item);
//                 output += `<tr>`;
//                 output += `<td>${val.name}</td>`;
//                 output += `<td>${val.id}</td>`;
//                 output += `<td>${val.note}</td>`;
//                 output += `<td>`;
//                 output += `<a href="#" class="text-danger trash-link" title="Trash" data-id="${val.id}"><i class="fas fa-trash"></i></a>`;
//                 output += `</td>`;
//                 output += `</tr>`;
//               });
//             }
//             // getResources("types").then(function (types) {
//             // // console.log(row);
//             $("h1#titleHead").html("Types");
//             $("ol.breadcrumb").append(`<li class="breadcrumb-item">Types</li>`);
//             $(".nav-link-types").addClass("active");
//             $("#example3Body").html(output);
//             $(function () {
//               $("#example3")
//                 .DataTable({
//                   responsive: true,
//                   lengthChange: false,
//                   stateSave: true,
//                   autoWidth: false,
//                   buttons: [
//                     "copy",
//                     "csv",
//                     "excel",
//                     "pdf",
//                     {
//                       extend: "print",
//                       exportOptions: {
//                         columns: [0, 1, 2],
//                       },
//                     },
//                     "colvis",
//                   ],
//                   columnDefs: [{ orderable: false, targets: [1, 2, 3] }],
//                 })
//                 .buttons()
//                 .container()
//                 .appendTo("#example3_wrapper .col-md-6:eq(0)");
//             });
//             $("#resourceTypes").removeClass("d-none");
//             hidePreloader();
//             // });
//             break;
//           case "lists":
//           default:
//             if (urlParams().get("id")) {
//               // // console.log(row.members);
//               row.members.forEach(function (val) {
//                 // // console.log(val);
//                 var secret = val.secret ? "TRUE" : "FALSE";
//                 output += `<tr>`;
//                 output += `<td>${val.type.name}</td>`;
//                 output += `<td>${val.label}</td>`;
//                 output += `<td>${secret}</td>`;
//                 output += `<td>${val.id}</td>`;
//                 output += `<td>${val.description}</td>`;
//                 output += `<td>`;
//                 output += `<a href="secret.html?action=collections&id=${val.id}" class="text-info mr-3" title="Example" target="_blank"><i class="fas fa-globe"></i></a>`;
//                 output += `<a href="#" class="text-danger trash-link" title="Trash" data-id="${val.id}"><i class="fas fa-trash"></i></a>`;
//                 output += `</td>`;
//                 output += `</tr>`;
//               });
//               $("ol.breadcrumb").append(
//                 `<li class="breadcrumb-item"><a href="resources.html?action=lists">Resources</a></li>`
//               );
//               $("ol.breadcrumb").append(
//                 `<li class="breadcrumb-item active">${row.title}</li>`
//               );
//               $("select#type").append(options);

//               $("h1#titleHead").html(`${row.title}`);

//               $("#exampleBody2").html(output);
//               $(function () {
//                 $("#example2")
//                   .DataTable({
//                     responsive: true,
//                     lengthChange: false,
//                     stateSave: true,
//                     autoWidth: false,
//                     buttons: [
//                       "copy",
//                       "csv",
//                       "excel",
//                       "pdf",
//                       {
//                         extend: "print",
//                         exportOptions: {
//                           columns: [0, 1, 2, 3],
//                         },
//                       },
//                       "colvis",
//                     ],
//                     columnDefs: [{ orderable: false, targets: [2, 3, 4] }],
//                   })
//                   .buttons()
//                   .container()
//                   .appendTo("#example2_wrapper .col-md-6:eq(0)");
//               });
//               $("#myCollections").removeClass("d-none");
//               // hidePreloader();
//             } else {
//               row.forEach(function (val) {
//                 if (val) {
//                   var member = val.members;
//                   var length = member ? member.length : 0;
//                   output += `<tr>`;
//                   output += `<td>${val.title}</td>`;
//                   output += `<td>${val.id}</td>`;
//                   output += `<td>${length}</td>`;
//                   output += `<td>`;
//                   output += `<a href="resources.html?action=lists&id=${val.id}" class="text-primary search-link mr-3" title="Detail"><i class="fas fa-search"></i></a>`;
//                   output += `<a href="secret.html?action=lists&id=${val.id}" class="text-info mr-3" title="Example" target="_blank"><i class="fas fa-globe"></i></a>`;
//                   output += `<a href="#" class="text-danger trash-link" title="Trash" data-id="${val.id}"><i class="fas fa-trash"></i></a>`;
//                   output += `</td>`;
//                   output += `</tr>`;
//                 }
//               });
//               $("#exampleBody").html(output);

//               $(function () {
//                 $("#example")
//                   .DataTable({
//                     responsive: true,
//                     lengthChange: false,
//                     stateSave: true,
//                     autoWidth: false,
//                     buttons: [
//                       "copy",
//                       "csv",
//                       "excel",
//                       "pdf",
//                       {
//                         extend: "print",
//                         exportOptions: {
//                           columns: [0, 1, 2],
//                         },
//                       },
//                       "colvis",
//                     ],
//                     columnDefs: [{ orderable: false, targets: [1, 2, 3] }],
//                   })
//                   .buttons()
//                   .container()
//                   .appendTo("#example_wrapper .col-md-6:eq(0)");
//               });
//               $("#resourceDataTables").removeClass("d-none");
//               $("ol.breadcrumb").append(
//                 `<li class="breadcrumb-item">Resources</li>`
//               );
//             }
//             $(".nav-link-resources").addClass("active");
//             hidePreloader();
//         }
//         // $(".main-header").removeClass("d-none");
//         // $(".main-sidebar").removeClass("d-none");
//         // $(".content-wrapper").removeClass("d-none");
//         // $(".main-footer").removeClass("d-none");
//         // hidePreloader();
//       });
//     });
// } else {
//   $(".main-error").removeClass("d-none");
//   hidePreloader();
// }

$("a#newRecord").click(async function (e) {
  e.preventDefault();
  var modalId = $(e.target).data("source");
  // // console.log(modalId);
  $("#modal-create-" + modalId).modal("show");
});

// $("a#newResourceType").click(async function (e) {
//   // // console.log(e);
//   $("#modal-default3").modal("show");
// });

// $("a#newCollection").click(async function (e) {
//   // // console.log(e);
//   $("#modal-default2").modal("show");
// });

$("a#reload").click(async function (e) {
  e.preventDefault();
  swalLoading();
  window.location.reload();
  // // console.log(e);
  // $("#modal-default2").modal("show");
});

$("form#newResourceType").submit(async function (e) {
  e.preventDefault();
  swalProcessing();
  var input = "resource=type-create&" + $(e.target).serialize();
  // // console.log();
  var targetScriptUrl = scriptUrl;
  var result = await fetch(targetScriptUrl + "?" + input, {
    method: "POST",
  });
  var response = await result.json();
  // // console.log(result);
  // // console.log(response);

  if (response[0].message) {
    var title = "Something went wrong!";
    var message, status, success;
    switch (response[0].message) {
      case "success":
        title = "New resource type created successfully.";
        message = "Please reload.";
        success = true;
        break;
      case "already":
        message = "Resource type name is already.";
        break;
      default:
        message = "Please try again.";
    }
    status = success ? "success" : "error";
    swalMessage(title, message, status).then(function () {
      if (success) {
        window.location.reload();
      }
    });
  }
});

$("form#newCollection").submit(async function (e) {
  e.preventDefault();
  swalProcessing();
  var input =
    "resource=collection-create&" +
    $(e.target).serialize() +
    "&src=" +
    urlParams().get("id");
  // // console.log(input);
  var targetScriptUrl = scriptUrl;
  var result = await fetch(targetScriptUrl + "?" + input, {
    method: "POST",
  });
  var response = await result.json();
  // // console.log(response);
  if (response[0].message) {
    var title = "Something went wrong!";
    var message, status, success;
    switch (response[0].message) {
      case "success":
        title = "New collection created successfully.";
        message = "Please reload.";
        success = true;
        break;
      case "already":
        message = "Collection label is already.";
        break;
      default:
        message = "Please try again.";
    }
    status = success ? "success" : "error";
    swalMessage(title, message, status).then(function () {
      if (success) {
        window.location.reload();
      }
    });
  }
});

$("form#newResource").submit(async function (e) {
  e.preventDefault();
  swalProcessing();
  var input = "resource=create&" + $(e.target).serialize();
  // // console.log(input);
  var targetScriptUrl = scriptUrl;
  var result = await fetch(targetScriptUrl + "?" + input, {
    method: "POST",
  });
  var response = await result.json();
  // // console.log(response);
  if (response[0].message) {
    var title = "Something went wrong!";
    var message, status, success;
    switch (response[0].message) {
      case "success":
        title = "New resource created successfully.";
        message = "Please reload.";
        success = true;
        break;
      case "already":
        message = "Resource name is already.";
        break;
      default:
        message = "Please try again.";
    }
    status = success ? "success" : "error";
    swalMessage(title, message, status).then(function () {
      if (success) {
        window.location.reload();
      }
    });
  }
});

$("table#example").on("click", "a", function (e) {
  if (e.target && e.target.matches(".link-trash")) {
    e.preventDefault();
    var targetId = e.target.dataset.id;
    // // console.log(targetId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(function (result) {
      if (result.isConfirmed) {
        var params = `id=${targetId}`;
        var targetAction = "delete";
        var targetMessage = "file";
        if (action == "lists") {
          if (id) {
            targetAction = "collection-delete";
            targetMessage = "collection";
          }
        } else if (action == "types") {
          targetAction = "type-delete";
          targetMessage = "type";
        }
        // swalLoading();
        swalProcessing();
        postResources(targetAction, params).then(function (response) {
          // console.log(response);
          if (response[0].message == "success") {
            swalMessage("Deleted!", `Your ${targetMessage} has been deleted.`).then(
              function () {
                window.location.reload();
              }
            );
          } else {
            swalMessage("Something went wrong!", response[0].error, "error");
          }
        });
      }
    });
  }
});

$("table#example2").on("click", "a", function (e) {
  if (e.target && e.target.matches(".trash-link")) {
    e.preventDefault();
    var id = e.target.dataset.id;
    // // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(function (result) {
      if (result.isConfirmed) {
        var params = `id=${id}`;
        // swalLoading();
        swalProcessing();
        postResources("collection-delete", params).then(function (response) {
          // // console.log(response);
          if (response[0].message == "success") {
            swalMessage("Deleted!", "Your file has been deleted.").then(
              function () {
                window.location.reload();
              }
            );
          } else {
            swalMessage("Something went wrong!", response[0].message, "error");
          }
        });
      }
    });
  }
});

$("table#example3").on("click", "a", function (e) {
  if (e.target && e.target.matches(".trash-link")) {
    e.preventDefault();
    var id = e.target.dataset.id;
    // // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(function (result) {
      if (result.isConfirmed) {
        var params = `id=${id}`;
        // swalLoading();
        swalProcessing();
        postResources("type-delete", params).then(function (response) {
          // // console.log(response);
          if (response[0].message == "success") {
            swalMessage("Deleted!", "Your file has been deleted.").then(
              function () {
                window.location.reload();
              }
            );
          } else {
            swalMessage("Something went wrong!", response[0].message, "error");
          }
        });
      }
    });
  }
});

async function pageLoaded() {

  // var action = urlParams().get("action");
  // var ssuid = localStorage.getItem("ssuid");
  // console.log(ssuid);
  if (!ssuid) {
    $(".main-authen").removeClass("d-none");
    return false;
  }
  var dataObj = new Array();
  var dataArray = ["collections", "lists", "types"];

  var result = await getResources(action, id);
  // // console.log(result);
  result = result.members ? result.members : result;

  if (action == "lists") {
    if (id) {
      var target = await getResources("collection", id);
      var title = target.title;
      $("h1#titleHead").html(title);
      // // console.log(title);
      $("ol.breadcrumb").append(`<li class="breadcrumb-item"><a href="resources.html?action=lists">Resources</a></li>`);
      $("ol.breadcrumb").append(`<li class="breadcrumb-item active">${title}</li>`);
    } else {
      $("ol.breadcrumb").append(`<li class="breadcrumb-item active">Resources</li>`);
    }
  } else {
    $("ol.breadcrumb").append(`<li class="breadcrumb-item"><a href="resources.html?action=lists">Resources</a></li>`);

  }

  if (result.length > 0) {
    console.log(result);

    // if (action == dataArray[1]) {
    //   // 
    // }
    var htmlOutput = '';
    result.forEach(function (row) {
      // // console.log(row);
      htmlOutput += tableBodyComponent(row);
    })
    $("#exampleBody").html(htmlOutput);
    $("#resourceDataTables").removeClass("d-none");


    var targetAction = action;
    if (dataArray.includes(action)) {
      // $("ol.breadcrumb").html("");
      // if (id || action == dataArray[2]) {
      //   $('.link-detail').addClass('d-none');

      // }
      if (action == dataArray[1]) {
        if (id) {
          // $('.link-detail').addClass('d-none');
          targetAction = "collections"
          var types = await getResources("types");
          types.forEach(function (row) {
            $("#type").append(`<option value="${row.id}">${row.name}</option>`);
          })
        }
      } else if (action == dataArray[2]) {
        // $('.link-detail').addClass('d-none');
        // $('.link-public').addClass('d-none');
        $("h1#titleHead").html("Types");
        $("ol.breadcrumb").append(`<li class="breadcrumb-item">Types</li>`);
      }
    }

    $("#newRecord").data("source", targetAction);

    $("#newRecord").attr("title", 'Create new ' + targetAction + ' record');

    $(".nav-link-" + action).addClass('active');

    $(".main-header").removeClass("d-none");
    $(".main-sidebar").removeClass("d-none");
    $(".content-wrapper").removeClass("d-none");
    $(".main-footer").removeClass("d-none");
    //   var resource = result.target.info;

    //   if (access) {
    //     // 
    //   } else {
    //     $(".main-authen").removeClass("d-none");
    //   }
  } else {
    $(".main-error").removeClass("d-none");
    return false;
  }
  // } else {
  //   $(".main-authen").removeClass("d-none");
  //   return false;
  // }
  // hidePreloader();
  return true;
}
// }else{

// }

function tableBodyComponent(data) {
  var title = data.title ? data.title : data.label;
  var options = data.members ? data.members.length : data.description;
  var target = action;
  if (target && id) {
    target = "collections";
  }

  var output = '<tr>';

  title = data.name ? data.name : title;
  output += `<td>${title}</td>`;

  output += `<td>${data.id}</td>`;

  options = data.note ? data.note : options;
  options = data.type ? data.type.name : options;
  output += `<td>${options}</td>`;

  output += `<td>`;
  if (data.members) {
    output += `<a href="resources.html?action=lists&id=${data.id}" class="text-info mr-2 link-detail" title="Detail"><i class="fas fa-search"></i></a>`;
  }
  output += `<a href="#" class="text-warning mr-2 link-edit" title="Edit"><i class="fas fa-edit"></i></a>`;
  output += `<a href="secret.html?action=${target}&id=${data.id}" class="text-primary mr-2 link-public" title="Public" target="_blank"><i class="fas fa-globe"></i></a>`;
  if (data.secret || data.encoded) {
  }
  output += `<a href="#" class="text-danger link-trash" title="Trash" data-id="${data.id}"><i class="fas fa-trash"></i></a>`;
  output += `</td>`;
  output += '</tr>';

  return output;
}

// async function getResources(action, id = null) {
//   var targetScriptUrl = scriptUrl + `?resource=${action}`;
//   targetScriptUrl = id ? targetScriptUrl + `&id=${id}` : targetScriptUrl;
//   var result = await fetch(targetScriptUrl);
//   var data = await result.json();
//   //   // console.log(scriptUrl);
//   return data;
// }

// async function postResources(action, data = null) {
//   var targetScriptUrl = scriptUrl + `?resource=${action}`;
//   targetScriptUrl = data ? targetScriptUrl + `&${data}` : targetScriptUrl;
//   var result = await fetch(targetScriptUrl, {
//     method: "POST",
//   });
//   var response = await result.json();
//   //   // console.log(scriptUrl);
//   return response;
// }
// } else {
//   $(".main-authen").removeClass("d-none");
//   hidePreloader();

$("form#authen").submit(async function (e) {
  e.preventDefault();
  swalProcessing();
  // var input = $(e.target).find("input");
  // var id = input[0].value;
  // var secret = input[1].value;
  // // swalLoading();
  var params = $(e.target).serialize();
  // console.log(params);
  var link = `${scriptUrl}?hash=supers&${params}`;
  // console.log(link);
  var data = await fetch(link);
  var result = await data.json();
  // swalMessage();
  // console.log(result);
  if (result.message) {
    // alert(result.message);
    swalMessage("Something went wrong", "Please try again", "error");
  } else {
    // setCookie(cname, result.id, 0.25);
    sessionStorage.setItem('ssuid', result.id);
    swalMessage("Session accessed", "Redirect to resource page").then(function () {
      // swalLoading();
      showPreloader();
      window.location.reload();
    })
  }
});
