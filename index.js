// declaring the sound effects, colors and storing them in
// an array for easy access
//
// created a regular expression to get character inputs from
// keyboard
//
// declaring the default level, patterns, and user patterns
let sfx = [
  new Audio("assets/sounds/green.mp3"),
  new Audio("assets/sounds/red.mp3"),
  new Audio("assets/sounds/yellow.mp3"),
  new Audio("assets/sounds/blue.mp3"),
  new Audio("assets/sounds/wrong.mp3"),
];
const colors = ["green", "red", "yellow", "blue"];
let regex = new RegExp("[a-zA-Z]");
let level = 1;
let patterns = [];
let userPatterns = [];
let start = false;

// initializing the game by checking if there are any keystrokes
// detected from the document. it then checks if the value of start
// is false, if it is then set start to true then calling the playing() function
$(document).on("keypress", function () {
  if (!start) {
    $("h1").hide();
    $("h2").html(`${level}`).css({ animation: "0s" });
    start = true;
    lightIndicator();
  }
});

// for the meantime, it disables the keydown event and only
// listens to events of "click" from .tile class
//
// by calling the lighIndicator function it displays the first level
// of the pattern by random of any of the segments
//
// as it listens for mouse click inputs, getting the classname of where the user
// has clicked on any of the segments shall stored in the selectedColor
//
// after that, calling the userAnswer function performs the following:
// 1.) storing the selectedColor, 2.) plays a sound of the corresponding color,
// 3.) and does a glow effect once clicked
//
// after that, it checks whether the arrays of userPatterns, and 
$(".tile").on("click", function (event) {
  let selectedColor = event.target.className.split(" ")[2];
  userAnswer(selectedColor);
  checkAnswer(userPatterns.length - 1);
});

function checkAnswer(index) {
  if (userPatterns[index] === patterns[index]) {
    if (patterns.toString() === userPatterns.toString()) {
      setTimeout(function () {
        lightIndicator();
        nextLevel();
        userPatterns = [];
      }, 1000);
    }
  } else {
    sfx[4].play();
    $(".container").addClass("game-over");
    $("h1").show().html("Game Over! Press Any Key To Restart");
    $("h2").html(`${level}`).css({ animation: "0s" });
    setTimeout(function () {
      $(".container").removeClass("game-over");
    }, 200);
    restartGame();
  }
}

function userAnswer(selectedColor) {
  switch (selectedColor) {
    case "green":
      userPatterns.push(selectedColor);
      colorClicked("zero", colors[0]);
      sfx[0].play();
      break;
    case "red":
      userPatterns.push(selectedColor);
      colorClicked("one", colors[1]);
      sfx[1].play();
      $(".red").fadeOut(200).fadeIn(200);
      break;
    case "yellow":
      userPatterns.push(selectedColor);
      colorClicked("two", colors[2]);
      sfx[2].play();
      $(".yellow").fadeOut(200).fadeIn(200);
      break;
    case "blue":
      userPatterns.push(selectedColor);
      colorClicked("three", colors[3]);
      sfx[3].play();
      $(".blue").fadeOut(200).fadeIn(200);
      break;
  }
}

function restartGame() {
  start = false;
  level = 1;
  patterns = [];
  userPatterns = [];
  $('.tile-container').css({animation: ''});
  $("h1").hide();
}

function nextLevel() {
  level++;
  $("h2").html(`${level}`).css({ animation: "0s" });

  if (level >= 10){
    $('.tile-container').css({animation: 'spin 30s infinite linear'});
  }
  if (level == 20){
    
    $("h1").show().html("Congratulations! 🎊");
  }
   
}

function lightIndicator() {
  let randTile = Math.floor(Math.random() * 4);
  switch (randTile) {
    case 0:
      sfx[0].play();
      colorShow("zero", colors[0]);
      patterns.push(colors[0]);
      console.log("green");
      break;
    case 1:
      sfx[1].play();
      colorShow("one", colors[1]);
      patterns.push(colors[1]);
      console.log("red");
      break;
    case 2:
      sfx[2].play();
      colorShow("two", colors[2]);
      patterns.push(colors[2]);
      console.log("yellow");
      break;
    case 3:
      sfx[3].play();
      colorShow("three", colors[3]);
      patterns.push(colors[3]);
      console.log("blue");
      break;
    default:
      console.log("created by riqi.iii");
  }
}

function colorShow(index, color) {
  $(document).ready(function () {
    var effect = $(`.${index}`).addClass(`${color}-show`);

    setTimeout(function () {
      effect.fadeOut(133).fadeIn(133).removeClass(`${color}-show`);
    }, 133);
  });
}

function colorClicked(index, color) {
  $(document).ready(function () {
    var effect = $(`.${index}`).addClass(`${color}-clicked`);

    setTimeout(function () {
      effect.fadeOut(66).fadeIn(66).removeClass(`${color}-clicked`);
    }, 66);
  });
}
