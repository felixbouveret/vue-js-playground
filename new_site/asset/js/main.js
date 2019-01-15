var anim = document.getElementById('anim_enter');
var bloc_cont_img = document.getElementById('div_test');
var anim_img = document.getElementById('img_laptop_beach');
var bloc_txt = document.querySelector("#div_test > div");
var photo_slide = document.querySelector("div.photo");

window.onscroll = function () {
    var position_img = bloc_cont_img.offsetTop - (bloc_cont_img.offsetHeight / 2);
    var position_scroll = window.pageYOffset;
    // console.log(position_scroll + " " + position_img);
    if (position_scroll >= position_img) {
        anim_img.style.opacity = 1;
        anim_img.style.marginLeft = 0;
        bloc_txt.style.marginLeft = 0;
        bloc_txt.style.opacity = 1;
    } else {
        anim_img.style.opacity = 0;
        anim_img.style.marginLeft = "-10em";
        bloc_txt.style.marginLeft = "-10em";
        bloc_txt.style.opacity = 0;
    }
    if(window.pageYOffset <= 200)
    {
        anim.setAttribute('style', 'opacity:1; margin-bottom:0;')
    }else{
        anim.setAttribute('style', 'opacity:0; margin-bottom:-10em;')
    }
}
var tps = setTimeout(function () {
    anim.setAttribute('style', 'opacity:1; margin-bottom:0;')
}, 500);
var ordre = 1
var slide_show = setInterval(function () {

    if(ordre == 1)
    {
        photo_slide.style.opacity = 0;
        photo_slide.style.backgroundImage = "url(asset/img/portfolio/summer_laptop.jpg)"
        photo_slide.style.opacity = 1;
        ordre = 0;
        console.log(ordre);
    }
    else if(ordre == 0)
    {
        photo_slide.style.opacity = 0;
        photo_slide.style.backgroundImage = "url(asset/img/portfolio/nature.jpg)"
        photo_slide.style.opacity = 1;
        ordre = 1;
        console.log(ordre);
    }
},5000);
