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
const reinitEmail = document.getElementById('inputEmail');
const reinitPassword = document.getElementById('inputPassword');
const reinitCode = document.getElementById('inputCode');
const reinitForm = document.getElementById('reinitForm');
document.addEventListener('DOMContentLoaded', () => {
    if (reinitForm) {
        console.log("test");
        reinitForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const email = reinitEmail.value;
            const password = reinitPassword.value;
            const code = reinitCode.value;
            try {
                const response = yield fetch('http://localhost:3000/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, code, password })
                });
                if (response.ok) {
                    alert('Changement de mot de passe réussi.');
                    window.location.href = 'index.html';
                }
                else {
                    alert('Une erreur est survenue lors du changement.');
                }
            }
            catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        }));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFxQixDQUFDO0FBQzlFLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFxQixDQUFDO0FBQ3BGLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFxQixDQUFDO0FBQzVFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFvQixDQUFDO0FBRzVFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDL0MsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO1lBQ2xELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2hDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUU5QixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsNkJBQTZCLEVBQUU7b0JBQ3hELE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRTt3QkFDTCxjQUFjLEVBQUUsa0JBQWtCO3FCQUNyQztvQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7aUJBQ2xELENBQUMsQ0FBQztnQkFFSCxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDZCxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUN4QyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0JBQ3pELENBQUM7WUFDTCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==