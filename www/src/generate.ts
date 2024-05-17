const genEmail = document.getElementById('inputEmail') as HTMLInputElement;
const genForm = document.getElementById('reinitForm') as HTMLFormElement;


document.addEventListener('DOMContentLoaded', () => {
    if (genForm) {
        console.log("test");
        genForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = genEmail.value;

            try {
                const response = await fetch('http://localhost:3000/code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    alert('Génération du code réussie.');
                    window.location.href = 'resetPassword.html';
                } else {
                    alert('Une erreur est survenue lors de la génération du code.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }
});