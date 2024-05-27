const visiteDivResp = document.getElementById('visite') as HTMLDivElement;
const etuSelectResp = document.getElementById('selectEtu') as HTMLSelectElement;
const visiteFormResp = document.getElementById('visiteForm') as HTMLFormElement;
const visiteJourResp = document.getElementById('inputJour') as HTMLSelectElement;
const visiteMoisResp = document.getElementById('inputMois') as HTMLSelectElement;
const visiteAnneeResp = document.getElementById('inputAnnee') as HTMLSelectElement;

function estBissextile(year: number): boolean {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function month4(mois: number) {
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

async function loadEtu3() {
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
        etudiants.forEach((etu: string, index: number) => {
            const option = document.createElement('option');
            option.value = etu;
            option.textContent = etu;
            etuSelectResp.appendChild(option);
        });
        if (etuSelectResp.options.length > 0) {
            etuSelectResp.options[0].selected = true;
        }
    } catch (error) {
        console.error(error);
    }
    loadVisiteResp();


}

async function loadFormResp() {
    visiteJourResp.innerHTML = '';
    visiteAnneeResp.innerHTML = '';
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i < 2100; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        visiteAnneeResp.appendChild(option);
    }

    let max = 0;
    if (visiteMoisResp.value == '0' || visiteMoisResp.value == '2' || visiteMoisResp.value == '4' || visiteMoisResp.value == '6' || visiteMoisResp.value == '7' || visiteMoisResp.value == '9' || visiteMoisResp.value == '11') {
        max = 31;
    } else if (visiteMoisResp.value == '1') {
        if (estBissextile(parseInt(visiteAnneeResp.value))) {
            max = 29;
        } else {
            max = 28;
        }
    } else {
        max = 30;
    }

    for (let i = 1; i <= max; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        if (i < 10) {
            option.textContent = '0' + i.toString();
        } else {
            option.textContent = i.toString();
        }
        visiteJourResp.appendChild(option);
    }
}



loadEtu3();
loadFormResp();

visiteMoisResp.addEventListener('change', loadFormResp);

async function loadVisiteResp() {
    visiteDivResp.innerHTML = '';
    try {
        const nom = etuSelectResp.value.split(' ')[0];
        const prenom = etuSelectResp.value.split(' ')[1];
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
        const responseEnt = await fetch('http://localhost:3000/get-ent', {
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
            const mois = month4(parseInt(visite.mois));
            const jour = visite.jour;
            const annee = visite.annee;
            const div = document.createElement('div');
            div.className = 'card mb-5';
            div.innerHTML = `
            <p><b>Date : </b> ${jour} ${mois} ${annee}</p>
            <p><b>Entreprise : </b> ${dataEnt[0].nom}</p>
            `;
            visiteDivResp.appendChild(div);
        }
    } catch (error) {
        console.error(error);
    }
}

etuSelectResp.addEventListener('change', loadVisiteResp);