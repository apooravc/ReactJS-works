$(document).ready(function () {
  var nytKey = config.NYT_KEY;
  var googleBooksKey = config.GOOGLE_BOOKS_KEY;

  var request = new XMLHttpRequest();
  var apiURL = "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=" + nytKey;
  request.open('GET', apiURL);
  request.responseType = 'json';
  request.send();
  request.onerror = function () {
    console.log("XHR error");
  };
  request.onload = function () {
    var json = request.response;
    console.log(json);
    $(".list").fadeIn(700);
    createList(json);
  };

  function listItem (book) {
    var item =
      '<div class="component">' +
        '<p class="rank">' + book.rank + '</p>' +
        '<p class="title">' + book.book_details[0].title + '</p>' +
        '<img src="images/placeholder.png" class="cover">' +
        '<p class="author">' + book.book_details[0].author + '</p>' +
        '<p class="synopsis">' + book.book_details[0].description + '</p>' +
        '<ul class="details">' +
          '<li class="publisher">Published by ' + book.book_details[0].publisher + '</li>' +
          '<li class="last-week">Last week: #' + book.rank_last_week + '</li>' +
          '<li class="weeks">Weeks on list: ' + book.weeks_on_list + '</li>' +
          '<li><a href="' + book.amazon_product_url + '" class="amazon" target="_blank">Buy on Amazon</a></li>' +
        '</ul>' +
      '</div>'
    $(".list").append(item);
    return book.rank;
  }
  //placeholder image taken from https://pixabay.com/en/book-literature-pages-paper-1699641/

  function createList (booksData) {
    //booksData is the JSON response from NYT API
    booksData.results.forEach(function (bookData) {
      //bookData is an object having details of a book as properties
      var itemID = listItem(bookData);
      var isbn = bookData.isbns[0].isbn10;
      var request = new XMLHttpRequest();
      if (itemID == 5) {
        //5th item doesn't have its ISBN-10 at index 0
        isbn = bookData.isbns[1].isbn10;
      }
      var apiURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&key=" + googleBooksKey;
      request.open('GET', apiURL);
      request.responseType = 'json';
      request.send();
      request.onerror = function () {
        console.log("XHR error");
      };
      request.onload = function () {
        var json = request.response;
        console.log(json);
        var coverLink = json.items[0].volumeInfo.imageLinks.thumbnail;
        coverLink = coverLink.replace(/^http:\/\//i, 'https://');
        $(".component").eq(--itemID).children().eq(2).attr("src", coverLink);
      };
    });
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
        "font-size": "28px",
        "margin": "0 0 0 18px",
        "border-bottom": "2px solid #000000"});
  }});
});
