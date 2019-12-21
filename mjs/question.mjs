export class Question {
  constructor(texte, choix, reponse) {
    this.texte = texte;
    this.choix = choix;
    this.reponse = reponse;
  }

  //méthode pour le choix de la bonne réponse
  bonneRep(choix) {
    //retourne true si la réponse cliquée est contenue dans le tableau des choix, et false si c'est pas la bonne réponse
    if (this.reponse.indexOf(choix) !== -1) {
      return true;
    } else return false;
  }
}
