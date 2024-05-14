"use strict";
const connexionEmail = document.getElementById('inputEmail');
const connexionPassword = document.getElementById('inputPassword');
const connexionButton = document.getElementById('connexionButton');
const connexionSituation = document.getElementById('inputSituation');
const connexionForm = document.getElementById('connexionForm');
document.addEventListener('DOMContentLoaded', () => {
    if (connexionForm) {
        connexionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = connexionEmail.value;
            const password = connexionPassword.value;
            const situation = connexionSituation.value;
            if (email && password && situation) {
                alert("Connexion réussie !");
            }
            if (situation == "etudiant") {
                window.location.href = "accueilEtudiant.html";
            }
            else if (situation == "pedagogique") {
                window.location.href = "accueilResponsablePedagogique.html";
            }
            else {
                window.location.href = "accueilEntreprise.html";
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBcUIsQ0FBQztBQUNqRixNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFxQixDQUFDO0FBQ3ZGLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXNCLENBQUM7QUFDeEYsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFzQixDQUFDO0FBQzFGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFvQixDQUFDO0FBRWxGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFFL0MsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNoQixhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXZCLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUUzQyxJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ2pDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFFRCxJQUFHLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsc0JBQXNCLENBQUM7WUFDbEQsQ0FBQztpQkFBSyxJQUFJLFNBQVMsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsb0NBQW9DLENBQUM7WUFDaEUsQ0FBQztpQkFBSSxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1lBQ3BELENBQUM7UUFHTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9