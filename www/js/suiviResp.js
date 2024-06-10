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
const suiviDivResp = document.getElementById('suivi');
const etuSelectorResp = document.getElementById('selectEtu');
function month2(mois) {
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
function loadEtu() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('https://entreprises.startechnormandy.com/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('https://entreprises.startechnormandy.com/etu-resp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idResp: id })
            });
            const etudiants = yield response.json();
            if (etudiants.length != 0) {
                etudiants.forEach((etu, index) => {
                    const option = document.createElement('option');
                    option.value = etu;
                    option.textContent = etu;
                    etuSelectorResp.appendChild(option);
                });
                if (etuSelectorResp.options.length > 0) {
                    etuSelectorResp.options[0].selected = true;
                }
                loadSuiviResp();
            }
        }
        catch (error) {
            console.error('Erreur lors du chargement des étudiants :', error);
        }
    });
}
etuSelectorResp.addEventListener("change", loadSuiviResp);
function loadSuiviResp() {
    suiviDivResp.innerHTML = "";
    const etu = etuSelectorResp.value;
    const etuName = etu.split(' ').join('');
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
            const monthName = month2(moisInt);
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
            suiviDivResp.appendChild(suiviCard);
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
loadEtu();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdmlSZXNwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N1aXZpUmVzcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQW1CLENBQUM7QUFDeEUsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFFbEYsU0FBUyxNQUFNLENBQUMsSUFBWTtJQUN4QixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ1gsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxPQUFPLENBQUM7UUFDbkIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDakIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxXQUFXLENBQUM7UUFDdkIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxFQUFFO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDdEIsS0FBSyxFQUFFO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDdEI7WUFDSSxPQUFPLGNBQWMsQ0FBQztJQUM5QixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWUsT0FBTzs7UUFDbEIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUMxRixNQUFNLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3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