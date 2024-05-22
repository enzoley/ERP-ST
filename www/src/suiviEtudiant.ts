const suiviDiv = document.getElementById('suivi') as HTMLDivElement;

async function loadSuivi() {
    try {
        const reponseCompte = await fetch('http://localhost:3000/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const compte = compteRes.user;
        const email = compte.email;
        const response = await fetch('http://localhost:3000/suivi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const suivi = await response.json();
        suivi.forEach((suivi: { id: string; nom: string; prenom: string; entreprise: string; debut: string; fin: string }) => {
            const suiviCard = document.createElement('div');
            suiviCard.classList.add('card', 'mb-3');
            suiviCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${suivi.nom} ${suivi.prenom}</h5>
                    <p class="card-text">Entreprise : ${suivi.entreprise}</p>
                    <p class="card-text">Début : ${suivi.debut}</p>
                    <p class="card-text">Fin : ${suivi.fin}</p>
                </div>
            `;
            suiviDiv.appendChild(suiviCard);
        });
    } catch (error) {
        console.error('Erreur lors du chargement du suivi :', error);
    }
}

loadSuivi();