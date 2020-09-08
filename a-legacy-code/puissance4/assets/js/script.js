const puissanceColumns = document.querySelectorAll(".puissance_col");
const allBlocks = document.querySelectorAll(".puissance_block");
let grid = [];
let diagoGrid = [];

let player = true;
let winCondition = 0;

let reversGrid = [];

let newGrid = [];

//  tests



// tests ****



for (let i = 0; i < puissanceColumns.length; i++) {

  let slt = [];
  let bjr = puissanceColumns[i].querySelectorAll(".puissance_block");

  for (let o = 0; o < bjr.length; o++) {
    slt.push(bjr[o]);
  }

  getAllRows = grid.push(slt);
  
  setNewGrid = newGrid.push(slt);

  // setNewGrid = newGrid.reverse();

  for (let i = 0; i < setNewGrid.length; i++) {
    setNewGrid[i].reverse();
  }
  console.log(grid);



  for (let o = 0; o < grid[i].length; o++) {
    grid[i].place = grid[i].length;

    if (i > o) {
      grid[i][o].co = o;
    } else {
      grid[i][o].co = i;
    }
    grid[i][o].innerHTML = grid[i][o].co;

  }


  
  puissanceColumns[i].addEventListener("click", function () {
    grid[i].place--;

    if (player) {
      grid[i][grid[i].place].style.backgroundColor = "red";
      grid[i][grid[i].place].player = true;
      player = !player;
    } else {
      grid[i][grid[i].place].style.backgroundColor = "yellow";
      grid[i][grid[i].place].player = false;
      player = !player;
    };

    isItWon(i, grid[i].place, grid);

  });
};






for (let i = grid.length - 1; i >= 0; i--) {
  for (let o = 0; o < grid[i].length; o++) {
    setReversGrid = reversGrid.push(grid[i][o]);
  }
}


for (let o = 0; o <= 5; o++) {
  setDiagoGrid = diagoGrid.push([]);
  for (let u = 0; u <= o - 1; u++) {
    setDiagoGrid = diagoGrid[o].push([]);
  }
  for (let i = 0; i < reversGrid.length; i++) {
    if (reversGrid[i].co === o) {
      setDiagoGrid = diagoGrid[o].push(reversGrid[i]);
    }
  }
}

// console.log(reversGrid);



function isItWon(col, row) {


  // collumns
  for (let i = -1; i < allBlocks.length - 1; i++) {
    if (allBlocks[i + 1] && allBlocks[i + 6]) {
      if (allBlocks[i + 1].player) {
        winCondition++;
        if (winCondition === 4) {
          console.log("COLLUMN WIN");
          break;
        }
      } else {
        winCondition = 0;
      }
    }
  }

  // rows
  for (let i = -1; i < grid.length - 1; i++) {
    if (grid[i + 1][row].player) {
      winCondition++;
      if (winCondition === 4) {
        console.log("ROW WIN");
        break;
      }
    }
    else {
      winCondition = 0;
    }
  }

  // diagonals
  for (let o = -1; o < 11; o++) {

    for (let i = 0; i < diagoGrid.length; i++) {
      if (diagoGrid[i][o + 1]) {
        if (diagoGrid[i][o + 1].player) {
          winCondition++;
          if (winCondition === 4) {
            console.log("DIAGO WIN");
            break;
          }
        }
        else {
          winCondition = 0;
        }
      }
    }
  }
  for (let i = -1; i < diagoGrid.length; i++) {

  }



}
