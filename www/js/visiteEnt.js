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
document.addEventListener('DOMContentLoaded', loadEtuV);
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
            const reponseCompte = yield fetch('https://entreprises.startechnormandy.com/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('https://entreprises.startechnormandy.com/etu-ent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idEnt: id })
            });
            const etudiants = yield response.json();
            if (etudiants.length != 0) {
                etudiants.forEach((etu, index) => {
                    const option = document.createElement('option');
                    option.value = etu;
                    option.textContent = etu;
                    selectEtu.appendChild(option);
                });
                if (selectEtu.options.length > 0) {
                    selectEtu.options[0].selected = true;
                }
                loadVisites();
                loadPropositions();
            }
            else {
                const div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `
                <div class="mt-3">
                <p class ="text-center">Aucune proposition de visite</p>
                </div>
                `;
                propositionDiv.appendChild(div);
            }
        }
        catch (error) {
            console.error('Erreur lors du chargement des étudiants :', error);
        }
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
            const response = yield fetch('https://entreprises.startechnormandy.com/visite-resp', {
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
            const responseEnt = yield fetch('https://entreprises.startechnormandy.com/get-resp', {
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
            const reponseCompte = yield fetch('https://entreprises.startechnormandy.com/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('https://entreprises.startechnormandy.com/proposition', {
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
                <div class="mt-3">
                <p class ="text-center">Aucune proposition de visite</p>
                </div>
                `;
                propositionDiv.appendChild(div);
            }
            else {
                let message = '';
                if (propositions.length > 1) {
                    message = ' propositions de visite';
                }
                else {
                    message = ' proposition de visite';
                }
                propositions.sort((a, b) => {
                    const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
                    const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();
                    return dateA - dateB;
                });
                const reponseName = yield fetch('https://entreprises.startechnormandy.com/get-user-nomprenomID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: propositions[0].idEtu })
                });
                const dataName = yield reponseName.json();
                const reponseResp = yield fetch('https://entreprises.startechnormandy.com/get-user-nomprenomID', {
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
                accepterButton = document.getElementById('accepter');
                refuserButton = document.getElementById('refuser');
                accepterButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield fetch('https://entreprises.startechnormandy.com/accepter', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: propositionCour })
                        });
                        if (response.ok) {
                            loadVisites();
                            loadPropositions();
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }));
                refuserButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield fetch('https://entreprises.startechnormandy.com/refuser', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: propositionCour })
                        });
                        if (response.ok) {
                            loadVisites();
                            loadPropositions();
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
selectEtu.addEventListener('change', loadVisites);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRlRW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Zpc2l0ZUVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFDNUUsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQW1CLENBQUM7QUFDaEYsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQW1CLENBQUM7QUFDdEUsSUFBSSxjQUFpQyxDQUFDO0FBQ3RDLElBQUksYUFBZ0MsQ0FBQztBQUVyQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFeEQsU0FBUyxNQUFNLENBQUMsSUFBWTtJQUN4QixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ1gsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxPQUFPLENBQUM7UUFDbkIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDakIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxXQUFXLENBQUM7UUFDdkIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxFQUFFO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDdEIsS0FBSyxFQUFFO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDdEI7WUFDSSxPQUFPLGNBQWMsQ0FBQztJQUM5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