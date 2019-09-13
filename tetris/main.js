const shapeButton = document.querySelector(".shape_button");
const shapeRows = document.querySelectorAll(".shape_row");
const shapeBlocks = document.querySelectorAll(".shape_block")
let shapeGrid = [];
for (let i = 0; i < shapeRows.length; i++) {
  getAllRows = shapeGrid.push(shapeRows[i].querySelectorAll(".shape_block"));
};

function generateShape() {
  let randomUsed = [];
  for (let i = 0; i < 6; i++) {
    let randomShapeBlock = Math.floor(Math.random() * shapeBlocks.length);
    console.log(randomShapeBlock);
    shapeBlocks[randomShapeBlock].active = true;
    shapeBlocks[randomShapeBlock].style.backgroundColor = "red";
  }

  // can only work with shapeGrid
  for (let i = 0; i < shapeGrid.length; i++) {
    for (let o = 0; o < shapeGrid[i].length; o++) {
      if (shapeGrid[i][o].active === true) {
        if (
          typeof shapeGrid[i][o - 1] !== "undefined" && shapeGrid[i][o - 1].active === true ||
          typeof shapeGrid[i][o + 1] !== "undefined" && shapeGrid[i][o + 1].active === true ||
          typeof shapeGrid[i + 1][o] !== "undefined" && shapeGrid[i + 1][o].active === true ||
          typeof shapeGrid[i - 1][o] !== "undefined" && shapeGrid[i - 1][o].active === true 
        ) {
          shapeGrid[i][o].style.backgroundColor = "blue";
          console.log(shapeGrid[i][o]);
          
        }
      }
    }
  }
}


shapeButton.addEventListener("click", generateShape);