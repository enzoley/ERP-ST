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
const etuSelector = document.getElementById('selectorEtu');
const respSelector = document.getElementById('selectorResp');
const entSelector = document.getElementById('selectorEnt');
const suiviForm = document.getElementById('createSuivi');
const debutMonth = document.getElementById('startMonth');
const debutYear = document.getElementById('startYear');
const finMonth = document.getElementById('endMonth');
const finYear = document.getElementById('endYear');
function loadOptions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://manclaus.alwaysdata.net/etu');
            const etudiants = yield response.json();
            etudiants.forEach((etu) => {
                const option = document.createElement('option');
                option.value = etu.id;
                option.textContent = etu.nom + ' ' + etu.prenom;
                etuSelector.appendChild(option);
            });
        }
        catch (error) {
            console.error('Erreur lors du chargement des étudiants :', error);
        }
        try {
            const response = yield fetch('http://manclaus.alwaysdata.net/resp');
            const responsables = yield response.json();
            responsables.forEach((resp) => {
                const option = document.createElement('option');
                option.value = resp.id;
                option.textContent = resp.nom + ' ' + resp.prenom;
                respSelector.appendChild(option);
            });
        }
        catch (error) {
            console.error('Erreur lors du chargement des responsables pédagogiques :', error);
        }
        try {
            const response = yield fetch('http://manclaus.alwaysdata.net/ent');
            const entreprises = yield response.json();
            entreprises.forEach((ent) => {
                const option = document.createElement('option');
                option.value = ent.id;
                option.textContent = ent.nom;
                entSelector.appendChild(option);
            });
        }
        catch (error) {
            console.error('Erreur lors du chargement des entreprises :', error);
        }
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i < 2100; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = i.toString();
            debutYear.appendChild(option);
        }
        for (let i = currentYear; i < 2100; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = i.toString();
            finYear.appendChild(option);
        }
    });
}
loadOptions();
document.addEventListener('DOMContentLoaded', () => {
    if (suiviForm) {
        suiviForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const etudiant = etuSelector.value;
            const nameEtu = etuSelector.options[etuSelector.selectedIndex].text.split(' ').join('');
            const resp = respSelector.value;
            const ent = entSelector.value;
            const debutMonthValue = debutMonth.value;
            const debutYearValue = debutYear.value;
            const finMonthValue = finMonth.value;
            const finYearValue = finYear.value;
            try {
                const response = yield fetch('http://manclaus.alwaysdata.net/create-suivi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idEtu: etudiant, idResp: resp, idEnt: ent, dm: debutMonthValue, dy: debutYearValue, fm: finMonthValue, fy: finYearValue, nomEtu: nameEtu })
                });
                if (response.ok) {
                    alert('Suivi créé');
                    window.location.reload();
                }
                else {
                    const errorData = yield response.json();
                    console.error('Erreur :', errorData);
                    alert('Erreur lors de la création du suivi : ' + errorData.message);
                }
            }
            catch (error) {
                console.error('Erreur :', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        }));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5TdWl2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZG1pblN1aXZpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBc0IsQ0FBQztBQUNoRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztBQUNsRixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBc0IsQ0FBQztBQUNoRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBb0IsQ0FBQztBQUM1RSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztBQUM5RSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUM1RSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBc0IsQ0FBQztBQUMxRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBc0IsQ0FBQztBQUV4RSxTQUFlLFdBQVc7O1FBQ3RCLElBQUksQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDbkUsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWdELEVBQUUsRUFBRTtnQkFDbkUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN0QixNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxH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