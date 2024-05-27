const selectEtu = document.getElementById('selectEtu') as HTMLSelectElement;
const propositionDiv = document.getElementById('proposition') as HTMLDivElement;
const visiteDiv = document.getElementById('visite') as HTMLDivElement;

function month8(mois: number) {
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

async function loadEtuV() {
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
            selectEtu.appendChild(option);
        });
        if (selectEtu.options.length > 0) {
            selectEtu.options[0].selected = true;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }
    loadVisites();
}



async function loadVisites() {
    visiteDiv.innerHTML = '';
    try {
        const nom = selectEtu.value.split(' ')[0];
        const prenom = selectEtu.value.split(' ')[1];
        const response = await fetch('http://localhost:3000/visite-resp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom: nom, prenom: prenom })
        });
        const visites = await response.json();
        visites.sort((a: { annee: number; mois: string; jour: number | undefined; }, b: { annee: number; mois: string; jour: number | undefined; }) => {
            const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
            const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();

            return dateA - dateB;
        });
        const responseEnt = await fetch('http://localhost:3000/get-resp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom: nom, prenom: prenom })
        });
        if (!responseEnt.ok) {
            throw new Error('Erreur lors de la récupération des données de l\'entreprise');
        }
        const dataEnt = await responseEnt.json();
        for (const visite of visites) {
            const mois = month8(parseInt(visite.mois));
            const jour = visite.jour;
            const annee = visite.annee;
            const div = document.createElement('div');
            div.className = 'card mb-5';
            div.innerHTML = `
            <p><b>Date : </b> ${jour} ${mois} ${annee}</p>
            <p><b>Responsable : </b> ${dataEnt[0].nom} ${dataEnt[0].prenom}</p>
            `;
            visiteDiv.appendChild(div);
        }
    } catch (error) {
        console.error(error);
    }
}

loadEtuV();