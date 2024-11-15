let diapoBurger = [
    "img/burger1.jpg",
    "img/burger2.jpg",
    "img/burger3.jpg"
];

let diapoBurgerText = [
    "Burger 1",
    "Burger 2",
    "Burger 3"
];

let imageCurrent = 0;
let textVisible = false;

function nextDiapo() {
    imageCurrent++;
    if (imageCurrent >= diapoBurger.length) {
        imageCurrent = 0;
    }
    document.getElementById("imageDiapo").src = diapoBurger[imageCurrent];
    // Update the text if it is visible
    if (textVisible) {
        document.getElementById("diapoText").innerText = diapoBurgerText[imageCurrent];
    }
}

setInterval(nextDiapo, 10000);

document.getElementById("imageDiapo").addEventListener("click", function() {
    if (textVisible) {
        document.getElementById("diapoText").innerText = "";
        textVisible = false;
    } else {
        document.getElementById("diapoText").innerText = diapoBurgerText[imageCurrent];
        textVisible = true;
    }
});

// Initial call to set the first image and hide the text
nextDiapo();