const addEnt = document.getElementById('addEnt') as HTMLFormElement;
const selectorEntPar = document.getElementById('selectorEntPar') as HTMLSelectElement;
const entParButton = document.getElementById('entParButton') as HTMLButtonElement;

async function loadOptionsEntPar() {
    try {
        const response = await fetch('http://manclaus.alwaysdata.net/ent-par');
        const entreprises = await response.json();
        if (entreprises.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Aucune entreprise disponible';
            selectorEntPar.appendChild(option);
            entParButton.disabled = true;
        } else {
            entreprises.forEach((ent: { id: string; nom: string }) => {
                const option = document.createElement('option');
                option.value = ent.id;
                option.textContent = ent.nom;
                selectorEntPar.appendChild(option);
            });
        }

    } catch (error) {
        console.error('Erreur lors du chargement des entreprises :', error);
    }
}

loadOptionsEntPar();

entParButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const idEnt = selectorEntPar.options[selectorEntPar.selectedIndex].value;
    try {
        const response = await fetch('http://manclaus.alwaysdata.net/add-ent-par', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idEnt: idEnt })
        });
        const data = await response.json();

        if (response.ok) {
            alert('Ajout réussi');
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erreur :', error);
    }
});