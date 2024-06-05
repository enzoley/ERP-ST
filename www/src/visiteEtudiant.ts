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

function createGoogleCalendarLink2({
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

function createIcsFile2({
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

async function loadVisite() {
    try {
        const reponseCompte = await fetch('https://entreprises.startechnormandy.com/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const id = compteRes.user.id;
        const response = await fetch('https://entreprises.startechnormandy.com/visite-etu', {
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
            const reponseResp = await fetch('https://entreprises.startechnormandy.com/get-user-nomprenomID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: vis.idResp })
            });
            const dataResp = await reponseResp.json();
            const resp = `${dataResp.nom} ${dataResp.prenom}`;
            const div = document.createElement('div');
            const monthAgenda = (parseInt(vis.mois) + 1).toString();
            const startDate = `${annee}${(monthAgenda.padStart(2, '0'))}${jour.padStart(2, '0')}T090000Z`;
            console.log(startDate);
            const endDate = `${annee}${(monthAgenda.padStart(2, '0'))}${jour.padStart(2, '0')}T100000Z`;
            const googleCalendarLink = createGoogleCalendarLink2({
                title: "Visite de l'entreprise",
                description: "Visite par un responsable pédagogique de la StarTech Normandy",
                location: "Paris, France",
                startDate,
                endDate
            });
            const icsLink = createIcsFile2({
                title: "Visite de l'entreprise",
                description: "Visite par un responsable pédagogique de la StarTech Normandy",
                location: "Paris, France",
                startDate,
                endDate
            });
            div.className = 'card mb-5';
            div.innerHTML = `
            <div class="card-body">
                
                <p><b>Date : </b>${jour} ${mois} ${annee} <br></p>
                <p><b>Responsable : </b>${resp} <br></p>
                <a href="${googleCalendarLink}" target="_blank" class="btn btn-primary">Ajouter à Google Calendar</a>
                <a href="${icsLink}" download="event.ics" class="btn btn-primary">Ajouter à l'agenda</a>
                
            </div>
            `;
            visiteEtuDiv.appendChild(div);
        }
    } catch (err) {
        console.error(err);
    }
}

loadVisite();