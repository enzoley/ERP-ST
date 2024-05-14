document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom, prenom, email, message })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Il y a eu une erreur lors de l\'envoi de l\'email.');
    });
});