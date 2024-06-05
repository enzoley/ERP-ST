const contactForm = document.getElementById('contactForm') as HTMLFormElement;
const inputMessage = document.getElementById('inputMessage') as HTMLInputElement;
const contactButton = document.getElementById('contactButton') as HTMLButtonElement;

contactButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const message = inputMessage.value;
    const reponseCompte = await fetch('https://entreprises.startechnormandy.com/check-login');
    const compteRes = await reponseCompte.json();
    if (!compteRes.loggedIn) {
        window.location.href = 'index.html';
        return;
    }
    const email = compteRes.user.email;
    try {
        const response = await fetch('https://entreprises.startechnormandy.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, message: message })
        });
        const data = await response.json();

        if (response.ok) {
            alert('Message envoyé');
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erreur :', error);
    }
});