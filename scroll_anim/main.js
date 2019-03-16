let device = document.querySelector(".mobile_container");
let deviceContainer = document.querySelector(".view").offsetTop;
let deviceMiddle = device.offsetTop + deviceContainer + 250;
let deviceContent = document.querySelectorAll(".view_content");

let article = document.querySelectorAll(".article_container");

function resizeEvent() {
    let height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    return height
};



function onScrollEvent() {
    let topPage = window.pageYOffset;
    if (deviceMiddle <= topPage + resizeEvent() / 2) {
        device.classList.add("mobile_container-fixed");
    } else {
        device.classList.remove("mobile_container-fixed");
    }
    for (let i = 0; i < article.length; i++) {
        let articleActiveTop = article[i].offsetTop;
        if (articleActiveTop <= deviceMiddle + topPage - 100) {
            deviceContent[i].classList.add("view_content-visible")
        } else {
            deviceContent[i].classList.remove("view_content-visible")

        }
    }
}
window.onscroll = onScrollEvent;
window.onresize = resizeEvent;