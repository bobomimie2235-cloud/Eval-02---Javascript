// EXO 1 réagir au clic sur un bouton

const button = document.getElementById("monBouton");

button.addEventListener (`click`, () => {
    alert("Vous avez cliqué sur le bouton !");
} );

// EXO 2 : modifier contenu paragraphe au clic

const texte = document.getElementById("texte");
const btnModifier = document.getElementById("modifierTexte");

btnModifier.addEventListener (`click`, () => {
    texte.textContent = "Le texte a été modifié avec succès";
});

// EXO 3 : Changer la couleur d'une zone avec la souris

const zone = document.getElementById("zone");

zone.addEventListener(`mouseover`, () => {
    zone.style.backgroundColor = "lightblue";
});

zone.addEventListener(`mouseout`, () => {
    zone.style.backgroundColor = "grey";
});

// EXO 4 : Compter les clics d'un bouton : 

const btnCompter = document.getElementById("compter");
const pResultat = document.getElementById("resultat");

let result = 0;

btnCompter.addEventListener(`click`, () => {
    result += 1;
    pResultat.textContent = ("Vous avez cliqué " + result + " fois");
    });

// EXO 5 : Afficher la valeur d'un champ texte

const inputNom = document.getElementById("champNom");
const btnNom = document.getElementById("afficherNom");
const divExoCinq = document.getElementById("exoCinq");

let pMessage = document.getElementById("message");
if (!pMessage) {
    pMessage = document.createElement("p");
    pMessage.id = "message";
    divExoCinq.appendChild(pMessage);
}

btnNom.addEventListener("click", () => {
    const nom = inputNom.value;
    pMessage.textContent = ("bonjour, " + nom);
});

// EXO 6 : Activer et désactiver un champ

const champTexte = document.getElementById("champTexte");
const btnToggle = document.getElementById("toggleChamp");

btnToggle.addEventListener("click", () => {
    champTexte.disabled = !champTexte.disabled; 

    if (champTexte.disabled) {
    btnToggle.textContent = "Activer le champ";
} else {
    btnToggle.textContent = "Désactiver le champ";
}
});

// EXO 7 : Ajouter dynamiquement un élément à une liste :

const btnAdd = document.getElementById("ajouter");
const listeElements = document.getElementById("listeElements");

btnAdd.addEventListener("click", () => {
    let li = document.createElement("li");
    li.textContent = "Nouvel élément ajouté";
    listeElements.appendChild(li);
});

// EXO 8 : Supprimer l'élément cliqué dans une liste

const liste = document.getElementById("maListe");

const items = liste.querySelectorAll("li");

items.forEach(li => {
    li.addEventListener("click", () => {
        li.remove();
    });
});

// EXO 9 : Détecter la touche entrée dans le champ

const champClavier = document.getElementById("champClavier");
const messageClavier = document.getElementById("messageClavier");

champClavier.addEventListener("keydown", () => {
    if (event.key === "Enter") {
        messageClavier.textContent = "Vous avez appuyé sur la touche Entrée";
    }
});

// EXO 10 : Filter liste à partir d'un champ

const ulAnimaux = document.getElementById("animaux");
const liAnimal = document.querySelectorAll(".animal");
const inputFiltre = document.getElementById("filtreAnimaux");

inputFiltre.addEventListener("input", () => {
    const texte = inputFiltre.value.toLowerCase();

    liAnimal.forEach(animal => {
        const nom = animal.textContent.toLowerCase();

        if (nom.includes(texte)) {
            animal.style.display = "";
        } else {
            animal.style.display = "none";
        }
    });
});


