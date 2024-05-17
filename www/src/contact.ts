const contactForm = document.getElementById('contactForm');

document.addEventListener('DOMContentLoaded', () => {
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            alert('Message envoyé');
        });
    }
});