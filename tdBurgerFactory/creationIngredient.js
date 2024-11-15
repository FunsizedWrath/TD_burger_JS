// Creation ingredients

function getIngredientsFromStorage() {
    const storedIngredients = localStorage.getItem("listIngredient");
    let listIngredient = new Map();
    if (storedIngredients) {
        listIngredient = new Map(JSON.parse(storedIngredients));
    }
    return listIngredient;
}

function updateIngredientStorage(listIngredient) {
    localStorage.setItem("listIngredient", JSON.stringify(Array.from(listIngredient.entries())));
}

let listIngredient = getIngredientsFromStorage();

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
        let formElement = document.getElementById("formIngredient");
        formElement.insertAdjacentElement('afterend', errorMessage);
        console.log("Erreur de saisie : ", { nameIngredient, quantityIngredient });

        // Remove the error message after 5 seconds
        setTimeout(() => {
            if (errorMessage) {
                errorMessage.remove();
            }
        }, 5000);
    } else {
        listIngredient.set(nameIngredient, quantityIngredient);
        localStorage.setItem("listIngredient", JSON.stringify(Array.from(listIngredient.entries())));
        console.log("Ingrédient ajouté : ", { nameIngredient, quantityIngredient });
        document.getElementById("nameIngredient").value = '';
        document.getElementById("quantity").value = '';
    }
}

document.getElementById("formIngredient").addEventListener("submit", createIngredient);