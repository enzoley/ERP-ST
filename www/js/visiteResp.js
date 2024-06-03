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
const visiteDivResp = document.getElementById('visite');
const etuSelectResp = document.getElementById('selectEtu');
const visiteFormResp = document.getElementById('visiteForm');
const visiteJourResp = document.getElementById('inputJour');
const visiteMoisResp = document.getElementById('inputMois');
const visiteAnneeResp = document.getElementById('inputAnnee');
const ajoutRDVButton = document.getElementById('ajoutButton');
function estBissextile(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
function month4(mois) {
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
function loadEtu3() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('http://manclaus.alwaysdata.net/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('http://manclaus.alwaysdata.net/etu-resp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idResp: id })
            });
            const etudiants = yield response.json();
            etudiants.forEach((etu, index) => {
                const option = document.createElement('option');
                option.value = etu;
                option.textContent = etu;
                etuSelectResp.appendChild(option);
            });
            if (etuSelectResp.options.length > 0) {
                etuSelectResp.options[0].selected = true;
            }
        }
        catch (error) {
            console.error(error);
        }
        loadVisiteResp();
    });
}
function loadFormResp() {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        else if (visiteMoisResp.value == '1') {
            if (estBissextile(parseInt(visiteAnneeResp.value))) {
                max = 29;
            }
            else {
                max = 28;
            }
        }
        else {
            max = 30;
        }
        for (let i = 1; i <= max; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            if (i < 10) {
                option.textContent = '0' + i.toString();
            }
            else {
                option.textContent = i.toString();
            }
            visiteJourResp.appendChild(option);
        }
    });
}
loadEtu3();
loadFormResp();
visiteMoisResp.addEventListener('change', loadFormResp);
function createGoogleCalendarLink3({ title, description, location, startDate, endDate }) {
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
function createIcsFile3({ title, description, location, startDate, endDate }) {
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
function loadVisiteResp() {
    return __awaiter(this, void 0, void 0, function* () {
        visiteDivResp.innerHTML = '';
        try {
            const nom = etuSelectResp.value.split(' ')[0];
            const prenom = etuSelectResp.value.split(' ')[1];
            const response = yield fetch('http://manclaus.alwaysdata.net/visite-resp', {
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
            const responseEnt = yield fetch('http://manclaus.alwaysdata.net/get-ent', {
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
            let statut;
            for (const visite of visites) {
                if (visite.accept == 0) {
                    statut = 'En attente';
                }
                else {
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
        }
        catch (error) {
            console.error(error);
        }
    });
}
etuSelectResp.addEventListener('change', loadVisiteResp);
ajoutRDVButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        e.preventDefault();
        const reponseCompte = yield fetch('http://manclaus.alwaysdata.net/check-login');
        const compteRes = yield reponseCompte.json();
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
        const response = yield fetch('http://manclaus.alwaysdata.net/ajout-visite-resp', {
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
    }
    catch (error) {
        console.error(error);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRlUmVzcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92aXNpdGVSZXNwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBbUIsQ0FBQztBQUMxRSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUNoRixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBb0IsQ0FBQztBQUNoRixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUNqRixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUNqRixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztBQUNuRixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBc0IsQ0FBQztBQUVuRixTQUFTLGFBQWEsQ0FBQyxJQUFZO0lBQy9CLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNuQixPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7U0FBTSxDQUFDO1FBQ0osT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxJQUFZO0lBQ3hC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