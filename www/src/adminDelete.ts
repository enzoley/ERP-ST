const deleteEmail = document.getElementById('inputDeleteEmail') as HTMLSelectElement;
const deleteForm = document.getElementById('delete') as HTMLFormElement;

async function loadOptionsDelete() {
    try {
        const response = await fetch('https://entreprises.startechnormandy.com/opt-delete');
        const emails = await response.json();
        if (emails.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Aucun email disponible';
            deleteEmail.appendChild(option);
        } else {
            emails.forEach((acc: { id: string; nom: string; prenom: string }) => {
                const option = document.createElement('option');
                option.value = acc.id;
                option.textContent = acc.nom + ' ' + acc.prenom;
                deleteEmail.appendChild(option);
            });
        }

    } catch (error) {
        console.error('Erreur lors du chargement des emails :', error);
    }

}

loadOptionsDelete();

document.addEventListener('DOMContentLoaded', () => {

    if (deleteForm) {
        deleteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = deleteEmail.value;
            try {
                const response = await fetch('https://entreprises.startechnormandy.com/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id })
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