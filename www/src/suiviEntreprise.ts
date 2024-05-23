const suiviDivEnt = document.getElementById('suivi') as HTMLDivElement;
const etuSelectorEnt = document.getElementById('selectEtu') as HTMLSelectElement;

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
                </div>
            `;
                suiviDivEnt.appendChild(suiviCard);
            });
        });
}

loadEtu2();