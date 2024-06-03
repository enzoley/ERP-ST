const etuSelector = document.getElementById('selectorEtu') as HTMLSelectElement;
const respSelector = document.getElementById('selectorResp') as HTMLSelectElement;
const entSelector = document.getElementById('selectorEnt') as HTMLSelectElement;
const suiviForm = document.getElementById('createSuivi') as HTMLFormElement;
const debutMonth = document.getElementById('startMonth') as HTMLSelectElement;
const debutYear = document.getElementById('startYear') as HTMLSelectElement;
const finMonth = document.getElementById('endMonth') as HTMLSelectElement;
const finYear = document.getElementById('endYear') as HTMLSelectElement;

async function loadOptions() {
    try {
        const response = await fetch('http://manclaus.alwaysdata.net/etu');
        const etudiants = await response.json();
        etudiants.forEach((etu: { id: string; nom: string; prenom: string }) => {
            const option = document.createElement('option');
            option.value = etu.id;
            option.textContent = etu.nom + ' ' + etu.prenom;
            etuSelector.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }

    try {
        const response = await fetch('http://manclaus.alwaysdata.net/resp');
        const responsables = await response.json();
        responsables.forEach((resp: { id: string; nom: string; prenom: string }) => {
            const option = document.createElement('option');
            option.value = resp.id;
            option.textContent = resp.nom + ' ' + resp.prenom;
            respSelector.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des responsables pédagogiques :', error);
    }

    try {
        const response = await fetch('http://manclaus.alwaysdata.net/ent');
        const entreprises = await response.json();
        entreprises.forEach((ent: { id: string; nom: string }) => {
            const option = document.createElement('option');
            option.value = ent.id;
            option.textContent = ent.nom;
            entSelector.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des entreprises :', error);
    }

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i < currentYear + 100; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        debutYear.appendChild(option);
    }

    for (let i = currentYear; i < currentYear + 100; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        finYear.appendChild(option);
    }
}

loadOptions();

document.addEventListener('DOMContentLoaded', () => {
    if (suiviForm) {
        suiviForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const etudiant = etuSelector.value;
            const nameEtu = etuSelector.options[etuSelector.selectedIndex].text.split(' ').join('');
            const resp = respSelector.value;
            const ent = entSelector.value;
            const debutMonthValue = debutMonth.value;
            const debutYearValue = debutYear.value;
            const finMonthValue = finMonth.value;
            const finYearValue = finYear.value;
            try {
                const response = await fetch('http://manclaus.alwaysdata.net/create-suivi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idEtu: etudiant, idResp: resp, idEnt: ent, dm: debutMonthValue, dy: debutYearValue, fm: finMonthValue, fy: finYearValue, nomEtu: nameEtu })
                });

                if (response.ok) {
                    alert('Suivi créé');
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    console.error('Erreur :', errorData);
                    alert('Erreur lors de la création du suivi : ' + errorData.message);
                }
            } catch (error) {
                console.error('Erreur :', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }

        });
    }
});
