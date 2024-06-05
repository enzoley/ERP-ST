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
const contactForm = document.getElementById('contactForm');
const inputMessage = document.getElementById('inputMessage');
const contactButton = document.getElementById('contactButton');
contactButton.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const message = inputMessage.value;
    const reponseCompte = yield fetch('https://entreprises.startechnormandy.com/check-login');
    const compteRes = yield reponseCompte.json();
    if (!compteRes.loggedIn) {
        window.location.href = 'index.html';
        return;
    }
    const email = compteRes.user.email;
    try {
        const response = yield fetch('https://entreprises.startechnormandy.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, message: message })
        });
        const data = yield response.json();
        if (response.ok) {
            alert('Message envoyé');
            window.location.reload();
        }
        else {
            alert(data.message);
        }
    }
    catch (error) {
        console.error('Erreur :', error);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250YWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBb0IsQ0FBQztBQUM5RSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBcUIsQ0FBQztBQUNqRixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBc0IsQ0FBQztBQUVwRixhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQU8sS0FBSyxFQUFFLEVBQUU7SUFDcEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDbkMsTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUMxRixNQUFNLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUNwQyxPQUFPO0lBQ1gsQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25DLElBQUksQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtEQUFrRCxFQUFFO1lBQzdFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7YUFDckM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQzNELENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QixDQUFDO2FBQU0sQ0FBQztZQUNKLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==