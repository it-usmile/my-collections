var urlParams = urlParams();
var request = urlParams.get("request");
urlParams.delete("request");

setTimeout(function () {
    var allowLists = ["resources", "secret"];
    if (allowLists.includes(request)) {
        window.location.href = `/${request}.html?${urlParams}`;
    } else {
        hidePreloader();
    }
}, 1500);