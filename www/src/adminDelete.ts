const deleteEmail = document.getElementById('inputDeleteEmail') as HTMLInputElement;
const deleteForm = document.getElementById('delete') as HTMLFormElement;

document.addEventListener('DOMContentLoaded', () => {

    if (deleteForm) {
        deleteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = deleteEmail.value;
            try {
                const response = await fetch('http://localhost:3000/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Suppression réussie');
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