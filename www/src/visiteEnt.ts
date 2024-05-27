const selectEtu = document.getElementById('selectEtu') as HTMLSelectElement;
const propositionDiv = document.getElementById('proposition') as HTMLDivElement;
const visiteDiv = document.getElementById('visite') as HTMLDivElement;
const accepterButton = document.getElementById('accepter') as HTMLButtonElement;
const refuserButton = document.getElementById('refuser') as HTMLButtonElement;

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
    loadPropositions();
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
            <div class="card-body">
            <p><b>Date : </b> ${jour} ${mois} ${annee}</p>
            <p><b>Responsable : </b> ${dataEnt[0].nom} ${dataEnt[0].prenom}</p>
            </div>
            `;
            visiteDiv.appendChild(div);
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadPropositions() {
    propositionDiv.innerHTML = '';
    try {
        const reponseCompte = await fetch('http://localhost:3000/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('http://localhost:3000/proposition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const propositions = await response.json();
        if (propositions.length === 0) {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <p>Aucune proposition de visite</p>
                `;
            propositionDiv.appendChild(div);
        } else {
            propositions.sort((a: { annee: number; mois: string; jour: number | undefined; }, b: { annee: number; mois: string; jour: number | undefined; }) => {
                const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
                const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();

                return dateA - dateB;
            });
            const reponseName = await fetch('http://localhost:3000/get-user-nomprenomID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: propositions[0].idEtu })
            });
            const dataName = await reponseName.json();
            const reponseResp = await fetch('http://localhost:3000/get-user-nomprenomID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: propositions[0].idResp })
            });
            const dataResp = await reponseResp.json();
            const resp = `${dataResp.nom} ${dataResp.prenom}`;
            const name = `${dataName.nom} ${dataName.prenom}`;
            const mois = month8(parseInt(propositions[0].mois));
            const jour = propositions[0].jour;
            const annee = propositions[0].annee;
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <div class="card-header">
                    Proposition de visite
                </div>
                <div class="card-body">
                    <p><b>Date : </b> ${jour} ${mois} ${annee}</p>
                    <p><b>Etudiant : </b> ${name}</p>
                    <p><b>Responsable Pédagogique : </b> ${resp}</p>
                    <button type="button" class="btn btn-success" id="accepter">Accepter</button>
                    <button type="button" class="btn btn-danger" id="refuser">Refuser</button>
                </div>
                `;
            propositionDiv.appendChild(div);
        }

    } catch (error) {
        console.error(error);
    }
}

loadEtuV();