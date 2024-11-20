// var urlParams = urlParams();
// var request = urlParams.get("request");
// urlParams.delete("request");

pageLoaded().then(function () {
    hidePreloader();
})

async function pageLoaded(params) {
    // await fetch(``).then(function (row) {
    //     console.log(row);
    // })
    // var htmlOutput = `<img src="https://drive.google.com/thumbnail?id=1sl8SCVOR95XBdb36ypssmOj_zvw0OvKd&sz=w1000" alt="">`;
    $(".pageloaded").html(htmlOutput);
    // 
}
