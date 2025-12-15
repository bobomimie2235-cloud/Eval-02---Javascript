
const taskinput = document.getElementById("taskinput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

// Charger depuis localStorage au démarrage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Affichage initial
render();

// Fonction de mise à jour de l'affichage à partir du tableau tasks
function render() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const supprBtn = document.createElement("button");
        supprBtn.textContent = "Supprimer";
        supprBtn.style.marginLeft = "10px";

        supprBtn.addEventListener("click", () => {
            // méthode splice pour modifier tableau (supprimer, ajouter, remplacer element)
            tasks.splice(index, 1);
            save();
            render();
        });


        li.appendChild(supprBtn);
        taskList.appendChild(li);

        // Modifier texte au double clic
        li.addEventListener("dblclick", function(e) {
        li.contentEditable = true;
        });
    });
    
    // Compteur du nombre de taches
    let tasksNumber = tasks.length;
    let compteur = document.createElement("p");

    if (tasksNumber < 1) {
        compteur.textContent = "Vous n'avez pas de tâches"
    } else if (tasksNumber === 1) {
        compteur.textContent = "Il vous reste " + tasksNumber + " tâche à faire !"
    } else if (tasksNumber >= 2) {
        compteur.textContent = "Il vous reste " + tasksNumber + " tâches à faire !"
    }

    taskList.appendChild(compteur);
}

// Fonction pour sauvegarder
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// // Bouton ajout taskinput
// addBtn.addEventListener("click", () => {
//     const text = taskinput.value.trim();
//     if (!text) return;

//     tasks.push(text);
//     save();
//     render();

//     taskinput.value = "";
// });

// Keydown ENTER taskinput
taskinput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        console.log("enter");
    

    const text = taskinput.value.trim();
    if (!text) return;

    tasks.push(text);
    save();
    render();

    taskinput.value = "";
    }
});

// Bouton pour tout effacer
clearBtn.addEventListener("click", () => {
    tasks = [];
    save();
    render();
});




// taskinput.addEventListener ("Keydown", (e) => {
//     if (e.key === "Enter") {
//         const text = taskinput.value.trim();

//     tasks.push(text);
//     save();
//     render();

//     taskinput.value = "";
//     }
// }
// );

// // Bouton ajout taskinput
// addBtn.addEventListener("click", () => {
//     const text = taskinput.value.trim();
//     if (!text) return;

//     tasks.push(text);
//     save();
//     render();

//     taskinput.value = "";
// });
