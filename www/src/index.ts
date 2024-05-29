const connexionEmail = document.getElementById('inputEmail') as HTMLInputElement;
const connexionPassword = document.getElementById('inputPassword') as HTMLInputElement;
const connexionButton = document.getElementById('connexionButton') as HTMLButtonElement;
const connexionSituation = document.getElementById('inputSituation') as HTMLSelectElement;
const connexionForm = document.getElementById('connexionForm') as HTMLFormElement;
const inscription = document.getElementById('inscriptionButton') as HTMLButtonElement;

inscription.addEventListener('click', () => {
    window.location.href = "resetPassword2.html";
});

document.addEventListener('DOMContentLoaded', () => {

    if (connexionForm) {
        connexionForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = connexionEmail.value;
            const password = connexionPassword.value;
            const situation = connexionSituation.value;
            try {
                const response = await fetch('http://manclaus.alwaysdata.net/login', {
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
                        window.location.href = "suiviEtudiant.html";
                    } else if (situation == "pedagogique") {
                        window.location.href = "suiviResponsablePedagogique.html";
                    } else if (situation == "entreprise") {
                        window.location.href = "suiviEntreprise.html";
                    } else {
                        window.location.href = "accueilAdmin.html";
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