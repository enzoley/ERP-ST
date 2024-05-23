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
const suiviDiv = document.getElementById('suivi');
function month(mois) {
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
function loadSuivi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('http://localhost:3000/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const email = compteRes.user.email;
            const nameResponse = yield fetch('http://localhost:3000/get-user-nomprenom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = yield nameResponse.json();
            const { nom, prenom } = data;
            const name = `${nom}${prenom}`;
            const response = yield fetch('http://localhost:3000/suivi-etu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });
            const suivi = yield response.json();
            suivi.forEach((suivi) => {
                const moisInt = parseInt(suivi.mois);
                const monthName = month(moisInt);
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
                suiviDiv.appendChild(suiviCard);
            });
        }
        catch (error) {
            console.error('Erreur lors du chargement du suivi :', error);
        }
    });
}
loadSuivi();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdmlFdHVkaWFudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdWl2aUV0dWRpYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBbUIsQ0FBQztBQUVwRSxTQUFTLEtBQUssQ0FBQyxJQUFZO0lBQ3ZCLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDWCxLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLE9BQU8sQ0FBQztRQUNuQixLQUFLLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLFdBQVcsQ0FBQztRQUN2QixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLEVBQUU7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QixLQUFLLEVBQUU7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QjtZQUNJLE9BQU8sY0FBYyxDQUFDO0lBQzlCLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBZSxTQUFTOztRQUNwQixJQUFJLENBQUM7WUFDRCxNQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztnQkFDcEMsT0FBTztZQUNYLENBQUM7WUFDRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxNQUFNLFlBQVksR0FBRyxNQUFNLEtBQUssQ0FBQywwQ0FBMEMsRUFBRTtnQkFDekUsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDbEMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDN0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7WUFDL0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsaUNBQWlDLEVBQUU7Z0JBQzVELE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2lCQUNyQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ2pDLENBQUMsQ0FBQztZQUNILE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFzSSxFQUFFLEVBQUU7Z0JBQ3JKLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxTQUFTLENBQUMsU0FBUyxHQUFHOztzQkFFWixTQUFTLElBQUksS0FBSyxDQUFDLEtBQUs7Ozs7MkNBSUgsS0FBSyxDQUFDLE1BQU07OzJDQUVaLEtBQUssQ0FBQyxZQUFZOzthQUVoRCxDQUFDO2dCQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQUVELFNBQVMsRUFBRSxDQUFDIn0=