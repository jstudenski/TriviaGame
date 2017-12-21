// add new game button at the

window.onload = function() {

var startGame = false;

// Score
var correct = 0;
var incorrect = 0;
var incomplete = 0;

var questions = [
  {
    "question":"What is 1 + 1",
    "guesses":["one","two","three","four"],
    "answer":"two"
  },
  {
    "question":"Fav Color",
    "guesses":["Red","Blue","Yellow","Black"],
    "answer":"Black"
  },
  {
    "question":"Birth Year",
    "guesses":["1991","2000","1995","1899"],
    "answer":"1991"
  }
];

// Timer stuff
var number;
var intervalId;
var currentQ = 0;

function newQuestion(q) {

  if (startGame === false) {
    $("#time-remaining").hide();
    makeStartBtn()
  } else {
    $("#time-remaining").show();

    startTimer();

    $("#question").html(questions[q].question);

    for(i=0; i < questions[q].guesses.length; i++){
      var btn = $("<button>");
     //  btn.addClass("guess");
      btn.attr("data-guess", questions[q].guesses[i]);
      btn.text(questions[q].guesses[i]);
      btn.click(checkGuess);
      $("#guesses").append(btn);
    }

  };
};



function makeStartBtn(){
  var btn = $("<button>");
  btn.text("New Game");
  btn.click(newGame);
  btn.css("margin-left", "90px");
  $("#guesses").append(btn);
}

function newGame() {
  $("#status").empty();
  startGame = true;
  currentQ = 0;
  $(this).hide();
  newQuestion(currentQ);
};


function checkGuess() {

  ($(this).attr("data-guess") === questions[currentQ].answer) ? displayResult('correct') : displayResult('incorrect');
}


function displayResult(status){
  clearInterval(intervalId);

  $("#question").html('');
  $("#guesses").html('');

  if (status === 'correct') {
    correct++;

    $("#status").html('Correct');

  } else if (status === 'incorrect') {
    incorrect++;

    $("#status").html('Nope!');
    $("#status").append('<br>The correct guess was: ' + questions[currentQ].answer);

  } else if (status === 'timeup') {
    incomplete++;

    $("#status").html('Out of Time!');
    $("#status").append('<br>The correct guess was: ' + questions[currentQ].answer);
    
  }
 
  setTimeout(function(){
    $("#status").html('');

    if (currentQ < questions.length-1) {
      newQuestion(++currentQ);
    } else {
      $("#status").html('Game is Over..');
      $("#status").append('<br>Correct: ' + correct);
      $("#status").append('<br>Incorrect: ' + incorrect);
      $("#status").append('<br>Incomplete: ' + incomplete);
      makeStartBtn();
    }


  }, 3000);

}



function startTimer() {
 number = 10; 
 decrement();
 intervalId = setInterval(decrement, 1000);
}

function decrement() {
  console.log(number);
  $("#countdown").html(number);
  number--

  if (number < 0) {
    clearInterval(intervalId);
    displayResult('timeup');
  }


}

newQuestion();


} // window.onload