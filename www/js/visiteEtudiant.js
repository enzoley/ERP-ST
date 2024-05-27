"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const visiteEtuDiv = document.getElementById('visite');
function m(mois) {
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
function createGoogleCalendarLink2({ title, description, location, startDate, endDate }) {
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
function createIcsFile2({ title, description, location, startDate, endDate }) {
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
function loadVisite() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('http://localhost:3000/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('http://localhost:3000/visite-etu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            const visite = yield response.json();
            visiteEtuDiv.innerHTML = '';
            visite.sort((a, b) => {
                const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
                const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();
                return dateA - dateB;
            });
            for (const vis of visite) {
                const mois = m(parseInt(vis.mois));
                const jour = vis.jour;
                const annee = vis.annee;
                const reponseResp = yield fetch('http://localhost:3000/get-user-nomprenomID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: vis.idResp })
                });
                const dataResp = yield reponseResp.json();
                const resp = `${dataResp.nom} ${dataResp.prenom}`;
                const div = document.createElement('div');
                const monthAgenda = (parseInt(visite.mois) + 1).toString();
                const startDate = `${annee}${(monthAgenda.padStart(2, '0'))}${jour.padStart(2, '0')}T090000Z`;
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
        }
        catch (err) {
            console.error(err);
        }
    });
}
loadVisite();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRlRXR1ZGlhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmlzaXRlRXR1ZGlhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFtQixDQUFDO0FBRXpFLFNBQVMsQ0FBQyxDQUFDLElBQVk7SUFDbkIsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNYLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLEtBQUssQ0FBQztZQUNGLE9BQU8sT0FBTyxDQUFDO1FBQ25CLEtBQUssQ0FBQztZQUNGLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLEtBQUssQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLEtBQUssQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssRUFBRTtZQUNILE9BQU8sVUFBVSxDQUFDO1FBQ3RCLEtBQUssRUFBRTtZQUNILE9BQU8sVUFBVSxDQUFDO1FBQ3RCO1lBQ0ksT0FBTyxjQUFjLENBQUM7SUFDOUIsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLEVBQy9CLEtBQUssRUFDTCxXQUFXLEVBQ1gsUUFBUSxFQUNSLFNBQVMsRUFDVCxPQUFPLEVBT1Y7SUFDRyxNQUFNLE9BQU8sR0FBRyx3REFBd0QsQ0FBQztJQUN6RSxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQztRQUMvQixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxHQUFH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