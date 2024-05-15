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
document.addEventListener('DOMContentLoaded', () => {
    if (connexionForm) {
        connexionForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            try {
                const response = yield fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ connexionEmail, connexionPassword })
                });
                alert('test');
                const data = yield response.json();
                if (response.ok) {
                    const situation = connexionSituation.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFxQixDQUFDO0FBQ2pGLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFDdkYsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBc0IsQ0FBQztBQUN4RixNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXNCLENBQUM7QUFDMUYsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQW9CLENBQUM7QUFHbEYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUUvQyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBTyxLQUFLLEVBQUUsRUFBRTtZQUNyRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFdkIsSUFBSSxDQUFDO2dCQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLDZCQUE2QixFQUFFO29CQUN4RCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUU7d0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtxQkFDckM7b0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztpQkFDOUQsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDYixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFbkMsSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ2QsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDO29CQUMzQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxTQUFTLElBQUksVUFBVSxFQUFFLENBQUM7d0JBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO29CQUNsRCxDQUFDO3lCQUFNLElBQUksU0FBUyxJQUFJLGFBQWEsRUFBRSxDQUFDO3dCQUNwQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxvQ0FBb0MsQ0FBQztvQkFDaEUsQ0FBQzt5QkFBTSxJQUFJLFNBQVMsSUFBSSxZQUFZLEVBQUUsQ0FBQzt3QkFDbkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7b0JBQ3BELENBQUM7Z0JBQ0wsQ0FBQztxQkFBTSxDQUFDO29CQUNKLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7WUFDTCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDakMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUlMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==