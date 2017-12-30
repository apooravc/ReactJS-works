$(document).ready(function () {

  var prevIcon = '<i class="fa fa-arrow-circle-o-left fa-lg" aria-hidden="true"></i>',
      nextIcon = '<i class="fa fa-arrow-circle-o-right fa-lg" aria-hidden="true">',
      restartIcon = '<i class="fa fa-refresh fa-lg" aria-hidden="true"></i>',
      submitIcon = '<i class="fa fa-check-circle-o fa-lg" aria-hidden="true"></i>',
      plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>',
      minusIcon = '<i class="fa fa-minus" aria-hidden="true"></i>',
      listIcon = '<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i>',
      hashIcon = '<i class="fa fa-hashtag" aria-hidden="true"></i>';

  var state = 0; /* state 0 --> user is on homePage
                    state 1 --> user is undergoing test
                  */


  function homePageLayout() {
    $(".question-id").empty().append("question " + hashIcon);
    $(".question-points").children().eq(0).empty().append(plusIcon + " points");
    $(".question-points").children().eq(1).empty().append(minusIcon + " points");
    $(".question").empty().append("Welcome! This is a timed-test on Astronomy consisting of MCQs");
    $(".choice").eq(0).empty().append(listIcon + " each question is assigned some " + plusIcon + " & " + minusIcon + " points");
    $(".choice").eq(1).empty().append(listIcon + " there will be 4 options for each question");
    $(".choice").eq(2).empty().append(listIcon + " you've got 3 minutes to complete the test");
    $(".choice").eq(3).empty().append(listIcon + " good luck!");
    $("#right").empty().append("start " + nextIcon);

    $("#hide").fadeIn(1300);
    $("ul#hide").fadeIn(1300);
    $("li#right").fadeIn(1300);
  }

  homePageLayout();

  var appData = [{
    questionId: "1",
    questionPoints: [+3, 1],
    question: "What is the day on which the Sun’s direct rays cross the celestial equator called?",
    questionChoices: ["the solstice", "the equinox", "easter", "ecliptic"],
    correctChoice: "the equinox",
    selectedChoice: ""
  },
  {
    questionId: "2",
    questionPoints: [+1.5, 1.5],
    question: "Who invented the telescope?",
    questionChoices: ["Hans Lippershey", "Archimedes", "Galileo", "Johannes Kepler"],
    correctChoice: "Hans Lippershey",
    selectedChoice: ""
  },
  {
    questionId: "3",
    questionPoints: [+3.5, 0.5],
    question: "Which of these objects is the farthest from the Sun?",
    questionChoices: ["Saturn", "Kuiper Belt", "Neptune", "90377 Sedna"],
    correctChoice: "90377 Sedna",
    selectedChoice: ""
  },
  {
    questionId: "4",
    questionPoints: [+5, 2],
    question: "What term describes the alignment of three celestial bodies?",
    questionChoices: ["sizzle", "syzygy", "symbology", "suzerainty"],
    correctChoice: "syzygy",
    selectedChoice: ""
  }
  ];

  var index = 0; // index refers to question number
  function changeQuestion() {
    $(".question-id").empty().append(hashIcon + " " + appData[index].questionId);
    $(".question-points").children().eq(0).empty().append(plusIcon + " " + appData[index].questionPoints[0]);
    $(".question-points").children().eq(1).empty().append(minusIcon + " " + appData[index].questionPoints[1]);
    $(".question").empty().append(appData[index].question);
    $(".choice").eq(0).empty().append(listIcon + " " + appData[index].questionChoices[0]);
    $(".choice").eq(1).empty().append(listIcon + " " + appData[index].questionChoices[1]);
    $(".choice").eq(2).empty().append(listIcon + " " + appData[index].questionChoices[2]);
    $(".choice").eq(3).empty().append(listIcon + " " + appData[index].questionChoices[3]);
  }

  $("ul.question-points").children().eq(0).css("background-color", "#01FF70");
  $("ul.question-points").children().eq(1).css("background-color", "#FF4136");

  function startTimer(duration, element) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      element.empty().append(minutes + " : " + seconds);
      timer--;
      if (timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  function startTest() {
    changeQuestion();
    $("li#left").show().empty().append(restartIcon + " Restart");
    $("li#right").empty().append("Next " + nextIcon);
  }

  function choiceOnSelect() {
    if (state != 0) {
      var choices = $(".choice");
      choices.removeClass("choice-on-select");
      for (var i = 0; i < 4; i++)  {
        if (choices.eq(i).text() === appData[index].selectedChoice) {
          choices.eq(i).addClass("choice-on-select");
          break;
        }
      }
    }
  }

  $("#left").on("click", function() {
    if (state == 1 && index == 0) {

      state = 0;
      index = 0;
      window.location.replace("index.html");

    } else if (state == 1 && index == 1) {

      $("#left").empty().append(restartIcon + " Restart");
      index--;
      changeQuestion();
      choiceOnSelect();

    } else if (state == 1 && index == 3) {

      $("#right").empty().append("Next " + nextIcon);
      index--;
      changeQuestion();
      choiceOnSelect();

    } else {

      index--;
      changeQuestion();
      choiceOnSelect();

    }
  });

  $("#right").on("click", function() {
    if (state == 0) {

      state = 1;
      var element = $(".timer");
      startTimer(179, element);
      startTest();

    } else if (state == 1 && index == 0) {

      $("#left").empty().append(prevIcon + " Prev");
      index++;
      changeQuestion();
      choiceOnSelect();

    } else if (state == 1 && index == 2) {

      $("#right").empty().append("Submit " + submitIcon);
      index++;
      changeQuestion();
      choiceOnSelect();

    } else {
      index++;
      changeQuestion();
      choiceOnSelect();
    }
  });

  $(".choice").hover(function() {
    if (state != 0) {
      $(this).addClass("choice-on-hover");
    }
  }, function () {
    if (state != 0) {
      $(this).removeClass("choice-on-hover");
    }
  });

  $(".choice").on("click", function() {
    if (state != 0) {
      $(".choice").removeClass("choice-on-select");
      $(this).addClass("choice-on-select");
      appData[index].selectedChoice = $(this).text();
    }
  });

});

