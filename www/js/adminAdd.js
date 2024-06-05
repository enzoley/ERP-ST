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
const selectEtuAdmin = document.getElementById('selectorEtuAdd');
const selectRespAdmin = document.getElementById('selectorRespAdd');
const formAdd = document.getElementById('addResp');
function loadOptionsAdd() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://entreprises.startechnormandy.com/etu');
            const etudiants = yield response.json();
            etudiants.forEach((etu) => {
                const option = document.createElement('option');
                option.value = etu.id;
                option.textContent = etu.nom + ' ' + etu.prenom;
                selectEtuAdmin.appendChild(option);
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
                selectRespAdmin.appendChild(option);
            });
        }
        catch (error) {
            console.error('Erreur lors du chargement des responsables pédagogiques :', error);
        }
    });
}
loadOptionsAdd();
document.addEventListener('DOMContentLoaded', () => {
    if (formAdd) {
        formAdd.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const nameEtu = selectEtuAdmin.options[selectEtuAdmin.selectedIndex].text.split(' ').join('');
            const idResp = selectRespAdmin.options[selectRespAdmin.selectedIndex].value;
            const idEtu = selectEtuAdmin.options[selectEtuAdmin.selectedIndex].value;
            console.log(nameEtu, idResp, idEtu);
            try {
                const response = yield fetch('https://entreprises.startechnormandy.com/add-resp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nameEtu: nameEtu, idResp: idResp, idEtu: idEtu })
                });
                const data = yield response.json();
                if (response.ok) {
                    alert('Inscription réussie');
                    window.location.reload();
                }
                else {
                    alert(data.message);
                }
            }
            catch (error) {
                console.error('Erreur :', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        }));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5BZGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW5BZGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXNCLENBQUM7QUFDdEYsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBc0IsQ0FBQztBQUN4RixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBb0IsQ0FBQztBQUV0RSxTQUFlLGNBQWM7O1FBQ3pCLElBQUksQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDN0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWdELEVBQUUsRUFBRTtnQkFDbkUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN0QixNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hELGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVELElBQUksQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7WUFDOUUsTUFBTSxZQUFZLEdB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