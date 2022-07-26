var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;

function nextSequence() {
  level ++;
  $('h1').text(`Level ${level}`);
  userClickPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

function playSound(name) {
  switch (name) {
    case "red":
        new Audio("sounds/red.mp3").play();
      break;
    case "yellow":
        new Audio("sounds/yellow.mp3").play();
      break;
    case "green":
        new Audio("sounds/green.mp3").play();
      break;
    case "blue":
        new Audio("sounds/blue.mp3").play();
      break;
  };
};

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function (){
            nextSequence();
      }, 1000);
    }
  } else {
      new Audio("sounds/wrong.mp3").play();
      $("body").addClass("game-over");
      $("h1").text("Game over, Press Any Key to Restart");

      setTimeout(function (){
        $("body").removeClass("game-over");
      }, 200);

      startover();
  }
}


$(document).on("keydown", function () {
  if (level === 0) {
    nextSequence();
  }
});

function startover() {
  level = 0;
  gamePattern = [];
}


$(".btn").on("click", function (){
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
})
