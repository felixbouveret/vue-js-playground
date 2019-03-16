var container = document.querySelector("section");
var block = document.querySelectorAll(".row");
var playerWin = document.querySelector(".winner");
var restartButton = document.querySelector(".restart");
var player = !player;
var victoire;
var stuckStatut = 0;
var board = document.querySelector(".morpion");
var stuckPoint;

restartButton.addEventListener("click", function(){
    location.reload();
});
function winTest() {
    //colone gauche
    if (block[0].checked == true && block[1].checked == true && block[2].checked == true || block[0].checked == false && block[1].checked == false && block[2].checked == false) {
        block[0].style.borderColor = "red";
        block[1].style.borderColor = "red";
        block[2].style.borderColor = "red";
        victoire = true;
    }
    //colone milieu
    if (block[3].checked == true && block[4].checked == true && block[5].checked == true || block[3].checked == false && block[4].checked == false && block[5].checked == false) {
        block[3].style.borderColor = "red";
        block[4].style.borderColor = "red";
        block[5].style.borderColor = "red";
        victoire = true;
    }
    //colone droite
    if (block[6].checked == true && block[7].checked == true && block[8].checked == true || block[6].checked == false && block[7].checked == false && block[8].checked == false) {
        block[6].style.borderColor = "red";
        block[7].style.borderColor = "red";
        block[8].style.borderColor = "red";
        victoire = true;
    }
    //diagonale descendante
    if (block[0].checked == true && block[4].checked == true && block[8].checked == true || block[0].checked == false && block[4].checked == false && block[8].checked == false) {
        block[0].style.borderColor = "red";
        block[4].style.borderColor = "red";
        block[8].style.borderColor = "red";
        victoire = true;
    }
    //diagonale montante
    if (block[2].checked == true && block[4].checked == true && block[6].checked == true || block[2].checked == false && block[4].checked == false && block[6].checked == false) {
        block[2].style.borderColor = "red";
        block[4].style.borderColor = "red";
        block[6].style.borderColor = "red";
        victoire = true;
    }
    //ligne haute
    if (block[0].checked == true && block[3].checked == true && block[6].checked == true || block[0].checked == false && block[3].checked == false && block[6].checked == false) {
        block[0].style.borderColor = "red";
        block[3].style.borderColor = "red";
        block[6].style.borderColor = "red";
        victoire = true;
    }
    //ligne milieu
    if (block[1].checked == true && block[4].checked == true && block[7].checked == true || block[1].checked == false && block[4].checked == false && block[7].checked == false) {
        block[1].style.borderColor = "red";
        block[4].style.borderColor = "red";
        block[7].style.borderColor = "red";
        victoire = true;
    }
    //ligne basse
    if (block[2].checked == true && block[5].checked == true && block[8].checked == true || block[2].checked == false && block[5].checked == false && block[8].checked == false) {
        block[2].style.borderColor = "red";
        block[5].style.borderColor = "red";
        block[8].style.borderColor = "red";
        victoire = true;
    }
}

function victory() {
    if (victoire == true) {
        board.style.pointerEvents = "none";
        restartButton.style.display="block";

        if (player) {
            playerWin.innerHTML = "The cross wins";
        } else {
            playerWin.innerHTML = "The circle wins";
        }
        return true;
    } else {
        return false;
    }
}

function playerClick(i) {
    block[i].addEventListener("click", function () {
        player = !player;
        if (player) {
            block[i].innerHTML="<span class='cross'></span>";
            block[i].style.pointerEvents = "none";
            block[i].checked = true;
            block[i].played = true;
            stuckStatut++;
            playerWin.innerHTML = "Circle's turn"
        } else {
            block[i].innerHTML="<span class='circle'></span>";
            block[i].style.pointerEvents = "none";
            block[i].checked = false;
            block[i].played = true;
            stuckStatut++;
            playerWin.innerHTML = "Cross's turn";
        }
        winTest()
        victory(player)
        stuckPoint = victory();
        if (stuckPoint == false && stuckStatut == 9) {
            board.style.pointerEvents = "none"
            container.style.border = "red solid 1px";
            playerWin.innerHTML = "No more move";
            restartButton.style.display="block";
        }
    })
}
for (var i = 0; i < block.length; i++) {
    playerClick(i);
}

