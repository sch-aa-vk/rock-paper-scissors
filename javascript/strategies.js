import { BBTGameFactory, ClassicGameFactory, WithWellGameFactory } from './factories.js';

// -- Strategies -- //
export class GameStrategy {
  determineWinner(playerFigure, opponentFigure) {}
}

export class ClassicGameStrategy extends GameStrategy {
  determineWinner(playerFigure, opponentFigure) {
    if (playerFigure === opponentFigure) {
      return "It's a tie!";
    } else if (
      (playerFigure === "Rock" && opponentFigure === "Scissors") ||
      (playerFigure === "Paper" && opponentFigure === "Rock") ||
      (playerFigure === "Scissors" && opponentFigure === "Paper")
    ) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }
}

export class BBTGameStrategy extends GameStrategy {
  determineWinner(playerFigure, opponentFigure) {
    if (playerFigure === opponentFigure) {
      return "It's a tie!";
    } else if (
      (playerFigure === "Rock" &&
        (opponentFigure === "Scissors" || opponentFigure === "Lizard")) ||
      (playerFigure === "Paper" &&
        (opponentFigure === "Rock" || opponentFigure === "Spock")) ||
      (playerFigure === "Scissors" &&
        (opponentFigure === "Paper" || opponentFigure === "Lizard")) ||
      (playerFigure === "Lizard" &&
        (opponentFigure === "Spock" || opponentFigure === "Paper")) ||
      (playerFigure === "Spock" &&
        (opponentFigure === "Scissors" || opponentFigure === "Rock"))
    ) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }
}

export class WithWellGameStrategy extends GameStrategy {
  determineWinner(playerFigure, opponentFigure) {
    if (playerFigure === opponentFigure) {
      return "It's a tie!";
    } else if (
      (playerFigure === "Rock" && opponentFigure === "Scissors") ||
      (playerFigure === "Paper" && opponentFigure === "Rock") ||
      (playerFigure === "Scissors" && opponentFigure === "Paper") ||
      (playerFigure === "Well" &&
        (opponentFigure === "Rock" || opponentFigure === "Scissors"))
    ) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }
}

export const GameTypes = {
  Classic: {
    factory: new ClassicGameFactory(),
    strategy: new ClassicGameStrategy(),
    size: 3,
  },
  BBT: {
    factory: new BBTGameFactory(),
    strategy: new BBTGameStrategy(),
    size: 6,
  },
  WithWell: {
    factory: new WithWellGameFactory(),
    strategy: new WithWellGameStrategy(),
    size: 4,
  },
}