const suiviDiv = document.getElementById('suivi') as HTMLDivElement;

function month(mois: number) {
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

async function loadSuivi() {
    try {
        const reponseCompte = await fetch('http://localhost:3000/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const email = compteRes.user.email;
        const nameResponse = await fetch('http://localhost:3000/get-user-nomprenom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await nameResponse.json();
        const { nom, prenom } = data;
        const name = `${nom}${prenom}`;
        const response = await fetch('http://localhost:3000/suivi-etu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        const suivi = await response.json();
        suivi.forEach((suivi: { id: string; mois: string; annee: string; taches: string; commentaires: string; idEtu: string, idResp: string, idEnt: string }) => {
            const moisInt = parseInt(suivi.mois);
            const monthName = month(moisInt);
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
            suiviDiv.appendChild(suiviCard);
        });
    } catch (error) {
        console.error('Erreur lors du chargement du suivi :', error);
    }
}

loadSuivi();