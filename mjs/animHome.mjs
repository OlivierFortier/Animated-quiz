import { Util } from "./util.mjs";
import { afficheQuestion } from "./app.mjs";

export class AnimHome {
  constructor(boules, demarrerQuiz) {
    //le nombre de boules qu'on veut avoir dans le background (jusqu'à 20)
    this.boules = boules;
    //référence à la fonction pour démarrer le quiz
    this.demarrerQuiz = afficheQuestion;
  }

  //méthode pour creer le background animé
  creerBackground() {
    //faire une référence au body pour ajouter l'écran d'accueil
    const body = document.querySelector("body");

    //créer l'élément conteneur du background
    const bgDiv = document.createElement("div");
    //ajouter la classe css qui permet les animations
    bgDiv.classList.add("background");
    //ajouter un écouteur d'événement pour commencer le quiz
    bgDiv.addEventListener("click", this.détruireBackground);

    //créer les éléments animés à l'intérieur du background
    for (let n = 0; n < this.boules; n++) {
      let rondSpan = document.createElement("span");
      bgDiv.appendChild(rondSpan);
    }

    //creer le titre qui est animé par css
    const titre = "Quiz  Animé";
    let position = 0;

    const elmH1 = document.createElement("h1");
    elmH1.id = "titre";

    //on insère le titre dans le background
    bgDiv.insertBefore(elmH1, bgDiv.firstChild);

    //tant qu'on a pas atteint la fin du titre, on exécute le code ci-dessous
    while (position < titre.length) {
      // creation de élément DIV qui contiendra un caractère du titre
      let char = document.createElement("div");

      // on ajoute une couleur aléatoire au caractère
      char.style.color = Util.genereCouleurAleatoire();

      // on configure l'animation pour les caractères avec certaines variables aléatoires
      char.classList.add("animLettres");

      char.style.animationDelay = `${Util.AleatoireMinMax(0, 2000)}ms`;

      char.style.animationDuration = `${Util.AleatoireMinMax(0, 2000)}ms`;

      char.addEventListener("animationend", () => {
        char.style.opacity = 1;
      });

      // on récupère un caractère du titre situé à la position courante
      char.innerText = titre[position];

      // l'élément caractère est jouté dans le h1
      elmH1.appendChild(char);

      // on incrémente la position pour passer à au caractère suivant
      position++;
    }
    //on ajoute au body le background animé d'intro
    body.insertBefore(bgDiv, body.firstChild);
  }

  //méthode pour faire afficher les instructions du jeu
  creerInstructions() {
    //creer une référence à l'élément du background
    const animIntro = document.querySelector(".background");
    //creer un élément h3 dans lequel on insère le message d'intro
    const elmMessage = document.createElement("h3");
    //creer une référence au premier élément span dans le background
    const elmSpan = document.querySelector(".background > span");
    //ajouter au message d'intro, la classe qui contient ses styles.
    elmMessage.classList.add("message-intro");
    //creer le texte du message d'intro
    const messageIntro =
      "Bonjour ! Ce quiz porte sur les différentes technologies du web! Les questions peuvent avoir une seule ainsi que plusieurs réponses possibles. Pour commencer, cliquez n'importe où sur la page!";
    //affecter le texte a l'élément
    elmMessage.innerText = messageIntro;

    //ajouter l'animation au message d'intro
    elmMessage.classList.add("anim-messageIntro");
    elmMessage.addEventListener("animationend", () => {
      elmMessage.style.opacity = "1";
    });

    //ajouter dans le html le message d'intro
    animIntro.insertBefore(elmMessage, elmSpan);
  }

  //méthode pour détruire le fond quand on clique et commencer le quiz
  détruireBackground() {
    //creer des références aux éléments nécéssaires pour supprimer les éléments du background
    const body = document.querySelector("body");
    let bgDiv = document.querySelector(".background");
    //enlever le background du body
    body.removeChild(bgDiv);

    //appeler la fonction qui démarre le quiz
    afficheQuestion();
  }
}
