import { computerRandomChoice } from './helpers.js';

// -- Proxy -- //
export class GamePlay {
  constructor({ size, strategy }) {
    this.gameStrategy = strategy;
    this.size = size;
  }

  play(selectedCard) {
    const playerFigure = selectedCard;
    const { name: opponentFigureName, class: opponentFigureClass } = computerRandomChoice(this.size);
    const result = this.gameStrategy.determineWinner( playerFigure, opponentFigureName);

    const computerCard = document.getElementById("computerCard");
    const computerCardImage = document.createElement("img");
    computerCardImage.src = opponentFigureClass.getImage();
    computerCardImage.alt = opponentFigureClass.getName();
    computerCard.appendChild(computerCardImage);

    const gamePanel = document.getElementById("gamePanel");
    const winnerText = document.createElement("p");
    winnerText.id = "winnerText";
    winnerText.innerHTML = result;
    gamePanel.appendChild(winnerText);

    return { playerFigure, opponentFigure: opponentFigureName, result };
  }
}

export class GamePlayProxy {
  constructor(gameType) {
    this.realGamePlay = new GamePlay(gameType);
  }

  play(selectedCard) {
    const { playerFigure, opponentFigure, result } = this.realGamePlay.play(selectedCard);
    const [day, time] = new Date().toISOString().split("T");

    const gameData = {
      playerFigure,
      opponentFigure,
      result,
      timestamp: `${day} ${time.split(".")[0]}`,
    };

    const existingGameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    existingGameHistory.push(gameData);
    localStorage.setItem("gameHistory", JSON.stringify(existingGameHistory));
  }
}