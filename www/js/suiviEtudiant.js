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
function loadSuivi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('http://localhost:3000/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const compte = compteRes.user;
            const email = compte.email;
            const response = yield fetch('http://localhost:3000/suivi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const suivi = yield response.json();
            suivi.forEach((suivi) => {
                const suiviCard = document.createElement('div');
                suiviCard.classList.add('card', 'mb-3');
                suiviCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${suivi.nom} ${suivi.prenom}</h5>
                    <p class="card-text">Entreprise : ${suivi.entreprise}</p>
                    <p class="card-text">Début : ${suivi.debut}</p>
                    <p class="card-text">Fin : ${suivi.fin}</p>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdmlFdHVkaWFudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdWl2aUV0dWRpYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBbUIsQ0FBQztBQUVwRSxTQUFlLFNBQVM7O1FBQ3BCLElBQUksQ0FBQztZQUNELE1BQU0sYUFBYSxHQUFHLE1BQU0sS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDdkUsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxPQUFPO1lBQ1gsQ0FBQztZQUNELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMzQixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyw2QkFBNkIsRUFBRTtnQkFDeEQsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDbEMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWtHLEVBQUUsRUFBRTtnQkFDakgsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxTQUFTLENBQUMsU0FBUyxHQUFHOzs2Q0FFVyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNO3dEQUNkLEtBQUssQ0FBQyxVQUFVO21EQUNyQixLQUFLLENBQUMsS0FBSztpREFDYixLQUFLLENBQUMsR0FBRzs7YUFFN0MsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDTCxDQUFDO0NBQUE7QUFFRCxTQUFTLEVBQUUsQ0FBQyJ9