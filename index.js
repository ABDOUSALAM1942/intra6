
function getStoredData() {
    const storedData = localStorage.getItem('crudData');
    return storedData ? JSON.parse(storedData) : [];
}
function updateStoredData(data) {
    localStorage.setItem('crudData', JSON.stringify(data));
}

// Ajouter une nouvelle entrée
function addData(data) {
    const storedData = getStoredData();
    storedData.push(data);
    localStorage.setItem('crudData', JSON.stringify(storedData));
    updateStatusChart();
    loadInitialData();
    showNotification('Ajout entré.', 'Nouvelle entrée ajoutée avec succès.');
}

// réinitialise les champs d'un formulaire HTML, réinitialise la sélection des options, et ajuste l'affichage des boutons "Ajouter" et "Mettre à jour".
function resetForm() {
    document.getElementById('categorieSelect').selectedIndex = 0;
    document.getElementById('titreInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('statutSelect').selectedIndex = 0;
    const submitButton = document.getElementById('Submit');
    const updateButton = document.getElementById('Update');
    submitButton.style.display = 'inline-block';
    updateButton.style.display = 'none';
    updateButton.removeAttribute('data-id');
}

// Gestionnaire d'événement pour le bouton "Ajouter"
document.getElementById('Submit').addEventListener('click', function (event) {
    event.preventDefault();
    const data = {
        categorie: document.getElementById('categorieSelect').value,
        titre: document.getElementById('titreInput').value,
        date: document.getElementById('dateInput').value,
        description: document.getElementById('descriptionInput').value,
        statut: document.getElementById('statutSelect').value
    };

    // Vérifiez si tous les champs sont remplis
    if (data.categorie && data.titre && data.date && data.description && data.statut) {
        // Tous les champs sont remplis, ajoutez les données
        AddOrUpdateData(data);
        resetForm(); // Réinitialisez le formulaire ici
    } else {
        // Affichez un message d'erreur ou une notification pour informer l'utilisateur
        showNotification('Erreur', 'Veuillez remplir tous les champs.');
    }
});

// Gestionnaire d'événement pour le bouton "Mettre à jour"
document.getElementById('Update').addEventListener('click', function (event) {
    event.preventDefault();
    const data = {
        // Récupérez les valeurs du formulaire ici
        categorie: document.getElementById('categorieSelect').value,
        titre: document.getElementById('titreInput').value,
        date: document.getElementById('dateInput').value,
        description: document.getElementById('descriptionInput').value,
        statut: document.getElementById('statutSelect').value
    };

    // Obtenez l'ID de l'élément à mettre à jour depuis l'attribut "data-id"
    const itemIdToUpdate = this.getAttribute('data-id');
    updateData(itemIdToUpdate, data);
    resetForm();
});

// // Fonction pour activer le bouton "Mettre à jour" en fonction de l'ID
// function enableUpdateButton(id) {
//     const updateButton = document.getElementById('Update');
//     updateButton.style.display = 'inline-block';
//     updateButton.setAttribute('data-id', id); // Stockez l'ID de l'élément à mettre à jour
// }

// Mettre à jour une entrée existante par ID
function updateData(id, data) {
    const storedData = getStoredData();
    const dataToUpdate = storedData.find(item => item.id === parseInt(id));

    if (dataToUpdate) {
        // Mettez à jour les propriétés de l'objet dataToUpdate avec les valeurs du formulaire
        dataToUpdate.categorie = data.categorie;
        dataToUpdate.titre = data.titre;
        dataToUpdate.date = data.date;
        dataToUpdate.description = data.description;
        dataToUpdate.statut = data.statut;
        // Mettez à jour les données stockées avec les données mises à jour
        updateStoredData(storedData);
        updateStatusChart();
        resetForm();
        loadInitialData();
        showNotification('Mise à jour.', 'Entrée mise à jour avec succès.');
    }
}


// Fonction pour supprimer une entrée de données par son identifiant
function deleteData(id) {
    console.log(id);
    const storedData = getStoredData(); // Récupération des données stockées
    const index = storedData.findIndex(item => item.id === id); // Recherche de l'indice de l'élément à supprimer

    // Vérification si l'élément avec l'identifiant spécifié a été trouvé
    if (index !== -1) {
        storedData.splice(index, 1); // Suppression de l'élément du tableau
        localStorage.setItem('crudData', JSON.stringify(storedData));
        updateStatusChart();
        loadInitialData();
        showNotification('Suppression', 'Entrée supprimée avec succès.');
    }
}

// La fonction 'loadInitialData' met à jour l'affichage initial de la table des données en fonction des données stockées dans le localStorage.

// function showCategoryOptions() {
//     // Sélectionnez l'élément de sélection de catégorie
//     const categorieSelect = document.getElementById('categorieSelect');

//     // Vous pouvez afficher les options de catégorie en fonction de votre logique
//     // Par exemple, si vous avez une liste pré-définie d'options de catégorie, vous pouvez les ajouter ici
//     // Voici un exemple avec des options statiques :

//     categorieSelect.innerHTML = ''; // Effacez toutes les options actuelles

// // Définition des options de la catégorie sous forme d'un tableau d'objets
// const categorieOptions = [
//     { value: 'Academique', label: 'Academique' },
//     { value: 'Extra-academique', label: 'Extra-academique' },
//     { value: 'Distraction', label: 'Distraction' }
// ];

// // Boucle à travers chaque option et création des éléments d'option pour le menu déroulant
// categorieOptions.forEach(option => {
//     // Création d'un élément d'option
//     const optionElement = document.createElement('option');
//     // Attribution de la valeur et du texte de l'option à partir des propriétés de l'objet
//     optionElement.value = option.value;
//     optionElement.textContent = option.label;
//     // Ajout de l'élément d'option au menu déroulant (select)
//     categorieSelect.appendChild(optionElement);
// });
// }

// function showStatusOptions() {
//     // Sélectionnez l'élément de sélection de statut
//     const statutSelect = document.getElementById('statutSelect');

//     // Vous pouvez afficher les options de statut en fonction de votre logique
//     // Par exemple, si vous avez une liste pré-définie d'options de statut, vous pouvez les ajouter ici
//     // Voici un exemple avec des options statiques :
//     statutSelect.innerHTML = ''; // Effacez toutes les options actuelles
//     const statutOptions = [
//         { value: 'Nouveau', label: 'Nouveau' },
//         { value: 'En cours', label: 'En cours' },
//         { value: 'Terminé', label: 'Terminé' }
//     ];

//     statutOptions.forEach(option => {
//         const optionElement = document.createElement('option');
//         optionElement.value = option.value;
//         optionElement.textContent = option.label;
//         statutSelect.appendChild(optionElement);
//     });
// }

// La fonction 'AddOrUpdateData' gère l'ajout ou la mise à jour de données en fonction de la présence ou de l'absence du bouton "Update".
// Elle récupère les valeurs du formulaire, crée un nouvel objet de données, puis appelle 'addData' ou 'updateData' en conséquence.
// Enfin, elle réinitialise le formulaire.

// La fonction 'editData' remplit le formulaire avec les données d'une entrée existante en utilisant son ID.
// Elle permet de pré-remplir le formulaire pour faciliter la modification des données existantes.

// Enfin, la dernière ligne 'loadInitialData();' appelle la fonction 'loadInitialData' pour charger les données lors du chargement initial de la page.
// Gestionnaire d'événement pour le bouton "View" à côté de chaque élément
function viewData(id) {
    const storedData = getStoredData();
    const dataToView = storedData.find(item => item.id === parseInt(id));

    if (dataToView) {
        // Remplir la fenêtre modale avec les informations de l'élément
        const modalDataElement = document.getElementById('modalData');
        modalDataElement.innerHTML = `
            <h2>Informations tâche</h2>
            <p><strong>Categorie:</strong> ${dataToView.categorie}</p>
            <p><strong>Titre:</strong> ${dataToView.titre}</p>
            <p><strong>Date:</strong> ${dataToView.date}</p>
            <p><strong>Description:</strong> ${dataToView.description}</p>
            <p><strong>Statut:</strong> ${dataToView.statut}</p>
        `;
        // Afficher la fenêtre modale
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        // Gestionnaire d'événement pour fermer la fenêtre modale
        const closeModalButton = document.getElementsByClassName('close')[0];
        closeModalButton.onclick = function () {
            modal.style.display = 'none';
        };

        // Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

// Fonction pour charger les données initiales dans le tableau
function loadInitialData() {
    const storedData = getStoredData(); // Récupération des données stockées
    const tableBody = document.getElementById('tableBody'); // Sélection de la balise tbody

    tableBody.innerHTML = ''; // Effacement du contenu existant dans le tableau

    // Boucle à travers les données stockées pour créer les lignes du tableau
    for (let i = 0; i < storedData.length; i++) {
        const rowData = storedData[i];
        const row = document.createElement('tr');
        row.id = `entry-${rowData.id}`; // Attribution d'un identifiant unique à la ligne
        row.setAttribute('data-id', rowData.id); // Ajout d'un attribut "data-id" à la ligne

        // Ajout d'un écouteur d'événement pour afficher la description de la tâche lors du clic sur la ligne
        row.addEventListener('click', function () {
            viewDescription(rowData.id);
        });

        // Remplissage des cellules de la ligne avec les données de l'élément actuel
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${rowData.date}</td>
            <td>${rowData.titre}</td>
            <td>${rowData.categorie}</td>
            <td>
                <button class="btn btn-primary" onclick="viewData(${rowData.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-info" onclick="editData(${rowData.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteData(${rowData.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;

        // Ajout de la ligne au tableau
        tableBody.appendChild(row);
    }
}

window.addEventListener('load', loadInitialData);

// Cette fonction charge initialement les données du localStorage lors du chargement de la page.
// Elle crée des éléments HTML pour chaque entrée de données, les ajoute à un tableau, et affiche ce tableau dans le document.

function AddOrUpdateData(data) {
    const categorieSelect = document.querySelector('#categorieSelect');
    const categorieInput = categorieSelect.value;
    const titreInput = document.querySelector('#titreInput').value;
    const dateInput = document.querySelector('#dateInput').value;
    const descriptionInput = document.querySelector('#descriptionInput').value;
    const statutSelect = document.querySelector('#statutSelect');
    const statutInput = statutSelect.value;
    const updateButton = document.querySelector('#Update');

    if (updateButton.style.display === 'none') {
        // Si le bouton "Update" est masqué, cela signifie que nous ajoutons de nouvelles données
        const data = {
            id: Date.now(),
            categorie: categorieInput,
            titre: titreInput,
            date: dateInput,
            description: descriptionInput,
            statut: statutInput
        };
        addData(data);
    } else {
        // Si le bouton "Update" est affiché, cela signifie que nous mettons à jour des données existantes
        const itemIdToUpdate = updateButton.getAttribute('data-id');
        updateData(itemIdToUpdate, {
            categorie: categorieInput,
            titre: titreInput,
            date: dateInput,
            description: descriptionInput,
            statut: statutInput
        });
    }
    updateStatusChart();
    // Réinitialiser le formulaire
    resetForm();
}


// Gestionnaire d'événement pour le bouton "Edit"
function editData(id) {
    const storedData = getStoredData();
    const data = storedData.find(item => item.id === parseInt(id)); // Convertissez l'ID en entier

    if (data) {
        // Sélectionnez la valeur correspondante dans les listes déroulantes
        document.getElementById('categorieSelect').value = data.categorie;
        document.getElementById('titreInput').value = data.titre;
        document.getElementById('dateInput').value = data.date;
        document.getElementById('descriptionInput').value = data.description;
        document.getElementById('statutSelect').value = data.statut;

        const submitButton = document.getElementById('Submit');
        const updateButton = document.getElementById('Update');

        submitButton.style.display = 'none'; // Masquez le bouton "Ajouter"
        updateButton.style.display = 'inline-block'; // Affichez le bouton "Mettre à jour"
        updateButton.setAttribute('data-id', id); // Stockez l'ID de l'élément à mettre à jour

        updateStatusChart();
    }
}

const statusChartCanvas = document.getElementById('statutChart').getContext('2d');
let statusChart;

function updateStatusChart() {
    const storedData = getStoredData();

    const statusCount = {
        Nouveau: 0,
        'En cours': 0,
        Terminé: 0
    };

    storedData.forEach(item => {
        // Incrémentation du compteur pour le statut de l'élément actuel
        statusCount[item.statut]++;
    });

    if (statusChart) {
        // Si le graphique existe déjà, détruisez-le pour le mettre à jour
        statusChart.destroy();
    }

    statusChart = new Chart(statusChartCanvas, {
        type: 'pie',
        data: {
            datasets: [{
                data: Object.values(statusCount),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56',
                    // Vous pouvez ajouter plus de couleurs ici si nécessaire
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true, // Permet au graphique de s'adapter à la taille de son conteneur
            layout: {
                padding: 20,
            },
        },
    });
}

// Appelez la fonction pour afficher le graphique de statut initial
updateStatusChart();

function viewDescription(id) {
    const storedData = getStoredData();
    // Recherche de l'élément dans les données stockées qui correspond à l'identifiant spécifié
    const dataToView = storedData.find(item => item.id === id);

    if (dataToView) {
        // Remplir la fenêtre modale avec la description de l'élément
        const modalDataElement = document.getElementById('modalData2');
        modalDataElement.innerHTML = `
            <p style="color: green;">${dataToView.description}</p>
        `;

        // Afficher la fenêtre modale pour la description
        const modal2 = document.getElementById('myModal2');
        modal2.style.display = 'block';


        // Gestionnaire d'événement pour fermer la fenêtre modale de la description
        const closeModalButton2 = document.getElementsByClassName('close2')[0];
        closeModalButton2.onclick = function () {
            modal2.style.display = 'none';
        };

        // Fermer la fenêtre modale de la description lorsque l'utilisateur clique en dehors de celle-ci
        window.onclick = function (event) {
            if (event.target === modal2) {
                modal2.style.display = 'none';
            }
        };
    }
}

function showNotification(primaryMessage, secondaryMessage) {
    const notificationModal = document.getElementById('notificationModal');
    const notificationMessage = document.getElementById('notificationMessage');

    // Créez un message qui contient les deux lignes avec des balises span pour le style
    const message = `<span class="white-text">${primaryMessage}</span><br><span class="black-text">${secondaryMessage}</span>`;    // Affichez le message de notification dans la fenêtre modale
    notificationMessage.innerHTML = message;
    // Affichez la fenêtre modale
    notificationModal.style.display = 'block';

    // Définissez un délai de 5 secondes pour masquer la fenêtre modale
    setTimeout(function () {
        notificationModal.style.display = 'none';
    }, 5000); // 5000 millisecondes (5 secondes)
}

// Récupérez tous les labels
const labels = document.querySelectorAll("label");

// Masquez tous les labels par défaut
labels.forEach(label => {
    label.style.display = "none";
});

// Ajoutez des gestionnaires d'événements pour chaque champ
const inputFields = document.querySelectorAll("input, select");
// Pour chaque champ de saisie dans le tableau inputFields
inputFields.forEach(input => {
    // Ajout d'un écouteur d'événement pour le focus
    input.addEventListener("focus", () => {
        // Lorsque le champ est cliqué, affichez uniquement le label associé à ce champ
        const label = document.querySelector(`label[for="${input.id}"]`);

        // Vérifiez si un label associé a été trouvé
        if (label) {
            // Masquez tous les labels
            labels.forEach(l => {
                l.style.display = "none";
            });

            // Affichez le label associé au champ de saisie qui a le focus
            label.style.display = "block";
        }
    });

    // Ajout d'un écouteur d'événement pour le blur
    input.addEventListener("blur", () => {
        // Lorsque le champ perd le focus, masquez tous les labels associés
        labels.forEach(label => {
            label.style.display = "none";
        });
    });
});
