const selectEtuAdmin = document.getElementById('selectorEtuAdd') as HTMLSelectElement;
const selectRespAdmin = document.getElementById('selectorRespAdd') as HTMLSelectElement;
const formAdd = document.getElementById('addResp') as HTMLFormElement;

async function loadOptionsAdd() {
    try {
        const response = await fetch('https://entreprises.startechnormandy.com/etu');
        const etudiants = await response.json();
        etudiants.forEach((etu: { id: string; nom: string; prenom: string }) => {
            const option = document.createElement('option');
            option.value = etu.id;
            option.textContent = etu.nom + ' ' + etu.prenom;
            selectEtuAdmin.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }

    try {
        const response = await fetch('https://entreprises.startechnormandy.com/resp');
        const responsables = await response.json();
        responsables.forEach((resp: { id: string; nom: string; prenom: string }) => {
            const option = document.createElement('option');
            option.value = resp.id;
            option.textContent = resp.nom + ' ' + resp.prenom;
            selectRespAdmin.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des responsables pédagogiques :', error);
    }
}

loadOptionsAdd();

document.addEventListener('DOMContentLoaded', () => {

    if (formAdd) {
        formAdd.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nameEtu = selectEtuAdmin.options[selectEtuAdmin.selectedIndex].text.split(' ').join('');
            const idResp = selectRespAdmin.options[selectRespAdmin.selectedIndex].value;
            const idEtu = selectEtuAdmin.options[selectEtuAdmin.selectedIndex].value;
            console.log(nameEtu, idResp, idEtu);
            try {
                const response = await fetch('https://entreprises.startechnormandy.com/add-resp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nameEtu: nameEtu, idResp: idResp, idEtu: idEtu })
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Inscription réussie');
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erreur :', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }
});

