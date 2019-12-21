//classe utilitaire

export class Util {
  //méthode statique pour changer aléatoirement l'ordre d'un tableau passé en paramètre
  static ordreAleatoire(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
    }
  }

  //méthode statique pour détruire les questions
  static detruireQuestions() {
    let listeQuestion = document.querySelectorAll(".choix");
    let conteneur = document.querySelector(".buttons");
    for (let question of listeQuestion) {
      conteneur.removeChild(question);
    }
  }

  //méthode statique pour générer des valeurs aléatoires
  static AleatoireMinMax(min, max) {
    let valMin = Math.min(min, max);
    let valMax = Math.max(min, max);
    return valMin + Math.floor(Math.random() * (valMax - valMin) + 1);
  }

  //méthode statique pour générer une chaine de caractères RGB a utiliser dans le css
  static genereCouleurAleatoire() {
    let rouge = this.AleatoireMinMax(0, 255);
    let vert = this.AleatoireMinMax(0, 255);
    let bleu = this.AleatoireMinMax(0, 255);

    return `rgb(${rouge}, ${vert}, ${bleu})`;
  }
}
