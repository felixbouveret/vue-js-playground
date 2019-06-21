let startButton = document.querySelector(".start");
let stopButton = document.querySelector(".stop");
let intervalButton = document.querySelector(".interval");
let intervalInstructions = document.querySelector(".interval_container span");
let pointsDisplay = document.querySelector(".points");

let snakeRow = document.querySelectorAll(".snake_row");
let snakeGrid= [];
for(let i = 0; i<snakeRow.length; i++) {
    getAllRows = snakeGrid.push(snakeRow[i].querySelectorAll(".snake_block"));
}
let snakeBlock = document.querySelectorAll(".snake_block");

let clientIntervalValue = 100;
let intervalFunction;

let points = 0;
let bodyLength = 0


let positionX = 12;
let positionY = 12;

let directionX = -1;
let directionY = 0;

function randomPointLocalisation(){
    let randomSnakeBlock = Math.floor(Math.random() * snakeBlock.length);
    if(snakeBlock[randomSnakeBlock].active===true) {
        randomPointLocalisation();
    }
    else {
        snakeBlock[randomSnakeBlock].point = true;
        checkSnakeBlockColor()
    }
}



function resetGame() {
    clearInterval(intervalFunction);
    startButton.launch = false;

    positionX = 12;
    positionY = 12;
    
    directionX = -1;
    directionY = 0;

    for(let i = 0; i<snakeBlock.length; i++) {
        snakeBlock[i].active=false;
        snakeBlock[i].point=false;
    };

    checkSnakeBlockColor()
};

function checkSnakeBlockColor() {
    for(let i = 0; i<snakeBlock.length; i++) {
        if(snakeBlock[i].active===false && snakeBlock[i].point != true) {
            snakeBlock[i].style.backgroundColor="black";
        }else if(snakeBlock[i].active===true && snakeBlock[i].point != true || snakeBlock[i].head===true && snakeBlock[i].point != true){
            if(snakeBlock[i].head===true){
                snakeBlock[i].style.backgroundColor="white";
            } else{
                snakeBlock[i].style.backgroundColor="white";
            }
        } else {
            snakeBlock[i].style.backgroundColor = "green";
        }
    };
}

function isOutOfPlayground(positionX,positionY) {
    if(positionX<0) {
        resetGame();
    }
    if(positionX>24) {
        resetGame();
    }
    if(positionY<0) {
        resetGame();
    }
    if(positionY>24) {
        resetGame();
    }
}

function gameRules(positionX,positionY) {
    for(let i = 0; i<snakeBlock.length; i++) {
        // snakeBlock[i].active = false;
        snakeBlock[i].head = false;

    };
    
    snakeGrid[positionX][positionY].head = true;
    snakeGrid[positionX][positionY].active = true;

    checkSnakeBlockColor();

    snakeGrid[positionX][positionY].body = points;

    for(let i = 0; i<snakeBlock.length; i++) {
        if(snakeBlock[i].body==0) {
            snakeBlock[i].active = false;
        } else {
            snakeBlock[i].body--;
        }
    };



    if(snakeGrid[positionX][positionY].active === true && snakeGrid[positionX][positionY].point===true) {
        snakeGrid[positionX][positionY].point=false;
        checkSnakeBlockColor();
        randomPointLocalisation();
    }

}




function initGame() {

    if(!startButton.launch) {
        points = 0;
        pointsDisplay.innerHTML = points;

        for(let i = 0; i<snakeBlock.length; i++) {
            snakeBlock[i].active=false;
        };

        
        snakeGrid[positionX][positionY].head = true; 
        
        randomPointLocalisation();

        intervalFunction = window.setInterval(function () {

            document.addEventListener("keydown", function(event){

                directionX = directionKeyX();
                directionY = directionKeyY();

                function directionKeyX(){
                    if(event.keyCode===38) {
                      if(directionX == 1){
                      } else {
                        directionX = -1;
                      }
                    }
                    else if(event.keyCode===40) {
                      if(directionX == -1){
                      }else{
                        directionX = 1;
                      } 
                    }
                    else {
                        directionX = 0;
                    };
                    return directionX;                        
                };
                function directionKeyY(){
                    if(event.keyCode===37) {
                      if(directionY == 1){
                      }else{
                        directionY = -1;
                      }
                    }
                    else if(event.keyCode===39) {
                      if(directionY == -1){
                      }else{
                        directionY = 1;
                      }
                    }
                    else {
                        directionY = 0;
                    };
                    return directionY;
                };

            });


            positionX += directionX;
            positionY += directionY;


            isOutOfPlayground(positionX,positionY)
            
            if(snakeGrid[positionX][positionY].point) {
                points++;
                pointsDisplay.innerHTML = points;
            }

            if(snakeGrid[positionX][positionY].active) {
                resetGame();
            }else {
                gameRules(positionX,positionY);
            }
            

            

        }, clientIntervalValue);  
    };
    startButton.launch = true;
};











intervalButton.addEventListener("input", function(){
    clientIntervalValue= this.value;
});
intervalButton.addEventListener("focus", function() {
    intervalInstructions.style.color="white";
})
intervalButton.addEventListener("blur", function() {
    intervalInstructions.style.color="black";
})



startButton.addEventListener("click", initGame);
stopButton.addEventListener("click", resetGame);