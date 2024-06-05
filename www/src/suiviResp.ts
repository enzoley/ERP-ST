const suiviDivResp = document.getElementById('suivi') as HTMLDivElement;
const etuSelectorResp = document.getElementById('selectEtu') as HTMLSelectElement;

function month2(mois: number) {
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

async function loadEtu() {
    try {
        const reponseCompte = await fetch('https://entreprises.startechnormandy.com/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('https://entreprises.startechnormandy.com/etu-resp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idResp: id })
        });
        const etudiants = await response.json();
        etudiants.forEach((etu: string, index: number) => {
            const option = document.createElement('option');
            option.value = etu;
            option.textContent = etu;
            etuSelectorResp.appendChild(option);
        });
        if (etuSelectorResp.options.length > 0) {
            etuSelectorResp.options[0].selected = true;
        }
        loadSuiviResp();
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }
}

etuSelectorResp.addEventListener("change", loadSuiviResp);

function loadSuiviResp() {
    suiviDivResp.innerHTML = "";
    const etu = etuSelectorResp.value;
    const etuName = etu.split(' ').join('');
    fetch('https://entreprises.startechnormandy.com/suivi-etu', {
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
                const monthName = month2(moisInt);
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
                suiviDivResp.appendChild(suiviCard);
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

loadEtu();