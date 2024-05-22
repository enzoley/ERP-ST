const partenariat = document.getElementById('partenariat') as HTMLFormElement;
const emailInput = document.getElementById('inputEmailPart') as HTMLInputElement;

document.addEventListener('DOMContentLoaded', () => {

    if (partenariat) {
        partenariat.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = emailInput.value;
            try {
                const response = await fetch('http://localhost:3000/partenariat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Partenariat ajouté');
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