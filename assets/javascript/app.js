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

    var btn = $("<button>");
    btn.text("Start");
    btn.click(newGame);

    $("#guesses").append(btn);

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





function test(){
  console.log("123");
}
// var myVar;

// function myFunction() {
//     myVar = setTimeout(alertFunc, 3000);
// }

// function alertFunc() {
//     alert("Hello!");
// }




function newGame() {
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