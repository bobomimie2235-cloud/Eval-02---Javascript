const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 12.99, image: "https://placehold.co/150" },
    { id: 2, nom: "Café Arabica", prix: 8.50, image: "https://placehold.co/150" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "https://placehold.co/150" },
    { id: 4, nom: "Chocolat Chaud", prix: 15.00, image: "https://placehold.co/150" }
];

const boutique = document.getElementById("boutique");
const produitsConteneur = document.getElementById("produits-container");
const panier = document.getElementById("panier-section");
const panierListe = document.getElementById("panier-liste");
const totalSection = document.getElementsByClassName("total-section");
const montantTotal = document.getElementById("montant-total");
const commandeBox = document.getElementsByClassName("commande-box");

// Sauvegarder/Charger mon panier entre chaque rafraichissement
let panierFiche = JSON.parse(localStorage.getItem("panier")) || [];

afficherPanier();

// Fonction pour sauvegarder
function savePanier() {
    localStorage.setItem("panier", JSON.stringify(panierFiche));
}

// FICHES PRODUITS

function afficherProduits(liste = produits) {
    produitsConteneur.replaceChildren();

    if (liste.length === 0) {
        const noResultMessage = document.createElement("p");
        noResultMessage.textContent = "Il n'y a pas de produits"
        boutique.appendChild(noResultMessage);
        return;
    }

    liste.forEach(prod => {
        const fiche = document.createElement("div");
        fiche.className = "ficheProduit";

        // AJOUT AU PANIER AU CLICK
        fiche.addEventListener("click", () => {
            ajouterPanier(prod);

        })

        // CREATION FICHE PRODUIT
        const img = document.createElement("img");
        img.src = prod.image;
        img.alt = prod.nom;

        const h3 = document.createElement("h3");
        h3.textContent = prod.nom;

        const p = document.createElement("p");
        p.textContent = prod.id;

        const pPrix = document.createElement("p");
        pPrix.textContent = `Prix : ${prod.prix} €`;

        fiche.append(img, h3, p, pPrix);

        produitsConteneur.appendChild(fiche);
    });
};

afficherProduits();


// GESTION DU PANIER

// Function Ajouter au panier avec conditions

function ajouterPanier(produit) {
    const produitExistant = panierFiche.find(item => item.id === produit.id);

    if (produitExistant) {
        produitExistant.quantite++;
    } else {
        panierFiche.push({
            id: produit.id,
            nom: produit.nom,
            prix: produit.prix,
            quantite: 1
        });

    }
    savePanier();
    afficherPanier();
}

// Function afficher au panier

function afficherPanier() {
    panierListe.replaceChildren();

    panierFiche.forEach(item => {
        const listePanier = document.createElement("div");
        listePanier.className = "listePanier";

        const h3Panier = document.createElement("h3");
        h3Panier.textContent = item.nom;

        const pPrixPanier = document.createElement("p");
        pPrixPanier.textContent = `Prix : ${item.prix} €`;

        const pQuantite = document.createElement("p");
        pQuantite.textContent = `Quantité : ${item.quantite}`;

        const sousTotal = document.createElement("p");
        sousTotal.textContent = "Sous-Total : " + (item.prix * item.quantite) + " €";

        // Ajout Bouton Supprimer une quantité

        const btnSupprQuantite = document.createElement("button");
        btnSupprQuantite.textContent = "Suppr 1 quantité";
        btnSupprQuantite.className = "btnSupprQuantite";

        btnSupprQuantite.addEventListener("click", (e) => {
            e.stopPropagation();
            item.quantite--;

            if (item.quantite <= 0) {
                panierFiche = panierFiche.filter(p => p.id !== item.id);
            }

            savePanier();
            afficherPanier();
        });

        // Ajout Bouton Supprimer produits

        const btnSupprProduit = document.createElement("button");
        btnSupprProduit.textContent = "Suppr Produit";
        btnSupprProduit.className = "btnSupprProduit";

        btnSupprProduit.addEventListener("click", (e) => {
            e.stopPropagation();
            panierFiche = panierFiche.filter(p => p.id !== item.id);
            savePanier();
            afficherPanier();
        });

        listePanier.append(h3Panier, pPrixPanier, pQuantite, sousTotal, btnSupprQuantite, btnSupprProduit);
        panierListe.appendChild(listePanier);
    });

    calculTotal();
}

// Function calculer le total

function calculTotal() {
    let total = 0;

    panierFiche.forEach(item => {
        total += item.prix * item.quantite;
    });
    montantTotal.textContent = Math.round(total * 100) / 100;
    return total;
}

// BOUTON VIDER PANIER :

const btnVider = document.getElementById("btn-vider-panier");

btnVider.addEventListener("click", () => {
    panierFiche = [];
    savePanier();
    afficherPanier();
    messageFeedback.textContent = "Le panier a été vidé.";
});

// FORMULAIRE

const formulaire = document.getElementById("form-commande");
const messageFeedback = document.getElementById("message-feedback");
const mailClient = document.getElementById("email-client");
const btnCommander = document.getElementById("btn-commander");
const messageValidation = document.getElementById("message-validation");

formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    let formValid = true;

    // Vérification du montant du panier
    if (calculTotal() === 0) {
        messageFeedback.textContent = "Le panier est vide";
        formValid = false;
    } else {
        messageFeedback.textContent = "";
    }

    // verification du mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(mailClient.value.trim())) {
        messageFeedback.textContent = "Veuillez entrer une adresse e-mail valide.";
        mailClient.classList.add("error");
        mailClient.classList.remove("valid");
        formValid = false;
    } else {
        mailClient.classList.add("valid");
        mailClient.classList.remove("error");
    }

    if (formValid) {
        messageValidation.textContent = "Commande validée !";
    }

});