const visiteEtuDiv = document.getElementById('visite') as HTMLDivElement;

function m(mois: number) {
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

async function loadVisite() {
    try {
        const reponseCompte = await fetch('http://localhost:3000/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('http://localhost:3000/visite-etu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        const visite = await response.json();
        visiteEtuDiv.innerHTML = '';
        visite.sort((a: { annee: number; mois: string; jour: number | undefined; }, b: { annee: number; mois: string; jour: number | undefined; }) => {
            const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
            const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();

            return dateA - dateB;
        });
        for (const vis of visite) {
            const mois = m(parseInt(vis.mois));
            const jour = vis.jour;
            const annee = vis.annee;
            const reponseResp = await fetch('http://localhost:3000/get-user-nomprenomID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: vis.idResp })
            });
            const dataResp = await reponseResp.json();
            const resp = `${dataResp.nom} ${dataResp.prenom}`;
            const div = document.createElement('div');
            div.className = 'card mb-5';
            div.innerHTML = `
                <p>
                    <b>Date : </b>${jour} ${mois} ${annee} <br>
                    <b>Responsable : </b>${resp} <br>
                </p>
            `;
            visiteEtuDiv.appendChild(div);
        }
    } catch (err) {
        console.error(err);
    }
}

loadVisite();