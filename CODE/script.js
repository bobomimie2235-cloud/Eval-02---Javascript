const produits = [
    { nom: "Smartphone X", categorie: "Électronique", prix: 699, image: "https://placehold.co/200x150?text=Smartphone" },
    { nom: "Roman Policier", categorie: "Livres", prix: 14, image: "https://placehold.co/200x150?text=Livre" },
    { nom: "T-shirt Coton", categorie: "Vêtements", prix: 25, image: "https://placehold.co/200x150?text=T-shirt" },
    { nom: "Casque Bluetooth", categorie: "Électronique", prix: 89, image: "https://placehold.co/200x150?text=Casque" },
    { nom: "Sweat à capuche", categorie: "Vêtements", prix: 40, image: "https://placehold.co/200x150?text=Sweat" },
    { nom: "Essai Historique", categorie: "Livres", prix: 19, image: "https://placehold.co/200x150?text=Essai" }
];

const conteneurProduits = document.getElementById("conteneurProduits");
const btnFiltre = document.getElementById("btnFiltre");
const inputSearch = document.getElementById("search");
const noResultsMessage = document.getElementById("no-results");

let rechercheActive = "";
let categoriesActives = [];

// ------------------ AFFICHAGE PRODUITS ------------------
function afficherProduits(liste = produits) {
    conteneurProduits.replaceChildren();

    if (liste.length === 0) {
        noResultsMessage.style.display = "block";
        return;
    }

    noResultsMessage.style.display = "none";

    liste.forEach(prod => {
        const fiche = document.createElement("div");
        fiche.className = "ficheProduit fade-in";

        fiche.innerHTML = `
            <img src="${prod.image}" alt="${prod.nom}">
            <h3>${prod.nom}</h3>
            <p>Catégorie : ${prod.categorie}</p>
            <p>Prix : ${prod.prix} €</p>
        `;

        conteneurProduits.appendChild(fiche);
    });
}

afficherProduits();

// ------------------ FILTRAGE ------------------
function filtrerProduits() {
    document.querySelectorAll(".ficheProduit").forEach(el => {
        el.classList.add("fade-out");
    });

    setTimeout(() => {
        let filtres = produits;

        // Filtre catégories
        if (categoriesActives.length > 0) {
            filtres = filtres.filter(p => categoriesActives.includes(p.categorie));
        }

        // Filtre recherche
        if (rechercheActive.trim() !== "") {
            filtres = filtres.filter(p =>
                p.nom.toLowerCase().includes(rechercheActive.toLowerCase())
            );
        }

        afficherProduits(filtres);

    }, 300);
}

// ------------------ FILTRAGE PAR CATÉGORIES ------------------
const categories = [...new Set(produits.map(p => p.categorie))];

categories.forEach(cat => {
    const bouton = document.createElement("button");
    bouton.textContent = cat;
    bouton.className = "btnSearch";

    bouton.addEventListener("click", () => toggleCategorie(cat, bouton));

    btnFiltre.appendChild(bouton);
});

function toggleCategorie(cat, bouton) {
    if (categoriesActives.includes(cat)) {
        categoriesActives = categoriesActives.filter(c => c !== cat);
        bouton.classList.remove("active");
    } else {
        categoriesActives.push(cat);
        bouton.classList.add("active");
    }

    filtrerProduits();
}

// ------------------ RECHERCHE ------------------
inputSearch.addEventListener("input", e => {
    rechercheActive = e.target.value;
    filtrerProduits();
});