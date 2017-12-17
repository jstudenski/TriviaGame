window.onload = function() {

var correct;
var incorrect;
var incomplete;

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


$('button').click( function(){
  console.log(this.id);
});



function generateHTML(q) {

  // console.log(questions[q].guesses)
  $("#question").html(questions[q].question);

  // console.log(questions[q].guesses.length);
  $("#guesses").html('');
  for(i=1; i < questions[q].guesses.length+1; i++){

    // console.log(questions[q].guesses[i-1]);
    var button = $("#guesses")

    $("#guesses").append(questions[q].guesses[i-1]+'<br>');

  }

}
var currentQ = 0;

generateHTML(currentQ);
currentQ++
generateHTML(currentQ);


var number = 30;
var intervalId;


$("#pause").on("click", pause);
$("#resume").on("click", run);


function run() {
 intervalId = setInterval(decrement, 1000);
}

function decrement() {

  number--;

  $("#show-number").html("<h2>" + number + "</h2>");

  if (number === 0) {
    stop();
    console.log("Time Up!!!!!!");
  }

}


function pause() {
  //  Clears our intervalId
  //  We just pass the name of the interval
  //  to the clearInterval function.
  clearInterval(intervalId);
}



run();




} // window.onload