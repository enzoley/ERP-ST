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
const connexionEmail = document.getElementById('inputEmail');
const connexionPassword = document.getElementById('inputPassword');
const connexionButton = document.getElementById('connexionButton');
const connexionSituation = document.getElementById('inputSituation');
const connexionForm = document.getElementById('connexionForm');
const inscription = document.getElementById('inscriptionButton');
inscription.addEventListener('click', () => {
    window.location.href = "resetPassword2.html";
});
document.addEventListener('DOMContentLoaded', () => {
    if (connexionForm) {
        connexionForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const email = connexionEmail.value;
            const password = connexionPassword.value;
            const situation = connexionSituation.value;
            console.log(password);
            try {
                const response = yield fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, situation })
                });
                const data = yield response.json();
                if (response.ok) {
                    alert('Connexion réussie');
                    if (situation == "etudiant") {
                        window.location.href = "accueilEtudiant.html";
                    }
                    else if (situation == "pedagogique") {
                        window.location.href = "accueilResponsablePedagogique.html";
                    }
                    else if (situation == "entreprise") {
                        window.location.href = "accueilEntreprise.html";
                    }
                    else {
                        window.location.href = "accueilAdmin.html";
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFxQixDQUFDO0FBQ2pGLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFDdkYsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBc0IsQ0FBQztBQUN4RixNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXNCLENBQUM7QUFDMUYsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQW9CLENBQUM7QUFDbEYsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBc0IsQ0FBQztBQUV0RixXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFFL0MsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNoQixhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDckQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQztnQkFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyw2QkFBNkIsRUFBRTtvQkFDeEQsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFO3dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7cUJBQ3JDO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztpQkFDdkQsQ0FBQyxDQUFDO2dCQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVuQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDZCxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxTQUFTLElBQUksVUFBVSxFQUFFLENBQUM7d0JBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO29CQUNsRCxDQUFDO3lCQUFNLElBQUksU0FBUyxJQUFJLGFBQWEsRUFBRSxDQUFDO3dCQUNwQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxvQ0FBb0MsQ0FBQztvQkFDaEUsQ0FBQzt5QkFBTSxJQUFJLFNBQVMsSUFBSSxZQUFZLEVBQUUsQ0FBQzt3QkFDbkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7b0JBQ3BELENBQUM7eUJBQU0sQ0FBQzt3QkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztvQkFDL0MsQ0FBQztnQkFDTCxDQUFDO3FCQUFNLENBQUM7b0JBQ0osS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztZQUNMLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztZQUMxRCxDQUFDO1FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9