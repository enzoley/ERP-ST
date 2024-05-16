const connexionEmail = document.getElementById('inputEmail') as HTMLInputElement;
const connexionPassword = document.getElementById('inputPassword') as HTMLInputElement;
const connexionButton = document.getElementById('connexionButton') as HTMLButtonElement;
const connexionSituation = document.getElementById('inputSituation') as HTMLSelectElement;
const connexionForm = document.getElementById('connexionForm') as HTMLFormElement;
const inscription = document.getElementById('inscriptionButton') as HTMLButtonElement;

inscription.addEventListener('click', () => {
    window.location.href = "resetPassword.html";
});

document.addEventListener('DOMContentLoaded', () => {

    if (connexionForm) {
        connexionForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = connexionEmail.value;
            const password = connexionPassword.value;
            const situation = connexionSituation.value;
            console.log(password);
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, situation })
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Connexion réussie');
                    if (situation == "etudiant") {
                        window.location.href = "accueilEtudiant.html";
                    } else if (situation == "pedagogique") {
                        window.location.href = "accueilResponsablePedagogique.html";
                    } else if (situation == "entreprise") {
                        window.location.href = "accueilEntreprise.html";
                    }
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erreur :', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }



        });
    }
});
