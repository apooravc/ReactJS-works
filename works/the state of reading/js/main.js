$(document).ready(function () {
  var request = new XMLHttpRequest();
  var detailsURL = "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=";
  request.open('GET', detailsURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var detailsJSON = request.response;
    console.log(detailsJSON);
  }

  $(window).scroll(function() {
  var currentScroll = $(window).scrollTop();
  if (currentScroll >= 50) {
    $('.header').css({
        "height": "48px",
        "background-color": "#FF4136",
        "color": "#ffffff"});

    $('.heading').css({
        "font-size": "20px",
        "margin": "0 0 0 10px",
        "border-bottom": "2px solid #ffffff"});
  } else {
    //when currentScroll is < 50, return to original layout
    $('.header').css({"height": "63px",
        "background-color": "#ffffff",
        "color": "#000000"});

    $('.heading').css({
        "font-size": "29px",
        "margin": "0 0 0 25px",
        "border-bottom": "2px solid #000000"});
  }});
});
