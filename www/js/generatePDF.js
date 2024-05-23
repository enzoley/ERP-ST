
document.getElementById('generateButton').addEventListener('click', async () => {
    const div = document.getElementById('suivi').innerHTML
    try {
        const response = await fetch('http://localhost:3000/generate-PDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ div: div })
        }
        );
        const data = await response.json();
        if (response.ok) {
            alert('Génération du PDF réussie');
            window.location.href = 'suiviResponsablePedagogique.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }

});
