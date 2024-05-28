const suiviDivEnt = document.getElementById('suivi') as HTMLDivElement;
const etuSelectorEnt = document.getElementById('selectEtu') as HTMLSelectElement;
const ajoutForm = document.getElementById('ajoutForm') as HTMLFormElement;
const inputType = document.getElementById('inputType') as HTMLSelectElement;
const inputPeriode = document.getElementById('inputPeriode') as HTMLSelectElement;
const inputText = document.getElementById('inputText') as HTMLTextAreaElement;
const ajoutBouton = document.getElementById('ajoutButton') as HTMLButtonElement;

function month3(mois: number) {
    switch (mois) {
        case 0:
            return 'Janvier';
        case 1:
            return 'Février';
        case 2:
            return 'Mars';
        case 3:
            return 'Avril';
        case 4:
            return 'Mai';
        case 5:
            return 'Juin';
        case 6:
            return 'Juillet';
        case 7:
            return 'Août';
        case 8:
            return 'Septembre';
        case 9:
            return 'Octobre';
        case 10:
            return 'Novembre';
        case 11:
            return 'Décembre';
        default:
            return 'Mois inconnu';
    }
}

async function loadEtu2() {
    try {
        const reponseCompte = await fetch('http://localhost:3000/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('http://localhost:3000/etu-ent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idEnt: id })
        });
        const etudiants = await response.json();
        etudiants.forEach((etu: string, index: number) => {
            const option = document.createElement('option');
            option.value = etu;
            option.textContent = etu;
            etuSelectorEnt.appendChild(option);
        });
        if (etuSelectorEnt.options.length > 0) {
            etuSelectorEnt.options[0].selected = true;
        }
        loadSuiviEnt();
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }
}

etuSelectorEnt.addEventListener("change", loadSuiviEnt);

function loadSuiviEnt() {
    inputPeriode.innerHTML = "";
    inputText.value = "";
    suiviDivEnt.innerHTML = "";
    const etu = etuSelectorEnt.value;
    const etuName = etu.split(' ').join('');
    console.log(etuName);
    fetch('http://localhost:3000/suivi-etu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: etuName })
    })
        .then(response => response.json())
        .then(suivi => {
            suivi.forEach((suivi: { id: string; mois: string; annee: string; taches: string; commentaires: string; idEtu: string, idResp: string, idEnt: string }) => {
                const moisInt = parseInt(suivi.mois);
                const monthName = month3(moisInt);
                const option = document.createElement('option');
                option.value = suivi.mois + ' ' + suivi.annee;
                option.textContent = monthName + ' ' + suivi.annee;
                inputPeriode.appendChild(option);
                const suiviCard = document.createElement('div');
                suiviCard.classList.add('card', 'mb-5');
                suiviCard.innerHTML = `
                <div class="card-header">
                    ${monthName} ${suivi.annee}
                </div>
                <div class="card-body">
                    <p class="card-title"><b>Tâches : </b></p>
                    <p class="card-text">${suivi.taches}</p>
                    <p class="card-title"><b>Commentaires : </b></p>
                    <p class="card-text">${suivi.commentaires}</p>
                    <p class="card-title"><b>Fichier joint : </b></p>
                    <div class="file-info"></div>
                </div>
            `;
                suiviDivEnt.appendChild(suiviCard);
                fetch(`/files?mois=${moisInt}&annee=${suivi.annee}&nom=${etuName}`)
                    .then(response => response.json())
                    .then(data => {
                        const fileInfo = suiviCard.querySelector('.file-info') as HTMLDivElement;
                        if (data) {
                            const link = document.createElement('a');
                            link.textContent = data.filename;
                            link.href = `data:${data.mimeType};base64,${data.fileData}`;
                            link.download = data.filename;
                            link.classList.add('file-link');
                            fileInfo.appendChild(link);
                        } else {
                            fileInfo.textContent = 'No file available.';
                        }
                    })
                    .catch(error => console.error('Error fetching file:', error));
            });
        });

}


loadEtu2();


ajoutBouton.addEventListener('click', async () => {
    const nameEtu = etuSelectorEnt.options[etuSelectorEnt.selectedIndex].text.split(' ').join('');
    const type = inputType.value;
    const periode = inputPeriode.value;
    const text = inputText.value;
    try {
        const response = await fetch('http://localhost:3000/update-suivi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, periode, text, nomEtu: nameEtu })
        });
        const data = await response.json();

        if (response.ok) {
            alert('Ajout réussi');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
    window.location.reload();
});
