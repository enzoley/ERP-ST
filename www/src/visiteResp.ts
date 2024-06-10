const visiteDivResp = document.getElementById('visite') as HTMLDivElement;
const etuSelectResp = document.getElementById('selectEtu') as HTMLSelectElement;
const visiteFormResp = document.getElementById('visiteForm') as HTMLFormElement;
const visiteJourResp = document.getElementById('inputJour') as HTMLSelectElement;
const visiteMoisResp = document.getElementById('inputMois') as HTMLSelectElement;
const visiteAnneeResp = document.getElementById('inputAnnee') as HTMLSelectElement;
const ajoutRDVButton = document.getElementById('ajoutButton') as HTMLButtonElement;

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
        if (etudiants.length != 0) {
            etudiants.forEach((etu: string, index: number) => {
                const option = document.createElement('option');
                option.value = etu;
                option.textContent = etu;
                etuSelectResp.appendChild(option);
            });
            if (etuSelectResp.options.length > 0) {
                etuSelectResp.options[0].selected = true;
            }
            loadVisiteResp();
            loadFormResp("-1");
        } else {
            ajoutRDVButton.disabled = true;
        }
    } catch (error) {
        console.error(error);
    }



}

async function loadFormResp(jour: string) {
    visiteJourResp.innerHTML = '';
    visiteAnneeResp.innerHTML = '';
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i < currentYear + 100; i++) {
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
    const j = parseInt(jour);
    for (let i = 1; i <= max; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        if (i < 10) {
            option.textContent = '0' + i.toString();
        } else {
            option.textContent = i.toString();
        }
        if (i == j) {
            option.selected = true;
        }
        visiteJourResp.appendChild(option);
    }
}



loadEtu3();


visiteMoisResp.addEventListener('change', function () {
    loadFormResp(visiteJourResp.value);
});


function createGoogleCalendarLink3({
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

function createIcsFile3({
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

async function loadVisiteResp() {
    visiteDivResp.innerHTML = '';
    try {
        const nom = etuSelectResp.value.split(' ')[0];
        const prenom = etuSelectResp.value.split(' ')[1];
        const response = await fetch('https://entreprises.startechnormandy.com/visite-resp', {
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
        const responseEnt = await fetch('https://entreprises.startechnormandy.com/get-ent', {
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
        let statut;
        for (const visite of visites) {
            if (visite.accept == 0) {
                statut = 'En attente';
            } else {
                statut = 'Accepté';
            }
            const mois = month4(parseInt(visite.mois));
            const jour = visite.jour;
            const annee = visite.annee;
            const div = document.createElement('div');
            const monthAgenda = (parseInt(visite.mois) + 1).toString();
            const startDate = `${annee}${(monthAgenda.padStart(2, '0'))}${jour.padStart(2, '0')}T090000Z`;
            const endDate = `${annee}${(monthAgenda.padStart(2, '0'))}${jour.padStart(2, '0')}T100000Z`;
            const googleCalendarLink = createGoogleCalendarLink3({
                title: "Visite de l'entreprise",
                description: "Visite par un responsable pédagogique de la StarTech Normandy",
                location: "Paris, France",
                startDate,
                endDate
            });
            const icsLink = createIcsFile3({
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
            <p><b>Entreprise : </b> ${dataEnt[0].nom}</p>
            <p><b>Statut : </b> ${statut}</p>
            <a href="${googleCalendarLink}" target="_blank" class="btn btn-primary">Ajouter à Google Calendar</a>
            <a href="${icsLink}" download="event.ics" class="btn btn-primary">Ajouter à l'agenda</a>
            </div>
            `;
            visiteDivResp.appendChild(div);
        }
    } catch (error) {
        console.error(error);
    }
}

etuSelectResp.addEventListener('change', loadVisiteResp);

ajoutRDVButton.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        const reponseCompte = await fetch('https://entreprises.startechnormandy.com/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const nom = etuSelectResp.value.split(' ')[0];
        const prenom = etuSelectResp.value.split(' ')[1];
        const jour = visiteJourResp.value;
        const mois = visiteMoisResp.value;
        const annee = visiteAnneeResp.value;
        const response = await fetch('https://entreprises.startechnormandy.com/ajout-visite-resp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, nom: nom, prenom: prenom, jour: jour, mois: mois, annee: annee })
        });
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de la visite');
        }
        loadVisiteResp();
    } catch (error) {
        console.error(error);
    }
});