var body = document.querySelector("body");

var slide = document.querySelectorAll(".hero__img");
var slideImg = document.querySelectorAll(".hero__desc");
var slideNbr = slide.length-1;

function slider() {
    setTimeout("slider()", 4000);

    function test(i) {
        setTimeout(function () {
            slide[i].classList.remove("test");
            slideImg[i].classList.remove("test2");
        }, 1000);

    }
    for (var i = slide.length-1; i >= 0; i--) {
        if (i === slideNbr) {
            slide[i].classList.add("test");
            slideImg[i].classList.add("test2");
        }
        else {
            test(i)
        }
    }
    if (slideNbr === 0) {
        slideNbr = slide.length-1;
    } else {
        slideNbr--;
    }
}




window.onload = function () {
    body.classList.add("js");
    slider()
}