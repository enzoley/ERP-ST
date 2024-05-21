const etuSelector = document.getElementById('selectorEtu') as HTMLSelectElement;
const respSelector = document.getElementById('selectorResp') as HTMLSelectElement;
const entSelector = document.getElementById('selectorEnt') as HTMLSelectElement;
const suiviForm = document.getElementById('createSuivi') as HTMLFormElement;

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch('http://localhost:3000/etu');
        const etudiants = await response.json();

        etudiants.forEach((etu: { id: string; nom: string; prenom: string }) => {
            const option = document.createElement('option');
            option.value = etu.id;
            option.textContent = etu.nom + ' ' + etu.prenom;
            etuSelector.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants :', error);
    }

    try {
        const response = await fetch('http://localhost:3000/resp');
        const responsables = await response.json();

        responsables.forEach((resp: { id: string; nom: string; prenom: string }) => {
            const option = document.createElement('option');
            option.value = resp.id;
            option.textContent = resp.nom + ' ' + resp.prenom;
            respSelector.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des responsables pédagogiques :', error);
    }

    try {
        const response = await fetch('http://localhost:3000/ent');
        const entreprises = await response.json();

        entreprises.forEach((ent: { id: string; nom: string }) => {
            const option = document.createElement('option');
            option.value = ent.id;
            option.textContent = ent.nom;
            entSelector.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des entreprises :', error);
    }
});