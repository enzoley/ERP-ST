const createEmail = document.getElementById('inputEmail') as HTMLInputElement;
const createNom = document.getElementById('inputNom') as HTMLInputElement;
const createPrenom = document.getElementById('inputPrenom') as HTMLInputElement;
const createSituation = document.getElementById('inputSituation') as HTMLSelectElement;
const createForm = document.getElementById('create') as HTMLFormElement;

document.addEventListener('DOMContentLoaded', () => {

    if (createForm) {
        createForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = createEmail.value;
            const nom = createNom.value;
            const prenom = createPrenom.value;
            const situation = createSituation.value;
            try {
                const response = await fetch('https://entreprises.startechnormandy.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, nom, prenom, situation })
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Inscription réussie');
                    window.location.reload();
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



