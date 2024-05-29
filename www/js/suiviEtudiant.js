"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const suiviDiv = document.getElementById('suivi');
function month(mois) {
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
function loadSuivi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('http://manclaus.alwaysdata.net/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const email = compteRes.user.email;
            const nameResponse = yield fetch('http://manclaus.alwaysdata.net/get-user-nomprenom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = yield nameResponse.json();
            const { nom, prenom } = data;
            const name = `${nom}${prenom}`;
            const response = yield fetch('http://manclaus.alwaysdata.net/suivi-etu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });
            const suivi = yield response.json();
            suivi.forEach((suivi) => {
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
                const fileInput = suiviCard.querySelector('.file-input');
                suiviDiv.appendChild(suiviCard);
                fetch(`/files?mois=${moisInt}&annee=${suivi.annee}&nom=${name}`)
                    .then(response => response.json())
                    .then(data => {
                    const fileInfo = suiviCard.querySelector('.file-info');
                    if (data) {
                        const link = document.createElement('a');
                        link.textContent = data.filename;
                        link.href = `data:${data.mimeType};base64,${data.fileData}`;
                        link.download = data.filename;
                        link.classList.add('file-link');
                        fileInfo.appendChild(link);
                    }
                    else {
                        fileInfo.textContent = 'No file available.';
                    }
                })
                    .catch(error => console.error('Error fetching file:', error));
                fileInput.addEventListener('change', (event) => handleFileSelect(event, moisInt, suivi.annee));
            });
        }
        catch (error) {
            console.error('Erreur lors du chargement du suivi :', error);
        }
    });
}
function uploadFile(file, mois, annee) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponseCompte = yield fetch('http://manclaus.alwaysdata.net/check-login');
        const compteRes = yield reponseCompte.json();
        if (!compteRes.loggedIn) {
            window.location.href = 'index.html';
            return;
        }
        const email = compteRes.user.email;
        const nameResponse = yield fetch('http://manclaus.alwaysdata.net/get-user-nomprenom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = yield nameResponse.json();
        const { nom, prenom } = data;
        const name = `${nom}${prenom}`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('mois', mois.toString());
        formData.append('annee', annee);
        try {
            const response = yield fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            const data = yield response.json();
            console.log('File uploaded successfully:', data);
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    });
}
function handleFileSelect(event, mois, annee) {
    const fileInput = event.target;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
        const fileInfo = fileInput.nextElementSibling;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdmlFdHVkaWFudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdWl2aUV0dWRpYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBbUIsQ0FBQztBQUVwRSxTQUFTLEtBQUssQ0FBQyxJQUFZO0lBQ3ZCLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDWCxLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLE9BQU8sQ0FBQztRQUNuQixLQUFLLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLENBQUM7WUFDRixPQUFPLFdBQVcsQ0FBQztRQUN2QixLQUFLLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNyQixLQUFLLEVBQUU7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QixLQUFLLEVBQUU7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QjtZQUNJLE9BQU8sY0FBYyxDQUFDO0lBQzlCLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBZSxTQUFTOztRQUNwQixJQUFJLENBQUM7WUFDRCxNQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ2hGLE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0s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