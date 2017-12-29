$(document).ready(function () {
  var appData = [{
    questionId: "1",
    questionPoints: [+3, 1],
    question: "What is the day on which the Sun’s direct rays cross the celestial equator called?",
    questionChoices: ["the solstice", "the equinox", "easter", "ecliptic"],
    correctChoice: "the equinox"
  },
  {
    questionId: "2",
    questionPoints: [+1.5, 1.5],
    question: "Who invented the telescope?",
    questionChoices: ["Hans Lippershey", "Archimedes", "Galileo", "Johannes Kepler"],
    correctChoice: "Hans Lippershey"
  },
  {
    questionId: "3",
    questionPoints: [+3.5, 0.5],
    question: "Which of these objects is the farthest from the Sun?",
    questionChoices: ["Saturn", "Kuiper Belt", "Neptune", "90377 Sedna"],
    correctChoice: "90377 Sedna"
  },
  {
    questionId: "4",
    questionPoints: [+5, 2],
    question: "What term describes the alignment of three celestial bodies?",
    questionChoices: ["sizzle", "syzygy", "symbology", "suzerainty"],
    correctChoice: "syzygy"
  }
  ];

  var index = 0;
  function changeContent() {
    $(".questionId").empty().append('<i class="fa fa-question fa-lg" aria-hidden="true"></i> ' + appData[index].questionId);
    $(".questionPoints").children().eq(0).empty().append('<i class="fa fa-plus" aria-hidden="true"></i> ' + appData[index].questionPoints[0]);
    $(".questionPoints").children().eq(1).empty().append('<i class="fa fa-minus" aria-hidden="true"></i> ' + appData[index].questionPoints[1]);
    $(".question").empty().append(appData[index].question);
    $(".choice").eq(0).empty().append('<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i> ' + appData[index].questionChoices[0]);
    $(".choice").eq(1).empty().append('<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i> ' + appData[index].questionChoices[1]);
    $(".choice").eq(2).empty().append('<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i> ' + appData[index].questionChoices[2]);
    $(".choice").eq(3).empty().append('<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i> ' + appData[index].questionChoices[3]);
  }

  changeContent();
  $("ul.questionPoints").children().eq(0).css("background-color", "#01FF70");
  $("ul.questionPoints").children().eq(1).css("background-color", "#FF4136");
  $("#appear").fadeIn(1300);
  $("ul#appear").fadeIn(1300);

  $("#prev").on("click", function () {
    index--;
    changeContent();
  });

  $("#next").on("click", function () {
    index++;
    changeContent();
  });
});

