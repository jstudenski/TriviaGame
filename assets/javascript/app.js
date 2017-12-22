// add new game button at the

window.onload = function() {

var startGame = false;

// Score
var correct = 0;
var incorrect = 0;
var incomplete = 0;

// Timer stuff
var number;
var intervalId;
var currentQ = 0;


var questions = [
  {
    "question":"Who created of the now-famous chopped and screwed DJ technique?",
    "guesses":["Dj Khaled","DJ Green Lantern","DJ Screw","Dj Drama"],
    "answer":"DJ Screw",
    "image":"djskrew.gif"
  },
  {
    "question":"Who was the top selling artist of the 2000's?",
    "guesses":["Lil Wayne","Eminem","Jay Z","Kanye West"],
    "answer":"Eminem",
    "image":"eminem.gif"
  },
  {
    "question":"Which member of UGK passed away in 2007?",
    "guesses":["Pimp C","Bun B","Andre 3000","Slim Thug"],
    "answer":"Pimp C",
    "image":"pimpc.gif"
  },
  {
    "question":"Who is the female member in the goup Three 6 Mafia?",
    "guesses":["Gangsta Boo","Lil' Kim","Missy Elliott","Lauryn Hill"],
    "answer":"Gangsta Boo",
    "image":"gangstaboo.gif"
  },
  {
    "question":"What was rapper 2 Chainz formerly known as?",
    "guesses":["2 Pistols","Dj Kool","Big Dawg","Tity Boi"],
    "answer":"Tity Boi",
    "image":"chainz.gif"
  },
  {
    "question":"During a 10-day suspension from highschool, who recorded their first mixtape titled 10 Day?",
    "guesses":["Snoop Dogg","Chance the Rapper","Childish Gambino","Vic Mensa"],
    "answer":"Chance the Rapper",
    "image":"chance.gif"
  },
  {
    "question":"In 2017, who produced 10% of all songs on the bilboard top 40?",
    "guesses":["Zaytoven","Sonny Digital","Metro Boomin","Dj Mustard"],
    "answer":"Metro Boomin",
    "image":"metroboomin.gif"
  },
  {
    "question":"Who was only 16 when he recorded his breakout single No Flockin'?",
    "guesses":["Kodak Black","21 Savage","Young Thug","Playboi Carti"],
    "answer":"Kodak Black",
    "image":"kodak.gif"
  }
];


function newQuestion(q) {
  if (startGame === false) {
    $("#time-remaining").hide();
    makeStartBtn();
  } else {
    $("#time-remaining").show();
    startTimer();

    $("#question").html(questions[q].question);
    
    for(i=0; i < questions[q].guesses.length; i++){
      var btn = $("<button>");
      btn.attr("data-guess", questions[q].guesses[i])
        .text(questions[q].guesses[i])
        .click(checkGuess);
      $("#guesses").append(btn);
    }
  }
}

function makeStartBtn(){
  var btn = $("<button>")
    .text("New Game")
    .click(newGame)
    .css("margin-left", "90px");
  $("#guesses").append(btn);
}

function newGame() {
  $("#status").empty();
  startGame = true;
  currentQ = 0;
  $(this).hide();
  newQuestion(currentQ);
}

function checkGuess() {
  ($(this).attr("data-guess") === questions[currentQ].answer) ? displayResult('correct') : displayResult('incorrect');
}

function displayResult(status){
  clearInterval(intervalId);

  $("#question").html('');
  $("#guesses").html('');

  if (status === 'correct') {
    correct++;
    $("#status").html('<br>Correct<br>');

  } else if (status === 'incorrect') {
    incorrect++;
    $("#status").html('<br>Nope!<br>')
      .append('<br>The correct answer was: ' + questions[currentQ].answer);

  } else if (status === 'timeup') {
    incomplete++;
    $("#status").html('Out of Time!')
      .append('<br>The correct answer was: ' + questions[currentQ].answer);
  }

  $('<img/>')
    .attr('src', "assets/images/" + questions[currentQ].image + "")
    .attr('alt', questions[currentQ].answer)
    .width('250px')
    .appendTo($('#status'));
   
  setTimeout(function(){
    $("#status").html('');

    if (currentQ < questions.length-1) {
      newQuestion(++currentQ);
    } else {
      $("#status").html('<br>Game is Over..<br>')
        .append('<br>Correct: ' + correct +'<br>')
        .append('<br>Incorrect: ' + incorrect+'<br>')
        .append('<br>Incomplete: ' + incomplete);
      makeStartBtn();
    }


  }, 3000); //3000

}

function startTimer() {
 number = 30; 
 decrement();
 intervalId = setInterval(decrement, 1000);
}

function decrement() {
  //console.log(number);
  $("#countdown").html(number--);
  if (number < 0) {
    clearInterval(intervalId);
    displayResult('timeup');
  }
}

newQuestion();


} // window.onload