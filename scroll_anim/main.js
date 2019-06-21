let article = document.querySelectorAll(".article_container");

let phoneContainer = document.querySelector(".view");
let phone = document.querySelector(".mobile_container");
let phoneContent = document.querySelectorAll(".view_content");



// function resizeEvent() {
//     let height = window.innerHeight
//         || document.documentElement.clientHeight
//         || document.body.clientHeight;
//     return height
// };

function onScrollEvent() {
let topPage = window.scrollY;

    console.log(phoneContainer.offsetTop)
    console.log(topPage)
    if(phoneContainer.offsetTop <= topPage) {
        phoneContainer.style.position = "fixed";
    }else{
        phoneContainer.style.position = "initial";

    } 
}
window.onscroll = onScrollEvent;
window.onresize = resizeEvent;