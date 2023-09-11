
// function updateData() {
    
//     const dataIndex = parseInt(document.querySelector('#Update').getAttribute('data-index'), 10);
//     const categorieSelect = document.querySelector('#categorieSelect');
//     const categorieInput = categorieSelect.value;
//     const titreInput = document.querySelector('#titreInput').value;
//     const dateInput = document.querySelector('#dateInput').value;
//     const descriptionInput = document.querySelector('#descriptionInput').value;
//     const statutSelect = document.querySelector('#statutSelect');
//     const statutInput = statutSelect.value;

//     const newData = {
//         id: dataIndex,
//         categorie: categorieInput,
//         titre: titreInput,
//         date: dateInput,
//         description: descriptionInput,
//         statut: statutInput
//     };

//     const storedData = getStoredData();
//     storedData[dataIndex] = newData;

//     localStorage.setItem('crudData', JSON.stringify(storedData));
//     loadInitialData();

//     // Réinitialiser le formulaire et masquer le bouton "Update"
//     document.querySelector('#Submit').innerText = 'Ajouter';
//     document.querySelector('#Update').style.display = 'none';
// }