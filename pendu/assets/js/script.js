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
var inputAnswerWord = document.getElementById("try_word");
var inputAnswerWordButton = document.getElementById("verify_button_word");

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
    startGame(wordToGuess, wordLetters);

};

function startGame(wordToGuess,wordLetters) {
    var inputTable = [];
    var letterList = document.querySelectorAll(".letter");

    inputAnswerButton.addEventListener("click", function () {
        if (inputAnswer.value === "") {
            inputAnswer.style.borderColor = "red";
        } else {
            var verify = false;
            inputLetter = inputAnswer.value;

            lettersSubmitted.insertAdjacentHTML("afterbegin", "<span class='letterTried'>" + inputLetter + "</span>");
            
            for(var i = 0; i<=inputTable.length; i++) {
                if(inputTable[i]!=inputLetter) {
                    inputTable.push(inputLetter);
                    console.log("ajouté");
                    console.log(inputTable);
                    for (var i = 0; i < wordLetters.length; i++) {
                        if (wordLetters[i] == inputLetter) {
                            letterList[i].innerHTML = inputLetter;
                            winPoint++;
                            verify=true;
                            if (wordLetters.length == winPoint) {
                                winPage.style.display = "block";
                            };
                        }
                    };
                    break
                }else {
                    console.log("déjà");
                    console.log(inputTable);
                    break
                }
            }

            if(!verify){
                console.log(loosePoint)
                    loosePoint--;
                    pendu.src = "assets/img/Frame" + loosePoint + ".svg";
                    if (loosePoint == 1) {
                        lostPage.style.display = "block";
                    }
            }
        };
    });
    inputAnswerWordButton.addEventListener("click", function(){
        if (inputAnswerWord.value===""){
            inputAnswerWord.style.borderColor="red";
        } else {
            if(inputAnswerWord.value===wordToGuess) {
                winPage.style.display = "block";
                for(var i = 0; i<wordLetters.length; i++) {
                    letterList[i].innerHTML = wordLetters[i];
                }
            }
        }
    })
}

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