const partenariat = document.getElementById('partenariat') as HTMLFormElement;
const emailInput = document.getElementById('inputEmailPart') as HTMLInputElement;
const formDiv = document.getElementById('form') as HTMLDivElement;

document.addEventListener('DOMContentLoaded', async () => {
    const reponseCompte = await fetch('https://entreprises.startechnormandy.com/check-login');
    const compteRes = await reponseCompte.json();
    if (!compteRes.loggedIn) {
        window.location.href = 'index.html';
        return;
    }
    const email = compteRes.user.email;
    try {
        const response = await fetch('https://entreprises.startechnormandy.com/partenariat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        const { message } = data;
        if (response.ok) {
            if (message === 'impossible') {
                formDiv.innerHTML = ``
                const suiviCard = document.createElement('div');
                suiviCard.classList.add('card', 'mb-5');
                suiviCard.innerHTML = `
                <div class="card-body">
                    <p class="card-text">Formulaire déjà rempli</p>
                </div>
                
            `;
                formDiv.appendChild(suiviCard);
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});