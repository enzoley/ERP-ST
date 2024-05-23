const suiviDivResp = document.getElementById('suivi') as HTMLDivElement;
const etuSelectorResp = document.getElementById('selectEtu') as HTMLSelectElement;

async function loadEtu() {
    try {
        const reponseCompte = await fetch('http://localhost:3000/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('http://localhost:3000/etu-resp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idResp: id })
        });
        const etudiants = await response.json();
        console.log(etudiants);
        etudiants.forEach((etu: string) => {
            const option = document.createElement('option');
            option.value = etu;
            option.textContent = etu
            etuSelectorResp.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }
}

loadEtu();