window.onload = function () {
    var back1 = document.querySelector(".hero1");
    var back2 = document.querySelector(".hero2");
    var back3 = document.querySelector(".hero3");
    var back4 = document.querySelector(".hero4");
    var back5 = document.querySelector(".hero5");
    var back6 = document.querySelector(".hero6");
    var back7 = document.querySelector(".hero7");
    var back8 = document.querySelector(".hero8");
    var back9 = document.querySelector(".hero9");

    var random = Math.floor((Math.random() * 9) + 1);

    back1.style.display = "none";
    back2.style.display = "none";
    back3.style.display = "none";
    back4.style.display = "none";
    back5.style.display = "none";
    back6.style.display = "none";
    back7.style.display = "none";
    back8.style.display = "none";
    back9.style.display = "none";

    if (random == 1) {
        back1.style.display = "block";
    }
    else if (random == 2) {
        back2.style.display = "block";
    }
    else if (random == 3) {
        back3.style.display = "block";
    }
    else if (random == 4) {
        back4.style.display = "block";
    }
    else if (random == 5) {
        back5.style.display = "block";
    }
    else if (random == 6) {
        back6.style.display = "block";
    }
    else if (random == 7) {
        back7.style.display = "block";
    }
    else if (random == 8) {
        back8.style.display = "block";
    }
    else if (random == 9) {
        back9.style.display = "block";
    }
    var account_cross = document.querySelector(".account_cross");
    var panier_cross = document.querySelector(".panier_cross");
    var search_cross = document.querySelector(".recherche_cross");
    var contact_cross = document.querySelector(".contact_cross");

    account_cross.style.display = "none";
    panier_cross.style.display = "none";
    search_cross.style.display = "none";
    contact_cross.style.display = "none";
};

var account = document.querySelector(".compte");
var panier = document.querySelector(".panier");
var search = document.querySelector(".recherche");
var contact = document.querySelector(".contact");

var account_cross = document.querySelector(".account_cross");
var panier_cross = document.querySelector(".panier_cross");
var search_cross = document.querySelector(".recherche_cross");
var contact_cross = document.querySelector(".contact_cross");

account.addEventListener("click", function (e) {
    account_cross.style.display = "block";

    panier_cross.style.display = "none";
    search_cross.style.display = "none";
    contact_cross.style.display = "none";
});
panier.addEventListener("click", function (e) {
    panier_cross.style.display = "block";

    search_cross.style.display = "none";
    account_cross.style.display = "none";
    contact_cross.style.display = "none";
});
search.addEventListener("click", function (e) {
    search_cross.style.display = "block";

    panier_cross.style.display = "none";
    account_cross.style.display = "none";
    contact_cross.style.display = "none";
});
contact.addEventListener("click", function (e) {
    contact_cross.style.display = "block";

    panier_cross.style.display = "none";
    search_cross.style.display = "none";
    account_cross.style.display = "none";
});

