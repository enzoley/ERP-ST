async function checkAuth() {
    try {
        const response = await fetch('http://localhost:3000/protected');
        if (response.status === 401) {
            window.location.href = 'index.html';
        } else if (response.ok) {
            document.getElementById('content').innerText = await response.text();
        } else {
            alert('An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

window.onload = checkAuth;

document.getElementById('logoutButton').addEventListener('click', async function (event) {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Une erreur est survenue lors de la déconnexion.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});