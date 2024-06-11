const selectEtu = document.getElementById('selectEtu');

function month5(mois) {
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

document.getElementById('generateButton').addEventListener('click', async () => {
    try {
        const name = selectEtu.options[selectEtu.selectedIndex].text.split(' ').join('');
        const response = await fetch('https://entreprises.startechnormandy.com/suivi-etu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        const suivi = await response.json();
        let l = [];

        suivi.forEach((element) => {
            let mois = month5(parseInt(element.mois));
            l.push({
                mois: mois,
                annee: element.annee,
                taches: element.taches,
                commentaires: element.commentaires
            });
        });

        fetch('/generate-PDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(l)
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'Suivi.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error generating PDF:', error));
    } catch (error) {
        console.error('Error:', error);
    }
});