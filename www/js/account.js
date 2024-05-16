document.addEventListener('DOMContentLoaded', () => {
    fetch('/check-login')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                const path = window.location.pathname;
                const pageName = path.split('/').pop();
                console.log('Logged in as:', data.user);
            } else {
                console.log('Not logged in');
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
});

document.getElementById('logoutButton').addEventListener('click', async function (event) {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            alert('Déconnexion réussie')
            window.location.href = 'index.html';
        } else {
            alert('Une erreur est survenue lors de la déconnexion.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});