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
const partenariat = document.getElementById('partenariat');
const emailInput = document.getElementById('inputEmailPart');
const formDiv = document.getElementById('form');
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const reponseCompte = yield fetch('http://manclaus.alwaysdata.net/check-login');
    const compteRes = yield reponseCompte.json();
    if (!compteRes.loggedIn) {
        window.location.href = 'index.html';
        return;
    }
    const email = compteRes.user.email;
    try {
        const response = yield fetch('http://manclaus.alwaysdata.net/partenariat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = yield response.json();
        const { message } = data;
        if (response.ok) {
            if (message === 'impossible') {
                formDiv.innerHTML = ``;
                const suiviCard = document.createElement('div');
                suiviCard.classList.add('card', 'mb-5');
                suiviCard.innerHTML = `
                <div class="card-body">
                    <p class="card-text">Formulaire déjà rempli</p>
                </div>
                
            `;
                formDiv.appendChild(suiviCard);
            }
        }
        else {
            alert(data.message);
        }
    }
    catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGVuYXJpYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGFydGVuYXJpYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFvQixDQUFDO0FBQzlFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXFCLENBQUM7QUFDakYsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQW1CLENBQUM7QUFFbEUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQVMsRUFBRTtJQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0lBQ2hGLE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLE9BQU87SUFDWCxDQUFDO0lBQ0QsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkMsSUFBSSxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsNENBQTRDLEVBQUU7WUFDdkUsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjthQUNyQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNkLElBQUksT0FBTyxLQUFLLFlBQVksRUFBRSxDQUFDO2dCQUMzQixPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtnQkFDdEIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxTQUFTLENBQUMsU0FBUyxHQUFHOzs7OzthQUt6QixDQUFDO2dCQUNFLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9