var block = document.querySelectorAll(".row");
var player = true;
console.log(player);
function slt(i){
    block[i].addEventListener("click", function(){
        player=!player;
        if(player) {
            block[i].style.backgroundImage="url(assets/img/cross.svg)"
            console.log("1")
        }else if(!player) {
            block[i].style.backgroundImage="url(assets/img/circle.svg)"
            console.log("2")

        }

    })
}
for(var i = 0; i<block.length; i++) {
    slt(i);

}
