// Récupérer les données du localStorage
function getStoredData() {
    const storedData = localStorage.getItem('crudData');
    return storedData ? JSON.parse(storedData) : [];
}

// Ajouter une nouvelle entrée
function addData(data) {
    const storedData = getStoredData();
    storedData.push(data);
    localStorage.setItem('crudData', JSON.stringify(storedData));
    loadInitialData();
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById('categorieSelect').selectedIndex = 0;
    document.getElementById('titreInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('statutSelect').selectedIndex = 0;
    
    const submitButton = document.getElementById('Submit');
    const updateButton = document.getElementById('Update');
    
    submitButton.style.display = 'inline-block'; // Affichez à nouveau le bouton "Ajouter"
    updateButton.style.display = 'none'; // Masquez le bouton "Mettre à jour"
    updateButton.removeAttribute('data-id');
}

// Gestionnaire d'événement pour le bouton "Ajouter"
document.getElementById('Submit').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const data = {
        // Récupérez les valeurs du formulaire ici
        categorie: document.getElementById('categorieSelect').value,
        titre: document.getElementById('titreInput').value,
        date: document.getElementById('dateInput').value,
        description: document.getElementById('descriptionInput').value,
        statut: document.getElementById('statutSelect').value
    };

    AddOrUpdateData(data);
    resetForm(); // Réinitialisez le formulaire ici
});

// Gestionnaire d'événement pour le bouton "Mettre à jour"
document.getElementById('Update').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

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
    resetForm(); // Réinitialisez le formulaire ici
});


// Fonction pour activer le bouton "Mettre à jour" en fonction de l'ID
function enableUpdateButton(id) {
    const updateButton = document.getElementById('Update');
    updateButton.style.display = 'inline-block';
    updateButton.setAttribute('data-id', id); // Stockez l'ID de l'élément à mettre à jour
}

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

        // Après avoir mis à jour les données, vous pouvez effectuer des actions supplémentaires si nécessaire

        // Par exemple, réinitialisez le formulaire après la mise à jour
        resetForm();

        // Vous pouvez également masquer le bouton "Update" ou effectuer d'autres actions selon votre logique
        loadInitialData();
    }
}

function updateStoredData(data) {
    // Mettez à jour les données stockées dans le localStorage sous la clé 'crudData'
    localStorage.setItem('crudData', JSON.stringify(data));
}

// Supprimer une entrée par son ID
function deleteData(id) {
    const storedData = getStoredData();
    const index = storedData.findIndex(item => item.id === id);

    if (index !== -1) {
        storedData.splice(index, 1);
        localStorage.setItem('crudData', JSON.stringify(storedData));
        loadInitialData();
    }
}

// Cette fonction supprime une entrée du tableau de données en utilisant son ID.
// Elle recherche d'abord l'index de l'élément à supprimer, puis le retire du tableau.
// Ensuite, elle sauvegarde le tableau mis à jour dans le localStorage et appelle 'loadInitialData' pour mettre à jour l'affichage.

// La fonction 'loadInitialData' met à jour l'affichage initial de la table des données en fonction des données stockées dans le localStorage.

function showCategoryOptions() {
    // Sélectionnez l'élément de sélection de catégorie
    const categorieSelect = document.getElementById('categorieSelect');
    
    // Vous pouvez afficher les options de catégorie en fonction de votre logique
    // Par exemple, si vous avez une liste pré-définie d'options de catégorie, vous pouvez les ajouter ici
    // Voici un exemple avec des options statiques :
    
    categorieSelect.innerHTML = ''; // Effacez toutes les options actuelles

    const categorieOptions = [
        { value: 'Academique', label: 'Academique' },
        { value: 'Extra-academique', label: 'Extra-academique' },
        { value: 'Distraction', label: 'Distraction' }
    ];

    categorieOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        categorieSelect.appendChild(optionElement);
    });
}

function showStatusOptions() {
    // Sélectionnez l'élément de sélection de statut
    const statutSelect = document.getElementById('statutSelect');

    // Vous pouvez afficher les options de statut en fonction de votre logique
    // Par exemple, si vous avez une liste pré-définie d'options de statut, vous pouvez les ajouter ici
    // Voici un exemple avec des options statiques :

    statutSelect.innerHTML = ''; // Effacez toutes les options actuelles

    const statutOptions = [
        { value: 'Nouveau', label: 'Nouveau' },
        { value: 'En cours', label: 'En cours' },
        { value: 'Terminé', label: 'Terminé' }
    ];

    statutOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        statutSelect.appendChild(optionElement);
    });
}

// La fonction 'AddOrUpdateData' gère l'ajout ou la mise à jour de données en fonction de la présence ou de l'absence du bouton "Update".
// Elle récupère les valeurs du formulaire, crée un nouvel objet de données, puis appelle 'addData' ou 'updateData' en conséquence.
// Enfin, elle réinitialise le formulaire.

// La fonction 'editData' remplit le formulaire avec les données d'une entrée existante en utilisant son ID.
// Elle permet de pré-remplir le formulaire pour faciliter la modification des données existantes.

// Enfin, la dernière ligne 'loadInitialData();' appelle la fonction 'loadInitialData' pour charger les données lors du chargement initial de la page.

function loadInitialData() {
    const storedData = getStoredData();
    const tableBody = document.getElementById('tableBody'); // Sélectionnez la balise tbody
    tableBody.innerHTML = ''; // Effacez le contenu existant

    for (let i = 0; i < storedData.length; i++) {
        const rowData = storedData[i];
        const row = document.createElement('tr');
        row.id = `entry-${rowData.id}`;

        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${rowData.date}</td>
            <td>${rowData.titre}</td>
            <td>${rowData.categorie}</td>
            <td>
                <button class="btn btn-info" onclick="editData(${rowData.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteData(${rowData.id})">Delete</button>
            </td>
        `;

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

    // Réinitialiser le formulaire
    resetForm();
}

// Cette fonction gère l'ajout ou la mise à jour de données en fonction de la présence ou de l'absence du bouton "Update".
// Elle récupère les valeurs du formulaire, crée un nouvel objet de données, puis appelle 'addData' ou 'updateData' en conséquence.
// Enfin, elle réinitialise le formulaire en effaçant les valeurs entrées.

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
       

        // Mettez à jour le texte du bouton "Ajouter" en "Mettre à jour"
        submitButton.innerText = 'Ajouter';

        submitButton.style.display = 'none'; // Masquez le bouton "Ajouter"
        updateButton.style.display = 'inline-block'; // Affichez le bouton "Mettre à jour"
        updateButton.setAttribute('data-id', id); // Stockez l'ID de l'élément à mettre à jour
    }
}


