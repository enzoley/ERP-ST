const suiviDiv = document.getElementById('suivi') as HTMLDivElement;

function month(mois: number) {
    switch (mois) {
        case 0:
            return 'Janvier';
        case 1:
            return 'Février';
        case 2:
            return 'Mars';
        case 3:
            return 'Avril';
        case 4:
            return 'Mai';
        case 5:
            return 'Juin';
        case 6:
            return 'Juillet';
        case 7:
            return 'Août';
        case 8:
            return 'Septembre';
        case 9:
            return 'Octobre';
        case 10:
            return 'Novembre';
        case 11:
            return 'Décembre';
        default:
            return 'Mois inconnu';
    }
}

async function loadSuivi() {
    try {
        const reponseCompte = await fetch('http://localhost:3000/check-login');
        const compteRes = await reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const email = compteRes.user.email;
        const nameResponse = await fetch('http://localhost:3000/get-user-nomprenom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await nameResponse.json();
        const { nom, prenom } = data;
        const name = `${nom}${prenom}`;
        const response = await fetch('http://localhost:3000/suivi-etu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        const suivi = await response.json();
        suivi.forEach((suivi: { id: string; mois: string; annee: string; taches: string; commentaires: string; idEtu: string, idResp: string, idEnt: string }) => {
            const moisInt = parseInt(suivi.mois);
            const monthName = month(moisInt);
            const suiviCard = document.createElement('div');
            suiviCard.classList.add('card', 'mb-5');
            suiviCard.innerHTML = `
        <div class="card-header">
            ${monthName} ${suivi.annee}
        </div>
        <div class="card-body">
            <p class="card-title"><b>Tâches : </b></p>
            <p class="card-text">${suivi.taches}</p>
            <p class="card-title"><b>Commentaires : </b></p>
            <p class="card-text">${suivi.commentaires}</p>
            <p class="card-title"><b>Joindre un fichier : </b></p>
            <input type="file" class="file-input">
            <div class="file-info"></div>
        </div>
    `;
            const fileInput = suiviCard.querySelector('.file-input') as HTMLInputElement;
            suiviDiv.appendChild(suiviCard);
            fetch(`/files?mois=${moisInt}&annee=${suivi.annee}&nom=${name}`)
                .then(response => response.json())
                .then(data => {
                    const fileInfo = suiviCard.querySelector('.file-info') as HTMLDivElement;
                    if (data) {
                        const link = document.createElement('a');
                        link.textContent = data.filename;
                        link.href = `data:${data.mimeType};base64,${data.fileData}`;
                        link.download = data.filename;
                        link.classList.add('file-link');
                        fileInfo.appendChild(link);
                    } else {
                        fileInfo.textContent = 'No file available.';
                    }
                })
                .catch(error => console.error('Error fetching file:', error));
            fileInput.addEventListener('change', (event) => handleFileSelect(event, moisInt, suivi.annee));
        });
    } catch (error) {
        console.error('Erreur lors du chargement du suivi :', error);
    }
}

async function uploadFile(file: File, mois: number, annee: string): Promise<void> {
    const reponseCompte = await fetch('http://localhost:3000/check-login');
    const compteRes = await reponseCompte.json();
    if (!compteRes.loggedIn) {
        window.location.href = 'index.html';
        return;
    }
    const email = compteRes.user.email;
    const nameResponse = await fetch('http://localhost:3000/get-user-nomprenom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });
    const data = await nameResponse.json();
    const { nom, prenom } = data;
    const name = `${nom}${prenom}`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('mois', mois.toString());
    formData.append('annee', annee);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }

        const data = await response.json();
        console.log('File uploaded successfully:', data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

function handleFileSelect(event: Event, mois: number, annee: string): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
        const fileInfo = fileInput.nextElementSibling as HTMLDivElement;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.textContent = file.name;
        link.classList.add('file-link');

        fileInfo.innerHTML = '';
        fileInfo.appendChild(link);
    }

    if (fileInput.files && fileInput.files[0]) {
        uploadFile(fileInput.files[0], mois, annee);
    }
}

loadSuivi();