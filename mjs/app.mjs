import { Question } from "./question.mjs";
import { Quiz } from "./quiz.mjs";
import { lesQuestions } from "./banqueQuestion.mjs";
import { Util } from "./util.mjs";
import { AnimHome } from "./animHome.mjs";

function animAccueil() {
  //on instancie l'animation d'accueil, en spécifiant le nombre de boules (jusqu'à 20) et la fonction pour afficher les questions
  let intro = new AnimHome(20, afficheQuestion);
  intro.creerBackground();
  intro.creerInstructions();
}

//afficher la prochaine question ou la fin du jeu
export function afficheQuestion() {
  if (quiz.finQuiz()) {
    afficheScore();
  } else {
    // afficher question
    let element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().texte;
    if (element.classList.contains("expansion-lettres")) {
      element.classList.remove("expansion-lettres");
    }
    setTimeout(() => {
      element.classList.add("expansion-lettres");
    }, 0);
    document.querySelector("#quiz > h1").classList.add("titre-page");

    // afficher les choix de réponse
    let choix = quiz.getQuestionIndex().choix;
    for (let i = 0; i < choix.length; i++) {
      //créer les réponse dynamiquement
      let boutton = document.createElement("button");
      let span = document.createElement("span");
      boutton.id = `btn${i}`;
      span.id = `choice${i}`;
      span.innerHTML = choix[i];
      boutton.appendChild(span);
      document.querySelector(".buttons").appendChild(boutton);
      boutton.classList.add("choix");
      if (boutton.classList.contains("animBingbong")) {
        boutton.classList.remove("animBingbong");
      }
      setTimeout(() => {
        boutton.classList.add("animBingbong");
      }, Util.AleatoireMinMax(0, 1000));

      choixRep("btn" + i, choix[i]);
    }

    //actualiser le numéro de la question
    afficheProgres();
  }
}

//fonction pour faire le choix de réponse et ensuite -> valider si c'est la bonne réponse dans l'instance quiz
function choixRep(id, choixRep) {
  let bouton = document.getElementById(id);
  bouton.onclick = function() {
    quiz.choixRep(choixRep);
    Util.detruireQuestions();
    afficheQuestion();
  };
}

//faire afficher le progres ( numéro de la question) dans la page web
function afficheProgres() {
  let questionActuelle = quiz.questionIndex + 1;
  let element = document.getElementById("progress");
  element.innerHTML = `Question ${questionActuelle} de ${quiz.questions.length}`;
}

//faire afficher le score dans la page web (et sauvegarder le meilleur score)
function afficheScore() {
  //enregistrer le score si il est supérieur au 'meilleur score'
  let meilleurScore = JSON.parse(localStorage.getItem("meilleurScore"));
  if (quiz.score > meilleurScore) {
    localStorage.setItem("meilleurScore", quiz.score);
  }

  //faire le calcul du temps passé
  let tempsFin = new Date();
  let tempsEcoule = tempsFin - tempsDebut;
  tempsEcoule /= 1000;
  tempsEcoule = Math.round(tempsEcoule);

  //afficher les scores dans la pge web
  let finPartieHTML = `<h1 class='animFinScore'>Résultat</h1>`;
  finPartieHTML += `<h2 class='highScore animHighScore'>Votre meilleur score précédent : ${meilleurScore}</h2>`;
  finPartieHTML += `<h2 id='score' class='animScore'> Votre score : ${quiz.score}</h2>`;
  finPartieHTML += `<h2 id='temps' class='animTemps'>Temps écoulé : ${tempsEcoule} secondes</h2>`;
  finPartieHTML += `<button id='boutonFin' class='animBoutonFin'>Recommencer</button>`;
  let element = document.getElementById("quiz");
  element.innerHTML = finPartieHTML;

  //recommencer la partie quand on clique sur le bouton
  document.querySelector("#boutonFin").addEventListener("click", () => {
    location.reload();
  });
}

// instancier les questions (en utilisant le littéral d'objet importé en module)
// j'ajoute les questions instanciées dans un tableau pour pouvoir utiliser la méthode ordrealéatoire de ma classe Util pour changer l'ordre
let questions = new Array();

for (let num = 0; num < lesQuestions.listeQuestions.length; num++) {
  questions.push(
    new Question(
      lesQuestions.listeQuestions[num].titre,
      lesQuestions.listeQuestions[num].reponses,
      lesQuestions.listeQuestions[num].bonneReponse
    )
  );
}

//appeler la méthode statique de la classe Util qui permet de donner un ordre aléatoire aux questions
Util.ordreAleatoire(questions);

//rendre aléatoire l'ordre des réponses
questions.forEach(question => {
  Util.ordreAleatoire(question.choix);
});

// creer le quiz en instanciant la classe Quizz
let quiz = new Quiz(questions);

//initialiser le 'meilleur score' dans le localStorage
if (!localStorage.getItem("meilleurScore")) {
  localStorage.setItem("meilleurScore", "0");
}

//initialiser le compte à rebours
let tempsDebut = new Date();

// afficher le quiz/l'introduction
animAccueil();
