/* 
* Author : Rohit Vishwakarma
* Email : rv021561@gmail.com
*/
var colors = ["red" ,"blue", "green", "yellow"];
var started = false;
var userOn = true;
var level = 0;

// Arrays and storage 

var userInputPattern = [];
var gameInputPattern = [];

// Events and triggers uses jQuery 

$("body").on("keypress",function(){
    if(!started){
    var next = nextSequence();
    animation(next);
    gameInputPattern.push(next);
    started = true;
    userOn = false;
    level++;
    document.getElementById("level-title").textContent = "level "+level;
    }
});

$(".btn").on("click",function(){
    if(!userOn){
        var color = this.id;
        console.log(color);
        animation(color);
        userInputPattern.push(color);
        if(userInputPattern.length === gameInputPattern.length){
            if(checkPattern(userInputPattern.length - 1)){
                var next = nextSequence();
                animation(next);
                gameInputPattern.push(next);
                userOn = false;
                level++;
                document.getElementById("level-title").textContent = "level "+level;
                userInputPattern = [];
            }
            else{
                document.getElementById("level-title").textContent = "Press A Key to Start";
                started = false;
                userOn = true;
                level = 0;
                userInputPattern = [];
                gameInputPattern = [];
                var name = new Audio("sounds/wrong.mp3");
                name.play();
            }
        }   
    }
});

// Animations and randomization // 

function animation(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
        var colorSound = new Audio('sounds/'+color+".mp3");
        colorSound.play();
    },150);
}

function checkPattern(index){
    if(gameInputPattern[index] === userInputPattern[index]){
        return true;
    }
    else{
        return false;
    }
}


function nextSequence(){
    var index = Math.floor(Math.random() * 4);
    return colors[index];
}

