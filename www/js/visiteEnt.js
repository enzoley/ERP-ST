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
const selectEtu = document.getElementById('selectEtu');
const propositionDiv = document.getElementById('proposition');
const visiteDiv = document.getElementById('visite');
let accepterButton;
let refuserButton;
function month8(mois) {
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
let propositionCour;
function loadEtuV() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('http://localhost:3000/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('http://localhost:3000/etu-ent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idEnt: id })
            });
            const etudiants = yield response.json();
            etudiants.forEach((etu, index) => {
                const option = document.createElement('option');
                option.value = etu;
                option.textContent = etu;
                selectEtu.appendChild(option);
            });
            if (selectEtu.options.length > 0) {
                selectEtu.options[0].selected = true;
            }
        }
        catch (error) {
            console.error('Erreur lors du chargement des étudiants :', error);
        }
        loadVisites();
        loadPropositions();
    });
}
function createGoogleCalendarLink({ title, description, location, startDate, endDate }) {
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
function createIcsFile({ title, description, location, startDate, endDate }) {
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
function loadVisites() {
    return __awaiter(this, void 0, void 0, function* () {
        visiteDiv.innerHTML = '';
        try {
            const nom = selectEtu.value.split(' ')[0];
            const prenom = selectEtu.value.split(' ')[1];
            const response = yield fetch('http://localhost:3000/visite-resp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nom: nom, prenom: prenom })
            });
            const visites = yield response.json();
            visites.sort((a, b) => {
                const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
                const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();
                return dateA - dateB;
            });
            const responseEnt = yield fetch('http://localhost:3000/get-resp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nom: nom, prenom: prenom })
            });
            if (!responseEnt.ok) {
                throw new Error('Erreur lors de la récupération des données de l\'entreprise');
            }
            const dataEnt = yield responseEnt.json();
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
        }
        catch (error) {
            console.error(error);
        }
    });
}
function loadPropositions() {
    return __awaiter(this, void 0, void 0, function* () {
        propositionDiv.innerHTML = '';
        try {
            const reponseCompte = yield fetch('http://localhost:3000/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('http://localhost:3000/proposition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const propositions = yield response.json();
            if (propositions.length === 0) {
                const div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `
                <p>Aucune proposition de visite</p>
                `;
                propositionDiv.appendChild(div);
            }
            else {
                propositions.sort((a, b) => {
                    const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
                    const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();
                    return dateA - dateB;
                });
                const reponseName = yield fetch('http://localhost:3000/get-user-nomprenomID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: propositions[0].idEtu })
                });
                const dataName = yield reponseName.json();
                const reponseResp = yield fetch('http://localhost:3000/get-user-nomprenomID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: propositions[0].idResp })
                });
                const dataResp = yield reponseResp.json();
                const resp = `${dataResp.nom} ${dataResp.prenom}`;
                const name = `${dataName.nom} ${dataName.prenom}`;
                const mois = month8(parseInt(propositions[0].mois));
                const jour = propositions[0].jour;
                const annee = propositions[0].annee;
                propositionCour = propositions[0].id;
                const div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `<div class="card-header">
            <h4>${propositions.length} propositions de visite</h4>
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
                accepterButton = document.getElementById('accepter');
                refuserButton = document.getElementById('refuser');
                accepterButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield fetch('http://localhost:3000/accepter', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: propositionCour })
                        });
                        if (response.ok) {
                            window.location.reload();
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }));
                refuserButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield fetch('http://localhost:3000/refuser', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: propositionCour })
                        });
                        if (response.ok) {
                            window.location.reload();
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }));
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
loadEtuV();
selectEtu.addEventListener('change', loadVisites);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRlRW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Zpc2l0ZUVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFDNUUsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQW1CLENBQUM7QUFDaEYsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQW1CLENBQUM7QUFDdEUsSUFBSSxjQUFpQyxDQUFDO0FBQ3RDLElBQUksYUFBZ0MsQ0FBQztBQUVyQyxTQUFTLE1BQU0sQ0FBQyxJQUFZO0lBQ3hCLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDWCxLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLE9BQU8sQ0FBQztRQUNuQixLQUFLLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLFdBQVcsQ0FBQztRQUN2QixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLEVBQUU7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QixLQUFLLEVBQUU7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QjtZQUNJLE9BQU8sY0FBYyxDQUFDO0lBQzlCLENBQUM7QUFDTCxDQUFDO0FBRUQsSUFBSSxlQUFvQixDQUFDO0FBRXpCLFNBQWUsUUFBUTs7UUFDbkIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUN2RSxNQUFNLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7Z0JBQ3BDLE9BQU87WUFDWCxDQUFDO1lBQ0QsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsK0JBQStCLEVBQUU7Z0JBQzFELE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2lCQUNyQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUN0QyxDQUFDLENBQUM7WUFDSCxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEtBQWEsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7Z0JBQ3pCLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUMvQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekMsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBQ0QsV0FBVyxFQUFFLENBQUM7UUFDZCxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Q0FBQTtBQUVELFNBQVMsd0JBQXdCLENBQUMsRUFDOUIsS0FBSyxFQUNMLFdBQVcsRUFDWCxRQUFRLEVBQ1IsU0FBUyxFQUNULE9BQU8sRUFPVjtJQUNHLE1BQU0sT0FBTyxHQUFHLHdEQUF3RCxDQUFDO0lBQ3pFLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDO1FBQy9CLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLEdBQUcsU0FBUyxJQUFJLE9BQU8sRUFBRTtRQUNoQyxPQUFPLEVBQUUsV0FBVztRQUNwQixRQUFRLEVBQUUsUUFBUTtRQUNsQixFQUFFLEVBQUUsTUFBTTtRQUNWLE1BQU0sRUFBRSxLQUFLO0tBQ2hCLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7QUFDN0MsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEVBQ25CLEtBQUssRUFDTCxXQUFXLEVBQ1gsUUFBUSxFQUNSLFNBQVMsRUFDVCxPQUFPLEVBT1Y7SUFDRyxNQUFNLFVBQVUsR0FBRzs7O2NBR1QsS0FBSztrQkFDRCxXQUFXO2VBQ2QsUUFBUTtjQUNULFNBQVM7WUFDWCxPQUFPOztrQkFFRCxDQUFDO0lBRWYsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRUQsU0FBZSxXQUFXOztRQUN0QixTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUM7WUFDRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDOUQsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDckQsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQTZELEVBQUUsQ0FBNkQsRUFBRSxFQUFFO2dCQUMxSSxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDeEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRXhFLE9BQU8sS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUFDLGdDQUFnQyxFQUFFO2dCQUM5RCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUNyRCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7WUFDbkYsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pDLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQzNCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDckIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDekIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDM0IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUMzRCxNQUFNLFNBQVMsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQztvQkFDOUYsTUFBTSxPQUFPLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUM7b0JBQzVGLE1BQU0sa0JBQWtCLEdBQUcsd0JBQXdCLENBQUM7d0JBQ2hELEtBQUssRUFBRSx3QkFBd0I7d0JBQy9CLFdBQVcsRUFBRSwrREFBK0Q7d0JBQzVFLFFBQVEsRUFBRSxlQUFlO3dCQUN6QixTQUFTO3dCQUNULE9BQU87cUJBQ1YsQ0FBQyxDQUFDO29CQUNILE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQzt3QkFDMUIsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsV0FBVyxFQUFFLCtEQUErRDt3QkFDNUUsUUFBUSxFQUFFLGVBQWU7d0JBQ3pCLFNBQVM7d0JBQ1QsT0FBTztxQkFDVixDQUFDLENBQUM7b0JBQ0gsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7b0JBQzVCLEdBQUcsQ0FBQyxTQUFTLEdBQUc7O2dDQUVBLElBQUksSUFBSSxJQUFJLElBQUksS0FBSzt1Q0FDZCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO3VCQUNuRCxrQkFBa0I7dUJBQ2xCLE9BQU87O2FBRWpCLENBQUM7b0JBQ0UsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQUVELFNBQWUsZ0JBQWdCOztRQUMzQixjQUFjLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUM7WUFDRCxNQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztnQkFDcEMsT0FBTztZQUNYLENBQUM7WUFDRCxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDOUQsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDL0IsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0MsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsR0FBRyxDQUFDLFNBQVMsR0FBRzs7aUJBRVgsQ0FBQztnQkFDTixjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7aUJBQU0sQ0FBQztnQkFDSixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBNkQsRUFBRSxDQUE2RCxFQUFFLEVBQUU7b0JBQy9JLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN4RSxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFeEUsT0FBTyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLEtBQUssQ0FBQyw0Q0FBNEMsRUFBRTtvQkFDMUUsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFO3dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7cUJBQ3JDO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDdEQsQ0FBQyxDQUFDO2dCQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQyxNQUFNLFdBQVcsR0FBRyxNQUFNLEtBQUssQ0FBQyw0Q0FBNEMsRUFBRTtvQkFDMUUsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFO3dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7cUJBQ3JDO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDdkQsQ0FBQyxDQUFDO2dCQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQyxNQUFNLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsRCxNQUFNLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxlQUFlLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FBQyxTQUFTLEdBQUc7a0JBQ1YsWUFBWSxDQUFDLE1BQU07Ozs7O3dDQUtHLElBQUksSUFBSSxJQUFJLElBQUksS0FBSzs0Q0FDakIsSUFBSTsyREFDVyxJQUFJOzs7O2lCQUk5QyxDQUFDO2dCQUNOLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBc0IsQ0FBQztnQkFDMUUsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFzQixDQUFDO2dCQUN4RSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQVMsRUFBRTtvQkFDaEQsSUFBSSxDQUFDO3dCQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGdDQUFnQyxFQUFFOzRCQUMzRCxNQUFNLEVBQUUsTUFBTTs0QkFDZCxPQUFPLEVBQUU7Z0NBQ0wsY0FBYyxFQUFFLGtCQUFrQjs2QkFDckM7NEJBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLENBQUM7eUJBQ2hELENBQUMsQ0FBQzt3QkFDSCxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDZCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUM3QixDQUFDO29CQUNMLENBQUM7b0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQzt3QkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QixDQUFDO2dCQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7Z0JBQ0gsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFTLEVBQUU7b0JBQy9DLElBQUksQ0FBQzt3QkFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQywrQkFBK0IsRUFBRTs0QkFDMUQsTUFBTSxFQUFFLE1BQU07NEJBQ2QsT0FBTyxFQUFFO2dDQUNMLGNBQWMsRUFBRSxrQkFBa0I7NkJBQ3JDOzRCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxDQUFDO3lCQUNoRCxDQUFDLENBQUM7d0JBQ0gsSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDN0IsQ0FBQztvQkFDTCxDQUFDO29CQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7d0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsQ0FBQztnQkFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUVMLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztDQUFBO0FBRUQsUUFBUSxFQUFFLENBQUM7QUFFWCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDIn0=