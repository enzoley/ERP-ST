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
const addEnt = document.getElementById('addEnt');
const selectorEntPar = document.getElementById('selectorEntPar');
const entParButton = document.getElementById('entParButton');
function loadOptionsEntPar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://manclaus.alwaysdata.net/ent-par');
            const entreprises = yield response.json();
            if (entreprises.length === 0) {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'Aucune entreprise disponible';
                selectorEntPar.appendChild(option);
                entParButton.disabled = true;
            }
            else {
                entreprises.forEach((ent) => {
                    const option = document.createElement('option');
                    option.value = ent.id;
                    option.textContent = ent.nom;
                    selectorEntPar.appendChild(option);
                });
            }
        }
        catch (error) {
            console.error('Erreur lors du chargement des entreprises :', error);
        }
    });
}
loadOptionsEntPar();
entParButton.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const idEnt = selectorEntPar.options[selectorEntPar.selectedIndex].value;
    try {
        const response = yield fetch('http://manclaus.alwaysdata.net/add-ent-par', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idEnt: idEnt })
        });
        const data = yield response.json();
        if (response.ok) {
            alert('Ajout réussi');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5QYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW5QYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFvQixDQUFDO0FBQ3BFLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXNCLENBQUM7QUFDdEYsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7QUFFbEYsU0FBZSxpQkFBaUI7O1FBQzVCLElBQUksQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUMsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUMzQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLFdBQVcsR0FBRyw4QkFBOEIsQ0FBQztnQkFDcEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDakMsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFnQyxFQUFFLEVBQUU7b0JBQ3JELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2hELE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDdEIsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO29CQUM3QixjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFFTCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQUVELGlCQUFpQixFQUFFLENBQUM7QUFFcEIsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO0lBQ25ELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDekUsSUFBSSxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsNENBQTRDLEVBQUU7WUFDdkUsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjthQUNyQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsQ0FBQzthQUFNLENBQUM7WUFDSixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=