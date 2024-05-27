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
const visiteEtuDiv = document.getElementById('visite');
function m(mois) {
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
function loadVisite() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reponseCompte = yield fetch('http://localhost:3000/check-login');
            const compteRes = yield reponseCompte.json();
            if (!compteRes.loggedIn) {
                window.location.href = 'index.html';
                return;
            }
            const id = compteRes.user.id;
            const response = yield fetch('http://localhost:3000/visite-etu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            const visite = yield response.json();
            visiteEtuDiv.innerHTML = '';
            visite.sort((a, b) => {
                const dateA = new Date(a.annee, parseInt(a.mois) + 1, a.jour).getTime();
                const dateB = new Date(b.annee, parseInt(b.mois) + 1, b.jour).getTime();
                return dateA - dateB;
            });
            for (const vis of visite) {
                const mois = m(parseInt(vis.mois));
                const jour = vis.jour;
                const annee = vis.annee;
                const reponseResp = yield fetch('http://localhost:3000/get-user-nomprenomID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: vis.idResp })
                });
                const dataResp = yield reponseResp.json();
                const resp = `${dataResp.nom} ${dataResp.prenom}`;
                const div = document.createElement('div');
                div.className = 'card mb-5';
                div.innerHTML = `
                <p>
                    <b>Date : </b>${jour} ${mois} ${annee} <br>
                    <b>Responsable : </b>${resp} <br>
                </p>
            `;
                visiteEtuDiv.appendChild(div);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
loadVisite();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRlRXR1ZGlhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmlzaXRlRXR1ZGlhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFtQixDQUFDO0FBRXpFLFNBQVMsQ0FBQyxDQUFDLElBQVk7SUFDbkIsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNYLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLEtBQUssQ0FBQztZQUNGLE9BQU8sT0FBTyxDQUFDO1FBQ25CLEtBQUssQ0FBQztZQUNGLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLEtBQUssQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLEtBQUssQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLEtBQUssRUFBRTtZQUNILE9BQU8sVUFBVSxDQUFDO1FBQ3RCLEtBQUssRUFBRTtZQUNILE9BQU8sVUFBVSxDQUFDO1FBQ3RCO1lBQ0ksT0FBTyxjQUFjLENBQUM7SUFDOUIsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFlLFVBQVU7O1FBQ3JCLElBQUksQ0FBQztZQUNELE1BQU0sYUFBYSxHQUFHLE1BQU0sS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDdkUsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxPQUFPO1lBQ1gsQ0FBQztZQUNELE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGtDQUFrQyxFQUFFO2dCQUM3RCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDbkMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckMsWUFBWSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQTZELEVBQUUsQ0FBNkQsRUFBRSxFQUFFO2dCQUN6SSxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDeEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRXhFLE9BQU8sS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNILEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUFDLDRDQUE0QyxFQUFFO29CQUMxRSxNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUU7d0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtxQkFDckM7b0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUMzQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO2dCQUM1QixHQUFHLENBQUMsU0FBUyxHQUFHOztvQ0FFUSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUs7MkNBQ2QsSUFBSTs7YUFFbEMsQ0FBQztnQkFDRixZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQUVELFVBQVUsRUFBRSxDQUFDIn0=