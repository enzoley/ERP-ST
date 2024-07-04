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
const suiviDivEnt = document.getElementById('suivi');
const etuSelectorEnt = document.getElementById('selectEtu');
const ajoutForm = document.getElementById('ajoutForm');
const inputType = document.getElementById('inputType');
const inputPeriode = document.getElementById('inputPeriode');
const inputText = document.getElementById('inputText');
const ajoutBouton = document.getElementById('ajoutButton');
function month3(mois) {
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
function loadEtu2() {
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
                    etuSelectorEnt.appendChild(option);
                });
                if (etuSelectorEnt.options.length > 0) {
                    etuSelectorEnt.options[0].selected = true;
                }
                loadSuiviEnt();
            }
        }
        catch (error) {
            console.error('Erreur lors du chargement des étudiants :', error);
        }
    });
}
etuSelectorEnt.addEventListener("change", loadSuiviEnt);
function loadSuiviEnt() {
    inputPeriode.innerHTML = "";
    inputText.value = "";
    suiviDivEnt.innerHTML = "";
    const etu = etuSelectorEnt.value;
    const etuName = etu.split(' ').join('');
    console.log(etuName);
    fetch('https://entreprises.startechnormandy.com/suivi-etu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: etuName })
    })
        .then(response => response.json())
        .then(suivi => {
        suivi.forEach((suivi) => {
            const moisInt = parseInt(suivi.mois);
            const monthName = month3(moisInt);
            const option = document.createElement('option');
            option.value = suivi.mois + ' ' + suivi.annee;
            option.textContent = monthName + ' ' + suivi.annee;
            inputPeriode.appendChild(option);
            const suiviCard = document.createElement('div');
            suiviCard.classList.add('card', 'mb-5');
            suiviCard.innerHTML = `
                <div class="card-header">
                    ${monthName} ${suivi.annee}
                </div>
                <div class="card-body">
                    <p class="card-title"><b>Tâches : </b></p>
                    <p class="card-text">${suivi.taches}</p>
                    <p class="card-title"><b>Commentaires : </b></p>
                    <p class="card-text">${suivi.commentaires}</p>
                    <p class="card-title"><b>Fichier joint : </b></p>
                    <div class="file-info"></div>
                </div>
            `;
            suiviDivEnt.appendChild(suiviCard);
            fetch(`/files?mois=${moisInt}&annee=${suivi.annee}&nom=${etuName}`)
                .then(response => response.json())
                .then(data => {
                const fileInfo = suiviCard.querySelector('.file-info');
                if (data) {
                    const link = document.createElement('a');
                    link.textContent = data.filename;
                    link.href = `data:${data.mimeType};base64,${data.fileData}`;
                    link.download = data.filename;
                    link.classList.add('file-link');
                    fileInfo.appendChild(link);
                }
                else {
                    fileInfo.textContent = 'No file available.';
                }
            })
                .catch(error => console.error('Error fetching file:', error));
        });
    });
}
loadEtu2();
ajoutBouton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const nameEtu = etuSelectorEnt.options[etuSelectorEnt.selectedIndex].text.split(' ').join('');
    const type = inputType.value;
    const periode = inputPeriode.value;
    const text = inputText.value;
    try {
        const response = yield fetch('https://entreprises.startechnormandy.com/update-suivi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, periode, text, nomEtu: nameEtu })
        });
        const data = yield response.json();
        if (response.ok) {
            alert('Ajout réussi');
        }
        else {
            alert(data.message);
        }
    }
    catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
    loadSuiviEnt();
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdmlFbnRyZXByaXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N1aXZpRW50cmVwcmlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQW1CLENBQUM7QUFDdkUsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFDakYsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQW9CLENBQUM7QUFDMUUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFDNUUsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7QUFDbEYsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXdCLENBQUM7QUFDOUUsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7QUFFaEYsU0FBUyxNQUFNLENBQUMsSUFBWTtJQUN4QixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ1gsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxPQUFPLENBQUM7UUFDbkIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDakIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxXQUFXLENB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