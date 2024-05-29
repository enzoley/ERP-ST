const etuSelectorDel = document.getElementById('selectorEtuDel') as HTMLSelectElement;
const deleteSuivi = document.getElementById('deleteSuivi') as HTMLFormElement;

async function loadOptions2() {
    try {
        const response = await fetch('http://manclaus.alwaysdata.net/etu');
        const etudiants = await response.json();
        etudiants.forEach((etu: { id: string; nom: string; prenom: string }) => {
            const option = document.createElement('option');
            option.value = etu.id;
            option.textContent = etu.nom + ' ' + etu.prenom;
            etuSelectorDel.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }
}

loadOptions2();

document.addEventListener('DOMContentLoaded', () => {

    if (deleteSuivi) {
        deleteSuivi.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nameEtu = etuSelectorDel.options[etuSelectorDel.selectedIndex].text.split(' ').join('');
            try {
                const response = await fetch('http://manclaus.alwaysdata.net/delete-suivi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nomEtu: nameEtu })
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