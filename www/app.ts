const connexionEmail = document.getElementById('inputEmail') as HTMLInputElement;
const connexionPassword = document.getElementById('inputPassword') as HTMLInputElement;
const connexionButton = document.getElementById('connexionButton') as HTMLButtonElement;
const connexionSituation = document.getElementById('inputSituation') as HTMLSelectElement;
const connexionForm = document.getElementById('connexionForm') as HTMLFormElement;

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

            if(situation == "etudiant") {
                window.location.href = "accueilEtudiant.html";
            }else if (situation == "pedagogique") {
                window.location.href = "accueilResponsablePedagogique.html";
            }else{
                window.location.href = "accueilEntreprise.html";
            }

            
        });
    }
});
