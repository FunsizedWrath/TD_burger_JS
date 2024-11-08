// Contact page
let request = new XMLHttpRequest();
let url = `https://opendata.agencebio.org/api/gouv/operateurs/?siret=79317749400028`;

request.open("GET", url);
request.send();
request.onload = () => {
    if (request.status === 200) {
        let response = JSON.parse(request.response);
        console.log("OK");

        // creation des varaibles necessaires pour le message
        let item = response.items[0]; 
        let adresseop = item.adressesOperateurs[0];

        
        let numeroBio = item.numeroBio;
        let gerant = item.gerant;
        let lieu = adresseop.lieu; 
        let codePostal = adresseop.codePostal; 
        let ville = adresseop.ville; 

        // Extractions des productions
        let productions = [];
        item.productions.forEach(prod => {
            productions.push(prod.nom);
        });
        // insertion de virgule entre les productions
        let productionsStr = productions.join(', ');

        // creation du message
        let message = `Notre restaurant travaille avec des produits locaux provenant de la ferme bio numéro ${numeroBio} de Monsieur ${gerant} située à l’adresse ${lieu} ${codePostal} ${ville}. Cette ferme intervient dans les commerces : ${productionsStr}.`;
        console.log(message);

        // Display du message
        let messageElement = document.createElement("p");
        messageElement.innerText = message;
        document.getElementById("messagecontact").appendChild(messageElement);
    } else {
        // en cas d'erreur
        console.error("KO");
    }
};