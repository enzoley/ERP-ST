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
            const reponseCompte = yield fetch('http://localhost:3000/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('http://localhost:3000/etu-resp', {
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
                etuSelectorResp.appendChild(option);
            });
            if (etuSelectorResp.options.length > 0) {
                etuSelectorResp.options[0].selected = true;
            }
            loadSuiviResp();
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
    console.log(etuName);
    fetch('http://localhost:3000/suivi-etu', {
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
                </div>
            `;
            suiviDivResp.appendChild(suiviCard);
        });
    });
}
loadEtu();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdmlSZXNwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N1aXZpUmVzcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQW1CLENBQUM7QUFDeEUsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFFbEYsU0FBUyxNQUFNLENBQUMsSUFBWTtJQUN4QixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ1gsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxPQUFPLENBQUM7UUFDbkIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDakIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxXQUFXLENBQUM7UUFDdkIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUM7UUFDckIsS0FBSyxFQUFFO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDdEIsS0FBSyxFQUFFO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDdEI7WUFDSSxPQUFPLGNBQWMsQ0FBQztJQUM5QixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWUsT0FBTzs7UUFDbEIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUN2RSxNQUFNLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3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