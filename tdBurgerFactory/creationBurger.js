// Create burger

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

function displayError(errorMessageText) {
    let existingErrorMessage = document.getElementById("errorMessage");
    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }

    let errorMessage = document.createElement("p");
    errorMessage.setAttribute("id", "errorMessage");
    errorMessage.innerText = errorMessageText;
    let formElement = document.getElementById("formBurger");
    formElement.insertAdjacentElement('afterend', errorMessage);
    console.log(errorMessageText);

    // Remove the error message after 5 seconds
    setTimeout(() => {
        if (errorMessage) {
            errorMessage.remove();
        }
    }, 5000);
}

function refreshSelects(listIngredient) {
    const ingredientSelects = document.querySelectorAll(".ingredient-select");
    ingredientSelects.forEach(select => {
        select.innerHTML = "";
        listIngredient.forEach((quantity, name) => {
            let option = document.createElement("option");
            option.value = name;
            option.text = name;
            select.appendChild(option);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Load ingredients from localStorage
    const storedIngredients = localStorage.getItem("listIngredient");
    let listIngredient = new Map();
    if (storedIngredients) {
        listIngredient = new Map(JSON.parse(storedIngredients));
    }

    console.log("Ingrédients chargés : ", listIngredient);

    // Populate ingredient fields
    const ingredientSelects = document.querySelectorAll(".ingredient-select");
    ingredientSelects.forEach(select => {
        listIngredient.forEach((quantity, name) => {
            let option = document.createElement("option");
            option.value = name;
            option.text = name;
            select.appendChild(option);
        });
    });

    document.getElementById("formBurger").addEventListener("submit", function(event) {
        createBurger(event, listIngredient);
    });
});

function createBurger(event, listIngredient) {
    event.preventDefault(); // Prevent form submission

    let burgerName = document.getElementById("nameBurger").value.trim();
    let ingredient1 = document.getElementById("ingredient1").value;
    let ingredient2 = document.getElementById("ingredient2").value;
    let ingredient3 = document.getElementById("ingredient3").value;

    if (burgerName === "" || ingredient1 === "" || ingredient2 === "" || ingredient3 === "") {
        displayError("Erreur de saisie : l'un des champs est vide");
    } else {
        listIngredient = getIngredientsFromStorage();
        ingredientUpdated = new Map(listIngredient);
        for (let [name, quantity] of ingredientUpdated) {
            if (ingredient1 == name)
                quantity -= 1;
            if (ingredient2 == name)
                quantity -= 1;
            if (ingredient3 == name)
                quantity -= 1;
            if (quantity < 0) {
                displayError("Erreur de quantité, il nous manque de l'ingrédient suivant : " + name+", quantité manquante : "+Math.abs(quantity));
                return;
            }
            ingredientUpdated.set(name, quantity);
            if (quantity == 0)
                ingredientUpdated.delete(name);
        }
        updateIngredientStorage(ingredientUpdated);
        listIngredient = ingredientUpdated;

        let burger = {
            name: burgerName,
            ingredients: [ingredient1, ingredient2, ingredient3]
        };
        console.log("Burger créé : ", burger);

        // Optionally, store the burger in localStorage or another storage
        let burgersJSON = localStorage.getItem("burgers");
        if (burgersJSON) {
            let burgers = JSON.parse(burgersJSON);
            burgers.push(burger);
            localStorage.setItem("burgers", JSON.stringify(burgers));
        } else {
            localStorage.setItem("burgers", JSON.stringify([burger]));
        }

        // Optionally, clear the form fields after successful submission
        document.getElementById("nameBurger").value = '';
        document.getElementById("ingredient1").value = '';
        document.getElementById("ingredient2").value = '';
        document.getElementById("ingredient3").value = '';
        refreshSelects(listIngredient);
    }
}