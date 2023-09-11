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

// Mettre à jour une entrée existante par ID
function updateData(id, newData) {
    const storedData = getStoredData();
    const dataIndex = storedData.findIndex(item => item.id === id);

    if (dataIndex !== -1) {
        storedData[dataIndex] = { ...storedData[dataIndex], ...newData };
        localStorage.setItem('crudData', JSON.stringify(storedData));
        loadInitialData();
    } else {
        alert('ID not found in local storage.');
    }

    // Réinitialiser le formulaire et masquer le bouton "Update"
    document.querySelector('#Submit').innerText = 'Ajouter';
    document.querySelector('#Update').style.display = 'none';
}


document.getElementById('Update').addEventListener('click', () => {
    const dataIndex = parseInt(document.querySelector('#Update').getAttribute('data-index'), 10);
    const categorieSelect = document.querySelector('#categorieSelect');
    const categorieInput = categorieSelect.value;
    const titreInput = document.querySelector('#titreInput').value;
    const dateInput = document.querySelector('#dateInput').value;
    const descriptionInput = document.querySelector('#descriptionInput').value;
    const statutSelect = document.querySelector('#statutSelect');
    const statutInput = statutSelect.value;

    const newData = {
        categorie: categorieInput,
        titre: titreInput,
        date: dateInput,
        description: descriptionInput,
        statut: statutInput
    };

    updateData(dataIndex, newData);
});


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

function loadInitialData() {
    const storedData = getStoredData();
    const tableBody = document.querySelector('#crudTable tbody');
    tableBody.innerHTML = '';

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

function showCategoryOptions() {
    // Votre code pour afficher les options de catégorie ici
}

function showStatusOptions() {
    // Votre code pour afficher les options de statut ici
}

function AddOrUpdateData() {
    const categorieSelect = document.querySelector('#categorieSelect');
    const categorieInput = categorieSelect.value;
    const titreInput = document.querySelector('#titreInput').value;
    const dateInput = document.querySelector('#dateInput').value;
    const descriptionInput = document.querySelector('#descriptionInput').value;
    const statutSelect = document.querySelector('#statutSelect');
    const statutInput = statutSelect.value;

    const data = {
        id: Date.now(),
        categorie: categorieInput,
        titre: titreInput,
        date: dateInput,
        description: descriptionInput,
        statut: statutInput
    };

    const updateButton = document.querySelector('#Update');

    if (updateButton.style.display === 'none') {
        addData(data);
    } else {
        updateData(-1, data);
    }

    // Réinitialiser le formulaire
    document.querySelector('#categorieSelect').selectedIndex = 0;
    document.querySelector('#titreInput').value = '';
    document.querySelector('#dateInput').value = '';
    document.querySelector('#descriptionInput').value = '';
    document.querySelector('#statutSelect').selectedIndex = 0;
}

function editData(id) {
    const categorieSelect = document.querySelector('#categorieSelect');
    const titreInput = document.querySelector('#titreInput');
    const dateInput = document.querySelector('#dateInput');
    const descriptionInput = document.querySelector('#descriptionInput');
    const statutSelect = document.querySelector('#statutSelect');

    const storedData = getStoredData();
    const data = storedData.find(item => item.id === id);

    if (data) {
        // Sélectionnez la valeur correspondante dans les listes déroulantes
        categorieSelect.value = data.categorie;
        titreInput.value = data.titre;
        dateInput.value = data.date;
        descriptionInput.value = data.description;
        statutSelect.value = data.statut;

        const submitButton = document.querySelector('#Submit');
        const updateButton = document.querySelector('#Update');

        submitButton.innerText = 'Ajouter';
        updateButton.style.display = 'inline-block';
        updateButton.setAttribute('data-index', id);
    }
}

// Chargement initial des données lors du chargement de la page
loadInitialData();
