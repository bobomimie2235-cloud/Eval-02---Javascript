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

// AFFICHER LES FICHES PRODUITS

function afficherProduits(liste = produits) {
    produitsConteneur.replaceChildren();

    if (liste.length === 0) {
        const p = document.createElement("p");
        p.textContent = "Il n'y a pas de produits";
        boutique.appendChild(p);
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
    let trouve = false;

    for (let i = 0; i < panierFiche.length; i++) {
        if (panierFiche[i].id === produit.id) {
            panierFiche[i].quantite++;
            trouve = true;
        }
    }

    if (!trouve) {
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

        // Bouton Supprimer une quantité - Moins

        const btnQuantiteMoins = document.createElement("button");
        btnQuantiteMoins.textContent = "Suppr 1 quantité";
        btnQuantiteMoins.className = "btnQuantiteMoins";

        btnQuantiteMoins.addEventListener("click", () => {
            item.quantite--;

            if (item.quantite <= 0) {
                let nouveauPanier = [];

                for (let i = 0; i < panierFiche.length; i++) {
                    if (panierFiche[i].id !== item.id) {
                        nouveauPanier.push(panierFiche[i]);
                    }
                }

                panierFiche = nouveauPanier;

            }

            savePanier();
            afficherPanier();
        });

        // Bouton Ajouter une quantité - Plus

        const btnQuantitePlus = document.createElement("button");
        btnQuantitePlus.textContent = "Ajout 1 quantité";
        btnQuantitePlus.className = "btnQuantitePlus";

        btnQuantitePlus.addEventListener("click", () => {
            item.quantite++;

            if (item.quantite <= 0) {
                let nouveauPanier = [];

                for (let i = 0; i < panierFiche.length; i++) {
                    if (panierFiche[i].id !== item.id) {
                        nouveauPanier.push(panierFiche[i]);
                    }
                }

                panierFiche = nouveauPanier;

            }

            savePanier();
            afficherPanier();
        });

        // Ajout Bouton Supprimer produits

        const btnSupprProduit = document.createElement("button");
        btnSupprProduit.textContent = "Suppr Produit";
        btnSupprProduit.className = "btnSupprProduit";

        btnSupprProduit.addEventListener("click", () => {
            let nouveauPanier = [];

            for (let i = 0; i < panierFiche.length; i++) {
                if (panierFiche[i].id !== item.id) {
                    nouveauPanier.push(panierFiche[i]);
                }
            }

            panierFiche = nouveauPanier;

            savePanier();
            afficherPanier();
        });

        const detailsProduit = document.createElement("div");
        detailsProduit.className = "detailsProduit";

        detailsProduit.append(pPrixPanier, pQuantite, sousTotal);

        const btnPanier = document.createElement("div");
        btnPanier.className = "btnPanier";

        btnPanier.append(btnQuantiteMoins, btnSupprProduit, btnQuantitePlus);

        listePanier.append(h3Panier, detailsProduit, btnPanier);
        panierListe.appendChild(listePanier);
    });

    calculTotal();
}

// Function calculer le total

function calculTotal() {
    let total = 0;

    for (let i = 0; i < panierFiche.length; i++) {
        total += panierFiche[i].prix * panierFiche[i].quantite;
    }

    montantTotal.textContent = total.toFixed(2);
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
    messageFeedback.textContent = "";
    messageValidation.textContent = "";

    if (calculTotal() === 0) {
        messageFeedback.textContent = "Le panier est vide";
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(mailClient.value.trim())) {
        messageFeedback.textContent = "Email non valide";
        return;
    }

    messageValidation.textContent = "Commande validée !";
});