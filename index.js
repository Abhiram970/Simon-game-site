var gamepattern = new Array();
var buttons = new Array("red","yellow","blue","green");
var userClickedPattern = new Array();
var level = 0;
var started = false;

$(document).keypress(function(){
    
    if (!started)
    {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var id = $(this).attr("id")
    userClickedPattern.push(id);
    playsound(id);
    animatepress(id);
    checkans(userClickedPattern.length - 1);
})


function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var x = Math.floor(Math.random() * 4);
    var chosen = buttons[x];
    gamepattern.push(chosen);
    animatepress(chosen);
    playsound(chosen);
}

function playsound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatepress(color)
{
    $("#"+color).addClass("pressed");
    setTimeout(() => {  $("#"+color).removeClass("pressed") }, 100);
}

function checkans(level)
{
    if (gamepattern[level] === userClickedPattern[level]) {

        console.log("success");
        level++;
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamepattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } 
      else {
        $("body").addClass("game-over");
        setTimeout(() => {  $("body").removeClass("game-over") }, 100);
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        console.log("wrong");
        $("h1").text("Press a key to start again");
        startOver();
      }
}

function startOver(){
    started = false;
    level = 0;
    gamepattern = [];
}