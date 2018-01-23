$(document).ready(function () {

    setTimeout(function () {
        $("#second").show().addClass("animated fadeInDownBig");
    }, 1000);
    setTimeout(function () {
        $("#third").show().addClass("animated fadeInDownBig");
    }, 2000);

    $(".element").hover(function () {
        $(this).css("background-color", "brown");
        $(this).find("a").css("color", "#FFFFFF");
    }, function () {
        $(this).css("background-color", "transparent");
        $(this).find("a").css("color", "#FF851B");
    });
});
