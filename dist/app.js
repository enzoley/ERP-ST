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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQXFCLENBQUM7QUFDakYsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBcUIsQ0FBQztBQUN2RixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFzQixDQUFDO0FBQ3hGLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBc0IsQ0FBQztBQUMxRixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBb0IsQ0FBQztBQUVsRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBRS9DLElBQUksYUFBYSxFQUFFLENBQUM7UUFDaEIsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQy9DLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV2QixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQztZQUN6QyxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7WUFFM0MsSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNqQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBRUQsSUFBRyxTQUFTLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO1lBQ2xELENBQUM7aUJBQUssSUFBSSxTQUFTLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLG9DQUFvQyxDQUFDO1lBQ2hFLENBQUM7aUJBQUksQ0FBQztnQkFDRixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQztZQUNwRCxDQUFDO1FBR0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==