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
            const response = yield fetch('https://entreprises.startechnormandy.com/etu');
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
            const response = yield fetch('https://entreprises.startechnormandy.com/resp');
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
            const response = yield fetch('https://entreprises.startechnormandy.com/ent');
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
        for (let i = currentYear; i < currentYear + 100; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = i.toString();
            debutYear.appendChild(option);
        }
        for (let i = currentYear; i < currentYear + 100; i++) {
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
                const response = yield fetch('https://entreprises.startechnormandy.com/create-suivi', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5TdWl2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZG1pblN1aXZpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBc0IsQ0FBQztBQUNoRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztBQUNsRixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBc0IsQ0FBQztBQUNoRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBb0IsQ0FBQztBQUM1RSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztBQUM5RSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztBQUM1RSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBc0IsQ0FBQztBQUMxRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBc0IsQ0FBQztBQUV4RSxTQUFlLFdBQVc7O1FBQ3RCLElBQUksQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDN0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWdELEVBQUUsRUFBRTtnQkFDbkUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN0QixNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxH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