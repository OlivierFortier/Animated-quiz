export class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  //méthode pour retourner l'index de la question actuelle
  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  //méthode pour valider la bonne réponse
  choixRep(laReponse) {
    if (this.getQuestionIndex().bonneRep(laReponse)) {
      this.score++;
      const son = new Audio('./audio/sonGagner.wav');
      son.volume = 0.50;
      son.play();
    }
    else {
      const son = new Audio('./audio/sonPerdre.mp3');
      son.volume = 0.50;
      son.play();
    }
    this.questionIndex++;
  }

  //méthode pour vérifier si on est a la fin du quiz
  finQuiz() {
    return this.questionIndex === this.questions.length;
  }
}
