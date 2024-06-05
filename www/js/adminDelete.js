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
const deleteEmail = document.getElementById('inputDeleteEmail');
const deleteForm = document.getElementById('delete');
function loadOptionsDelete() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://entreprises.startechnormandy.com/opt-delete');
            const emails = yield response.json();
            if (emails.length === 0) {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'Aucun email disponible';
                deleteEmail.appendChild(option);
            }
            else {
                emails.forEach((acc) => {
                    const option = document.createElement('option');
                    option.value = acc.id;
                    option.textContent = acc.nom + ' ' + acc.prenom;
                    deleteEmail.appendChild(option);
                });
            }
        }
        catch (error) {
            console.error('Erreur lors du chargement des emails :', error);
        }
    });
}
loadOptionsDelete();
document.addEventListener('DOMContentLoaded', () => {
    if (deleteForm) {
        deleteForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const id = deleteEmail.value;
            try {
                const response = yield fetch('https://entreprises.startechnormandy.com/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id })
                });
                const data = yield response.json();
                if (response.ok) {
                    alert('Suppression réussie');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5EZWxldGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW5EZWxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQXNCLENBQUM7QUFDckYsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQW9CLENBQUM7QUFFeEUsU0FBZSxpQkFBaUI7O1FBQzVCLElBQUksQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDcEYsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN0QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQztnQkFDOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWdELEVBQUUsRUFBRTtvQkFDaEUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUN0QixNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7b0JBQ2hELFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUVMLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRSxDQUFDO0lBRUwsQ0FBQztDQUFBO0FBRUQsaUJBQWlCLEVBQUUsQ0FBQztBQUVwQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBRS9DLElBQUksVUFBVSxFQUFFLENBQUM7UUFDYixVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDbEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDO2dCQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGlEQUFpRCxFQUFFO29CQUM1RSxNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUU7d0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtxQkFDckM7b0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDL0IsQ0FBQyxDQUFDO2dCQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVuQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDZCxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQztxQkFBTSxDQUFDO29CQUNKLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7WUFDTCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDakMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==