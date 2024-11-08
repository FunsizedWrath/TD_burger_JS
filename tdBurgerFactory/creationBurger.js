// Create burger
document.addEventListener("DOMContentLoaded", function() {
    // Load ingredients from sessionStorage
    const storedIngredients = sessionStorage.getItem("listIngredient");
    let listIngredient = new Map();
    if (storedIngredients) {
        listIngredient = new Map(JSON.parse(storedIngredients));
    }

    // Populate ingredient fields
    const ingredientSelects = document.querySelectorAll(".ingredient-select");
    ingredientSelects.forEach(select => {
        listIngredient.forEach((name, quantity) => {
            let option = document.createElement("option");
            option.value = name;
            option.text = name;
            select.add(option);
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

    // Clear previous error messages
    let existingErrorMessage = document.getElementById("errorMessage");
    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }

    if (burgerName === "" || ingredient1 === "" || ingredient2 === "" || ingredient3 === "") {
        let errorMessage = document.createElement("p");
        errorMessage.setAttribute("id", "errorMessage");
        errorMessage.innerText = "Erreur de saisie";
        let formElement = document.getElementById("formBurger");
        formElement.insertAdjacentElement('afterend', errorMessage);
        console.log("Erreur de saisie : ", { burgerName, ingredient1, ingredient2, ingredient3 });

        // Remove the error message after 5 seconds
        setTimeout(() => {
            if (errorMessage) {
                errorMessage.remove();
            }
        }, 5000);
    } else {
        let burger = {
            name: burgerName,
            ingredients: [ingredient1, ingredient2, ingredient3]
        };
        console.log("Burger créé : ", burger);
        // Optionally, store the burger in sessionStorage or another storage
        sessionStorage.setItem("burger", JSON.stringify(burger));

        // Optionally, clear the form fields after successful submission
        document.getElementById("nameBurger").value = '';
        document.getElementById("ingredient1").value = '';
        document.getElementById("ingredient2").value = '';
        document.getElementById("ingredient3").value = '';
    }
}