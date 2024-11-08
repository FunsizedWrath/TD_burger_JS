// Index
let diapoBurger = new Array();
diapoBurger[0] = "img/burger1.jpg";
diapoBurger[1] = "img/burger2.jpg";
diapoBurger[2] = "img/burger3.jpg";

let diapoBurgerText = new Array();
diapoBurgerText[0] = "Burger 1";
diapoBurgerText[1] = "Burger 2";
diapoBurgerText[2] = "Burger 3";

let imageCurrent = 0;
function nextDiapo() {
    imageCurrent++;
    if (imageCurrent > 2) {
        imageCurrent = 0;
    }
    document.getElementById("imageDiapo").src = diapoBurger[imageCurrent];
    document.getElementById("diapoText").innerText = diapoBurgerText[imageCurrent];
}

setInterval(nextDiapo, 10000);

document.getElementById("imageDiapo").addEventListener("click", function() {
    document.getElementById("diapoText").innerText = diapoBurgerText[imageCurrent];
});