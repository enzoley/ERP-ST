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
                etuSelectResp.appendChild(option);
            });
            if (etuSelectResp.options.length > 0) {
                etuSelectResp.options[0].selected = true;
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function loadFormResp() {
    return __awaiter(this, void 0, void 0, function* () {
        visiteJourResp.innerHTML = '';
        visiteAnneeResp.innerHTML = '';
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i < 2100; i++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRlUmVzcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92aXNpdGVSZXNwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBbUIsQ0FBQztBQUMxRSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUNoRixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBb0IsQ0FBQztBQUNoRixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUNqRixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUNqRixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztBQUVuRixTQUFTLGFBQWEsQ0FBQyxJQUFZO0lBQy9CLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNuQixPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7U0FBTSxDQUFDO1FBQ0osT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxJQUFZO0lBQ3hCLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDWCxLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztR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