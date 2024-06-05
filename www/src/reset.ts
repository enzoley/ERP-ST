const reinitEmail = document.getElementById('inputEmail') as HTMLInputElement;
const reinitPassword = document.getElementById('inputPassword') as HTMLInputElement;
const reinitCode = document.getElementById('inputCode') as HTMLInputElement;
const reinitForm = document.getElementById('reinitForm') as HTMLFormElement;


document.addEventListener('DOMContentLoaded', () => {
    if (reinitForm) {
        console.log("test");
        reinitForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = reinitEmail.value;
            const password = reinitPassword.value;
            const code = reinitCode.value;

            try {
                const response = await fetch('https://entreprises.startechnormandy.com/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, code, password })
                });

                if (response.ok) {
                    alert('Changement de mot de passe réussi.');
                    window.location.href = 'index.html';
                } else {
                    alert('Une erreur est survenue lors du changement.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }
});
