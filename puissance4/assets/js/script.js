var puisCol = document.querySelectorAll(".puissance_col");
var puisBlock
var player = !player;
puisCol.test;
var salut = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0]
];
for(var i=0; i<puisCol.length; i++) {
  puisCol[i].test = 5;
};

function play(i) {
  puisCol[i].addEventListener("click", function(){
    if(puisCol[i].test>=0) {
      puisBlock = this.children;
      player=!player;
      if(!player) {
        puisBlock[puisCol[i].test].style.backgroundColor="red";
        salut[puisCol[i].test][i] = "r";
      } else if(player){
        puisBlock[puisCol[i].test].style.backgroundColor="yellow";
        salut[puisCol[i].test][i] = "j";
      };
      // colone
      if(salut[i+1][puisCol[i].test]=="r") {
        console.log("win")
      }
      console.log(salut)
      puisCol[i].test--;
    }
  });
}

for(var i=0; i<puisCol.length; i++) {
  play(i)
};