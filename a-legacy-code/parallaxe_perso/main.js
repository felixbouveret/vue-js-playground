let inner = document.querySelector(".inner");



function onScrollEvent() {
    parralax(inner,5,"up");
}

function parralax(element,speed,direction) {
    if(direction==="up") {
        direction = -1;
    }else if(direction==="down") {
        direction = 1;
    }
    let topPage = window.pageYOffset;
    let bottomParallaxElement = element.scrollHeight;
    let pourcent = (topPage * 100 / bottomParallaxElement)/speed*direction;

    element.style.top = pourcent + "%";
};
window.onscroll = onScrollEvent;