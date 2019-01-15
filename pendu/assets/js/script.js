//PAGES---------------
var selectWordPage = document.querySelector(".init_word");
var playingPage = document.querySelector(".playing");
var winPage = document.querySelector(".win");
var lostPage = document.querySelector(".lost");

//ELEMENTS------------
var inputWord = document.getElementById("word");
var inputWordButton = document.getElementById("input_button");

var pendu = document.querySelector(".pendu_img");

var lettersSubmitted = document.querySelector(".letters");
var guessWord = document.querySelector(".word");



function initJs() {
    playingPage.style.display = "none";
    winPage.style.display = "none";
    lostPage.style.display = "none";
}

function onLoadEvent(){
    initJs();
};

window.onload = onLoadEvent();