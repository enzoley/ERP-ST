document.addEventListener('DOMContentLoaded', () => {
    fetch('/check-login')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                const path = window.location.pathname;
                const pageName = path.split('/').pop();
                if ((pageName == 'accueilEtudiant.html' || pageName == 'contactEtudiant.html' || pageName == 'rappelEtudiant.html' || pageName == 'suiviEtudiant.html' || pageName == 'visiteEtudiant.html') && data.user.situation == 'etudiant') {
                    console.log('Logged in as:', data.user);
                } else if ((pageName == 'accueilEntreprise.html' || pageName == 'contactEntreprise.html' || pageName == 'rappelEntreprise.html' || pageName == 'suiviEnteprise.html' || pageName == 'visiteEntreprise.html' || pageName == 'partenariat.html') && data.user.situation == 'entreprise') {
                    console.log('Logged in as:', data.user);
                } else if ((pageName == 'accueilResponsablePedagogique.html' || pageName == 'suiviResponsablePedagogique.html' || pageName == 'visiteResp.html') && data.user.situation == 'pedagogique') {
                    console.log('Logged in as:', data.user);
                } else {
                    console.log('Vous n\'êtes pas autorisé à accéder à cette page');
                    const situation = data.user.situation;
                    if (situation == "etudiant") {
                        window.location.href = "accueilEtudiant.html";
                    } else if (situation == "entreprise") {
                        window.location.href = "accueilEntreprise.html";

                    } else {
                        window.location.href = "accueilResponsablePedagogique.html";
                    }
                }
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