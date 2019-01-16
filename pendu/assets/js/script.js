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
var guessWordLetters = document.querySelector(".word");

var inputAnswer = document.getElementById("try");
var inputAnswerButton = document.getElementById("verify_button");
var winPoint = 0;
var loosePoint = 11;

var winButton = document.querySelector(".win span");
var lostButton = document.querySelector(".lost span");


function setCookie(cookieName, cookieValue) {
    document.cookie = cookieName + "=" + cookieValue + ";";
}
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}


inputWordButton.addEventListener("click", function () {
    if (inputWord.value === "") {
        inputWord.style.borderColor = "red";
    } else {
        var cookieName = "wordToGuess";
        var cookieValue = inputWord.value;
        setCookie(cookieName, cookieValue);
        var wordToGuess = getCookie("wordToGuess");
        selectWordPage.style.display = "none";
        playingPage.style.display = "block";
        initPendu(wordToGuess);
    }
});


function initPendu(wordToGuess) {
    var wordLetters = wordToGuess.split("");
    for (var i = 0; i < wordLetters.length; i++) {
        guessWordLetters.insertAdjacentHTML("afterbegin", "<span class='letter'>_</span>");
    };
};

//probleme de comptage des erreures et des bonnes réponses. Si "EEAAEE" et que "E" alors 4 bonnes réponses (4*winPoint++) et 2 erreures (2*loosePoint--) et peut etre repeté x fois

inputAnswerButton.addEventListener("click", function () {
    if (inputAnswer.value === "") {
        inputAnswer.style.borderColor = "red";
    } else {
        var wordToGuess = getCookie("wordToGuess");
        var wordLetters = wordToGuess.split("");
        inputLetter = inputAnswer.value;
        lettersSubmitted.insertAdjacentHTML("afterbegin", "<span class='letterTried'>" + inputLetter + "</span>");

        for (var i = 0; i < wordLetters.length; i++) {

            if (wordLetters[i] == inputLetter) {
                var letterList = document.querySelectorAll(".letter");
                letterList[i].innerHTML = inputLetter;
                winPoint++;
                if (wordLetters.length == winPoint) {
                    winPage.style.display = "block";
                };
            }else{
                console.log(loosePoint)
                loosePoint--;
                pendu.src = "assets/img/Frame" + loosePoint + ".svg";
                if(loosePoint==1) {
                    lostPage.style.display = "block";
                }
            };
        };
    };
});

winButton.addEventListener("click", function () {
    location.reload();
});
lostButton.addEventListener("click", function () {
    location.reload();
});

function initJs() {
    playingPage.style.display = "none";
    winPage.style.display = "none";
    lostPage.style.display = "none";
};

function onLoadEvent() {
    initJs();
};

window.onload = onLoadEvent();