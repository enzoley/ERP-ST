"use strict";
const connexionEmail = document.getElementById('inputEmail');
const connexionPassword = document.getElementById('inputPassword');
const connexionButton = document.getElementById('connexionButton');
const connexionSituation = document.getElementById('inputSituation');
const connexionForm = document.getElementById('connexionForm');
const rappels = document.getElementById('rappels');
const rappelsEtu = document.getElementById('rappelsEtu');
const rappelsEnt = document.getElementById('rappelsEnt');
const contentRapEtu = `"<div class="container mt-5">
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">Les alternants disposent du statut de salarié à part entière et bénéficient de l'ensemble
                des dispositions législatives, réglementaires ou conventionnelles applicables aux salariés de l'entreprise. Le temps
                consacré aux actions de formation est compris dans l'horaire de travail.
            </div>
        </div>
    </div>
</div>
</div>
<div class="container mt-5">
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header"><b>DROITS</b></div>
            <div class="card-body">L'alternant a droit aux congés payés légaux soit 5 semaines de congés payés par an.
                L'employeur a le droit de décider de la période à laquelle l'alternant peut prendre ses congés. <br>
                Une alternante peut bénéficier d'un congé maternité selon les règles en vigueur. <br>
                Un alternant peut aussi bénéficier d'un congé parternité.
            </div>
        </div>
    </div>
</div>
</div>
<div class="container mt-5">
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header"><b>DANS LE CADRE DU CONTRAT D'APPRENTISSAGE</b></div>
            <div class="card-body">Pour la préparation de ses épreuves, l'apprenti a droit à un congé supplémentaire de 5 
                jours ouvrables dans le mois qui les précède. Pour les apprentis de l'enseignement supérieur, il est fractionné pour s'adapter
                au contrôle continu. Ces jours s'ajoutent aux congés payés et sont rémunérés.
            </div>
        </div>
    </div>
</div>
</div>
<div class="container mt-5">
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header"><b>L'ALTERNANT BÉNÉFICIE DES MÊMES DROITS QUE LES SALARIÉS DE L'ENTREPRISE</b></div>
            <div class="card-body">
                Il est soumis à la visite médicale d'embauche obligatoire au plus tard 2 mois qui suivent l'embauche. <br>
                Il participe aux élections professionnelles de l'entreprise, s'il remplit les conditions d'électorat et d'éligibilité. <br>
                Si l'alternant poursuit son activité dans l'entreprise à l'issue de son contrat d'apprentissage en signant un contrat 
                de travail (CDI, CDD ou contrat de travail temporaire), son ancienneté est reconue :
                <ul>
                    <li>La période d'essai ne peut être imposée (sauf disposition conventionnelle contraire)</li>
                    <li>La durée de l'apprentissage est prise en compte pour le calcul de la rémunération</li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
<div class="container mt-5">
<div class="row">
    <div class="col-12">
        <h1 class="text-center">Devoirs</h1>
    </div>
</div>
</div>
<div class="container mt-5">
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header"><b>CODE DU TRAVAIL ET RÈGLEMENTS INTÉRIEURS</b></div>
            <div class="card-body">L'alternant doit se conformer aux Règlements intérieursde l'école et de l'entreprise sous preine d'être sanctionné
                sous forme d'avertissements formels, d'exclusion temporaire ou, en cas de manquement grave ou d'absences injustifiées, d'exclusion
                défintive avec licenciement. <br>
                Le salarié doit réaliser les missions et activités précisées sur la fiche de poste validée au début du contrat. En lien permanent 
                avec son école et son tuteur, il communique avec eux sur les difficultés en formation (niveau des cours, suivi, etc.) et en entreprise
                (adéquation des tâches effctuées avec les missions et la fiche de poste, etc.), ce afin d'anticiper tout bloquage et d'optimiser
                la réussite de l'alternance.
            </div>
        </div>
    </div>
</div>
</div>
<div class="container mt-5">
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header"><b>OBLIGATION DE PRÉSENCE EN FORMATION</b></div>
            <div class="card-body">
                La formation s'organise en alternance selon un rythme qui lui est propre. Le calendrier de formation fixant les jours de présence
                en formation à l'école est communiqué par le centre de formation avant toute signature du contrat et doit être respecté durant tout
                le cursus par l'ensemble des parties. <br>
                Le temps passé par l'alternant à suivre les enseignements et activités pédagogiques dispensés par l'organisme de formation ainsi que 
                les temps dédiés aux épreuves, examens, soutenances et tutorat font partie intégrante de son temps de travail. A ce titre, l'entreprise
                a un droit de regard sur l'assiduité de son salarié en centre de formation. Un relevé d'absences est transmis à l'employeur.
            </div>
        </div>
    </div>
</div>
</div>
<div class="container mt-5">
<div class="mb-5">
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header"><b>ABSENCES EN FORMATION</b></div>
            <div class="card-body">
                En cas d'absence en formation, l'alternant prévient immédiatement son employeur et justifie de cette absence par un arrêt de travail;
                il transmet le CERFA original à son employeur et une copie à l'école. En cas d'absence injustifiée, le centre de formation prévient 
                l'employeur qui peut en conséquence décompter des jours de congé, réaliser une retenue sur salaire, émettre une autre sanction (avertissement
                blâme) voir en cas d'absences successives et non justifiées, rompre le contrat de travail pour faute lourde. <br>
                L'alternant ne peut être en entreprise sur des temps dédiés en formation, sauf accord exceptionnel du responsable de la formation
                et sur demande écrite et motivée de l'entreprise (et dans une limite de 2 jours par an). En cas d'absence d'un enseignant, et sauf
                indication du service pédagogique, l'alternant est tenu de rester sur le lieu de formation pour se consacrer à du travail personnel
                et/ou de groupe (en bibliothèque, salle de classe)
            </div>
        </div>
    </div>
</div>
</div>
</div>"`;
const rapEnt = "test";
rappelsEtu.addEventListener('click', () => {
    rappels.innerHTML = contentRapEtu;
});
rappelsEnt.onclick = function () {
    rappels.innerHTML = rapEnt;
};
document.addEventListener('DOMContentLoaded', () => {
    if (connexionForm) {
        connexionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = connexionEmail.value;
            const password = connexionPassword.value;
            const situation = connexionSituation.value;
            if (email && password && situation) {
                alert("Connexion réussie !");
            }
            if (situation == "etudiant") {
                window.location.href = "accueilEtudiant.html";
            }
            else if (situation == "pedagogique") {
                window.location.href = "accueilResponsablePedagogique.html";
            }
            else {
                window.location.href = "accueilEntreprise.html";
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBcUIsQ0FBQztBQUNqRixNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFxQixDQUFDO0FBQ3ZGLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXNCLENBQUM7QUFDeEYsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFzQixDQUFDO0FBQzFGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFvQixDQUFDO0FBQ2xGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFtQixDQUFDO0FBQ3JFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFzQixDQUFDO0FBQzlFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFzQixDQUFDO0FBRzlFLE1BQU0sYUFBYSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXVIZCxDQUFBO0FBRVIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBRXRCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLE9BQU8sR0FBRztJQUNqQixPQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUUvQixDQUFDLENBQUE7QUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBRS9DLElBQUksYUFBYSxFQUFFLENBQUM7UUFDaEIsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQy9DLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV2QixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQztZQUN6QyxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7WUFFM0MsSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNqQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBRUQsSUFBRyxTQUFTLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO1lBQ2xELENBQUM7aUJBQUssSUFBSSxTQUFTLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLG9DQUFvQyxDQUFDO1lBQ2hFLENBQUM7aUJBQUksQ0FBQztnQkFDRixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQztZQUNwRCxDQUFDO1FBR0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==