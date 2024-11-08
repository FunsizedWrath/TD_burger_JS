let listIngredient = new Map();

function createIngredient(event) {
    event.preventDefault(); // Prevent form submission

    let nameIngredient = document.getElementById("nameIngredient").value;
    let quantityIngredient = document.getElementById("quantity").value;

    // Clear previous error messages
    let existingErrorMessage = document.getElementById("errorMessage");
    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }

    if (nameIngredient === "" || isNaN(quantityIngredient) || quantityIngredient <= 0) {
        let errorMessage = document.createElement("p");
        errorMessage.setAttribute("id", "errorMessage");
        errorMessage.innerText = "Erreur de saisie";
        document.body.appendChild(errorMessage);
        console.log("Erreur de saisie : ", { nameIngredient, quantityIngredient });

        // Remove the error message after 5 seconds
        setTimeout(() => {
            if (errorMessage) {
                errorMessage.remove();
            }
        }, 5000);
    } else {
        listIngredient.set(nameIngredient, quantityIngredient);
        console.log("Ingrédient ajouté : ", { nameIngredient, quantityIngredient });
    }
}

document.getElementById("formIngredient").addEventListener("submit", createIngredient);