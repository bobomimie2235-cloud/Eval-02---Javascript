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
const messageFeedback = document.getElementById("message-feedback");
const btnCommander = document.getElementById("btn-commander");

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

let panierFiche = [];

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
    afficherPanier();
}

// Function afficher au panier

function afficherPanier() {
    panierListe.replaceChildren();

    panierFiche.forEach(item => {
        const div = document.createElement("div");
        div.className = "listePanier";

        const h3Panier = document.createElement("h3");
        h3Panier.textContent = item.nom;

        const pPrixPanier = document.createElement("p");
        pPrixPanier.textContent = `Prix : ${item.prix} €`;

        const pQuantite = document.createElement("p");
        pQuantite.textContent = `Quantité : ${item.quantite}`;

        div.append(h3Panier, pPrixPanier, pQuantite);
        panierListe.appendChild(div);
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
}