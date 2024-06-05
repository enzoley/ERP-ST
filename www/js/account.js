function verifyAuth() {

    fetch('/check-login')
        .then(response => response.json())
        .then(async data => {
            if (data.loggedIn) {
                const path = window.location.pathname;
                const pageName = path.split('/').pop();
                if ((pageName == 'contactEtudiant.html' || pageName == 'rappelEtudiant.html' || pageName == 'suiviEtudiant.html' || pageName == 'visiteEtudiant.html') && data.user.situation == 'etudiant') {
                    console.log('Logged in as:', data.user);
                } else if ((pageName == 'contactEntreprise.html' || pageName == 'rappelEntreprise.html' || pageName == 'suiviEntreprise.html' || pageName == 'visitesEntreprise.html' || pageName == 'partenariat.html') && data.user.situation == 'entreprise') {
                    console.log('Logged in as:', data.user);
                } else if ((pageName == 'suiviResponsablePedagogique.html' || pageName == 'visiteResp.html') && data.user.situation == 'pedagogique') {
                    console.log('Logged in as:', data.user);
                } else if ((pageName == 'accueilAdmin.html' && data.user.situation == 'autre')) {
                    console.log('Logged in as:', data.user);
                } else if (pageName == 'index.html') {
                    try {
                        const response = await fetch('https://entreprises.startechnormandy.com/logout', {
                            method: 'POST',
                            credentials: 'include'
                        });

                        if (!response.ok) {
                            alert('Une erreur est survenue lors de la déconnexion.');
                        }
                    } catch (error) {
                        console.error('Erreur:', error);
                        alert('Une erreur est survenue. Veuillez réessayer.');
                    }
                } else {
                    console.log('Vous n\'êtes pas autorisé à accéder à cette page');
                    const situation = data.user.situation;
                    if (situation == "etudiant") {
                        window.location.href = "suiviEtudiant.html";
                    } else if (situation == "entreprise") {
                        window.location.href = "suiviEntreprise.html";
                    } else if (situation == "autre") {
                        window.location.href = "index.html";
                    } else {
                        window.location.href = "suiviResponsablePedagogique.html";
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

}

setInterval(verifyAuth, 100);

document.getElementById('logoutButton').addEventListener('click', async function (event) {
    event.preventDefault();

    try {
        const response = await fetch('https://entreprises.startechnormandy.com/logout', {
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