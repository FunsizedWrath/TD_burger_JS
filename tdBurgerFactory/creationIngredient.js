// Creation ingredient
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formIngredient").addEventListener("submit", function(event) {
        createIngredient(event);
    });
});

let listIngredient = new Map();

function createIngredient(event) {
    event.preventDefault(); //Prevent the form from being submitted

    let nameIngredient = document.getElementById("nameIngredient").value.trim();
    let quantityIngredient = parseInt(document.getElementById("quantity").value, 10);

    // console.log(nameIngredient);
    // console.log(quantityIngredient);

     // Remove any existing error message
     let existingErrorMessage = document.getElementById("errorMessage");
     if (existingErrorMessage) {
         existingErrorMessage.remove();
     }

    if (nameIngredient !== String || nameIngredient.trim() === '' || isNaN(quantityIngredient) || quantityIngredient <= 0) {
        let errorMessage = document.createElement("p");
        errorMessage.setAttribute("id", "errorMessage");
        errorMessage.innerText = "Erreur de saisie";
        document.body.appendChild(errorMessage);

    }
    else {
        listIngredient.set(nameIngredient, quantityIngredient);
    }
    // for (const [key, value] of listIngredient) {
    //     console.log(key + " : " + value);
    // }
}
// function showMap() {
//     for (const [key, value] of listIngredient) {
//         console.log(key + " : " + value);
//     }
// }

addEventListener("submit", createIngredient);
// setTimeout(showMap, 5000);

// TO DO : ERROR MESSAGE