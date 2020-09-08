const squareContainer = document.querySelector(".test");
const square = squareContainer.querySelector(".square");
const redDot = document.querySelector(".red-dot");

let isSquareClicked = false;

if (isSquareClicked) {
  console.log(isSquareClicked);
}

const dotPosition = (e) => {
  const clickPosition = {
    y: e.offsetY,
    x: e.offsetX,
  };
  console.log(e);

  square.style.top = e.y - clickPosition.y + "px";
  square.style.left = e.x - clickPosition.x + "px";
};

const squareClicked = (bool) => {
  isSquareClicked = bool;
  console.log(bool);
  if (bool) {
    squareContainer.addEventListener("mousemove", dotPosition);
  } else {
    squareContainer.removeEventListener("mousemove", dotPosition);
  }
};

square.addEventListener("mousedown", () => squareClicked(true));
square.addEventListener("mouseup", () => squareClicked(false));
redDot.addEventListener("mouseup", () => squareClicked(false));
