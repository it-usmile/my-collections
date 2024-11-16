var resource = new Object();
var action = urlParams().get("action");
var allowLists = ["lists", "types", "collections"];
if (allowLists.includes(action)) {
  resource.target = action;
  resource.id = urlParams().get("id") ? urlParams().get("id") : null;
  getResources(resource.target, resource.id).then(function (row) {
    // console.log(row);
    var output = "";
    row.forEach(function (val) {
      if (val) {
        output += `<tr>`;
        output += `<td>${val.title}</td>`;
        output += `<td>${val.id}</td>`;
        output += `<td>${val.members.length}</td>`;
        output += `<td>`;
        output += `<a href="#" class="text-info search-link mr-3" title="Detail" data-id="${val.id}"><i class="fas fa-search"></i></a>`;
        output += `<a href="#" class="text-danger trash-link" title="Trash" data-id="${val.id}"><i class="fas fa-trash"></i></a>`;
        output += `</td>`;
        output += `</tr>`;
      }
    });
    $("#exampleBody").html(output);

    $(function () {
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
    });
    hidePreloader();

    $(".wrapper").removeClass("d-none");
  });
} else {
  setTimeout(function () {
    swalError();
  }, 1000);
}

$("table").on("click", "a", function (e) {
  e.preventDefault();
  if (e.target && e.target.matches(".search-link")) {
    var id = e.target.dataset.id;
    console.log(id);
  }
  if (e.target && e.target.matches(".trash-link")) {
    var id = e.target.dataset.id;
    console.log(id);
  }
});

async function getResources(action, id = null) {
  scriptUrl = scriptUrl + `?resource=${action}`;
  scriptUrl = id ? scriptUrl + `&id=${id}` : scriptUrl;
  var result = await fetch(scriptUrl);
  var data = await result.json();
  //   console.log(scriptUrl);
  return data;
}
