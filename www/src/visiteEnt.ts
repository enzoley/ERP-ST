const selectEtu = document.getElementById('selectEtu') as HTMLSelectElement;
const propositionDiv = document.getElementById('proposition') as HTMLDivElement;
const visiteDiv = document.getElementById('visite') as HTMLDivElement;
let accepterButton: HTMLButtonElement;
let refuserButton: HTMLButtonElement;

document.addEventListener('DOMContentLoaded', loadEtuV);

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

let propositionCour: any;

async function loadEtuV() {
    try {
        const reponseCompte = await fetch('http://manclaus.alwaysdata.net/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('http://manclaus.alwaysdata.net/etu-ent', {
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

function createGoogleCalendarLink({
    title,
    description,
    location,
    startDate,
    endDate
}: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
}) {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
        text: title,
        dates: `${startDate}/${endDate}`,
        details: description,
        location: location,
        sf: 'true',
        output: 'xml'
    });

    return `${baseUrl}&${params.toString()}`;
}

function createIcsFile({
    title,
    description,
    location,
    startDate,
    endDate
}: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
}) {
    const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${title}
    DESCRIPTION:${description}
    LOCATION:${location}
    DTSTART:${startDate}
    DTEND:${endDate}
    END:VEVENT
    END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    return URL.createObjectURL(blob);
}

async function loadVisites() {
    visiteDiv.innerHTML = '';
    try {
        const nom = selectEtu.value.split(' ')[0];
        const prenom = selectEtu.value.split(' ')[1];
        const response = await fetch('http://manclaus.alwaysdata.net/visite-resp', {
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
        const responseEnt = await fetch('http://manclaus.alwaysdata.net/get-resp', {
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
            if (visite.accept == 1) {
                const mois = month8(parseInt(visite.mois));
                const jour = visite.jour;
                const annee = visite.annee;
                const div = document.createElement('div');
                const monthAgenda = (parseInt(visite.mois) + 1).toString();
                const startDate = `${annee}${(monthAgenda.padStart(2, '0'))}${jour.padStart(2, '0')}T090000Z`;
                const endDate = `${annee}${(monthAgenda.padStart(2, '0'))}${jour.padStart(2, '0')}T100000Z`;
                const googleCalendarLink = createGoogleCalendarLink({
                    title: "Visite de l'entreprise",
                    description: "Visite par un responsable pédagogique de la StarTech Normandy",
                    location: "Paris, France",
                    startDate,
                    endDate
                });
                const icsLink = createIcsFile({
                    title: "Visite de l'entreprise",
                    description: "Visite par un responsable pédagogique de la StarTech Normandy",
                    location: "Paris, France",
                    startDate,
                    endDate
                });
                div.className = 'card mb-5';
                div.innerHTML = `
            <div class="card-body">
            <p><b>Date : </b> ${jour} ${mois} ${annee}</p>
            <p><b>Responsable : </b> ${dataEnt[0].nom} ${dataEnt[0].prenom}</p>
            <a href="${googleCalendarLink}" target="_blank" class="btn btn-primary">Ajouter à Google Calendar</a>
            <a href="${icsLink}" download="event.ics" class="btn btn-primary">Ajouter à l'agenda</a>
            </div>
            `;
                visiteDiv.appendChild(div);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadPropositions() {
    propositionDiv.innerHTML = '';
    try {
        const reponseCompte = await fetch('http://manclaus.alwaysdata.net/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('http://manclaus.alwaysdata.net/proposition', {
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
                <div class="mt-3">
                <p class ="text-center">Aucune proposition de visite</p>
                </div>
                `;
            propositionDiv.appendChild(div);
        } else {
            let message = '';
            if (propositions.length > 1) {
                message = ' propositions de visite';
            } else {
                message = ' proposition de visite';
            }
            propositions.sort((a: { annee: number; mois: string; jour: number | undefined; }, b: { annee: number; mois: string; jour: number | undefined; }) => {
                const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
                const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();

                return dateA - dateB;
            });
            const reponseName = await fetch('http://manclaus.alwaysdata.net/get-user-nomprenomID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: propositions[0].idEtu })
            });
            const dataName = await reponseName.json();
            const reponseResp = await fetch('http://manclaus.alwaysdata.net/get-user-nomprenomID', {
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
            propositionCour = propositions[0].id;
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<div class="card-header">
            <h4>${propositions.length}${message}</h4>
                <hr>
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
            accepterButton = document.getElementById('accepter') as HTMLButtonElement;
            refuserButton = document.getElementById('refuser') as HTMLButtonElement;
            accepterButton.addEventListener('click', async () => {
                try {
                    const response = await fetch('http://manclaus.alwaysdata.net/accepter', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: propositionCour })
                    });
                    if (response.ok) {
                        window.location.reload();
                    }
                } catch (error) {
                    console.error(error);
                }
            });
            refuserButton.addEventListener('click', async () => {
                try {
                    const response = await fetch('http://manclaus.alwaysdata.net/refuser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: propositionCour })
                    });
                    if (response.ok) {
                        window.location.reload();
                    }
                } catch (error) {
                    console.error(error);
                }
            });
        }

    } catch (error) {
        console.error(error);
    }
}


selectEtu.addEventListener('change', loadVisites);

