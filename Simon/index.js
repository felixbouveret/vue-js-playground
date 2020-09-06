const START_BUTTON = document.querySelector(".st-button");
const SIMON_BLOCKS = [
  document.querySelector(".yellow"),
  document.querySelector(".blue"),
  document.querySelector(".green"),
  document.querySelector(".red"),
];
const BODY = document.querySelector("body");

const SOUNDS = [
  new Audio("sounds/yellow.mp3"),
  new Audio("sounds/blue.mp3"),
  new Audio("sounds/green.mp3"),
  new Audio("sounds/red.mp3"),
];
const ERROR_SOUND = new Audio("sounds/error.mp3");

let SIMON_PATH = [];
let PLAYER_PATH = [];

let launchedOnce = false;

// -----
// -----
// -----

const startSimon = () => {
  START_BUTTON.removeEventListener("click", startSimon);
  preparSimon();
  initSimon();
  launchedOnce = true;
};

const simonTurn = () => {
  const randomBlock = Math.floor(Math.random() * 4);
  SIMON_PATH.push(randomBlock);

  let blockIndex = 0;

  const blockTimer = setInterval(() => {
    turnOffBlocks();

    if (blockIndex === SIMON_PATH.length) {
      blockIndex = 0;
      window.clearInterval(blockTimer);
    } else {
      blockSound(SIMON_PATH[blockIndex]);
      SIMON_BLOCKS[SIMON_PATH[blockIndex]].classList.add(
        "simon-block--keyd-down"
      );
      setTimeout(() => {
        if (SIMON_BLOCKS[SIMON_PATH[blockIndex]]) {
          turnOffBlocks();
        }
      }, 400);
    }

    blockIndex++;
  }, 700);
};

const turnOffBlocks = () => {
  for (let i = 0; i < SIMON_BLOCKS.length; i++) {
    const element = SIMON_BLOCKS[i];
    element.classList.remove("simon-block--keyd-down");
  }
};

const checkPlayerMoves = () => {
  for (let i = 0; i < PLAYER_PATH.length; i++) {
    const element = PLAYER_PATH[i];
    if (element !== SIMON_PATH[i] || PLAYER_PATH.length > SIMON_PATH.length) {
      return false;
    }
  }
  return true;
};

const stopSimon = () => {
  ERROR_SOUND.load();
  ERROR_SOUND.play();
  BODY.classList.add("error");
  setTimeout(() => {
    BODY.classList.remove("error");
  }, 1000);

  setTimeout(() => {
    turnOffBlocks();
  }, 400);
  SIMON_PATH = [];
  PLAYER_PATH = [];
  switchButton();
  START_BUTTON.addEventListener("click", startSimon);
};

const initSimon = () => {
  SIMON_PATH = [];
  PLAYER_PATH = [];
  if (!launchedOnce) {
    for (let block = 0; block < SIMON_BLOCKS.length; block++) {
      const element = SIMON_BLOCKS[block];
      function elementFunction() {
        PLAYER_PATH.push(block);

        turnOffBlocks();

        setTimeout(() => {
          turnOffBlocks();
        }, 400);

        this.classList.add("simon-block--keyd-down");

        blockSound(block);

        if (!checkPlayerMoves()) {
          stopSimon();
        } else if (PLAYER_PATH.length === SIMON_PATH.length) {
          setTimeout(() => {
            turnOffBlocks();
          }, 400);

          PLAYER_PATH = [];

          setTimeout(() => {
            simonTurn();
          }, 500);
        }
      }

      element.addEventListener("click", elementFunction);
    }
  }
};

const blockSound = (blockId) => {
  SOUNDS[blockId].load();
  SOUNDS[blockId].play();
};

const preparSimon = () => {
  for (let blockIndex = 0; blockIndex < SIMON_BLOCKS.length; blockIndex++) {
    const element = SIMON_BLOCKS[blockIndex];
    element.classList.add("simon-block--keyd-down");
    setTimeout(() => {
      element.classList.remove("simon-block--keyd-down");
    }, 500);
  }

  setTimeout(() => {
    simonTurn();
  }, 500);
};

const switchButton = () => {
  START_BUTTON.innerHTML = "Restart !";
  START_BUTTON.classList.add("secondary-button");
};

START_BUTTON.addEventListener("click", startSimon);
