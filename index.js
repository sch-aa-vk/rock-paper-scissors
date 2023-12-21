const availableFigures = [
  "Rock",
  "Paper",
  "Scissors",
  "Well",
  "Spock",
  "Lizard",
];

const gameType = document.getElementById("gameType");
const playButton = document.getElementById("playButton");

// -- Figures -- //
class Figure {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }
  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }
}

class Paper extends Figure {
  constructor() {
    super("Paper", "./assets/paper.png");
  }
}

class Rock extends Figure {
  constructor() {
    super("Rock", "./assets/rock.png");
  }
}

class Scissors extends Figure {
  constructor() {
    super("Scissors", "./assets/scissors.png");
  }
}

class Well extends Figure {
  constructor() {
    super("Well", "./assets/well.png");
  }
}

class Spock extends Figure {
  constructor() {
    super("Spock", "./assets/spock.png");
  }
}

class Lizard extends Figure {
  constructor() {
    super("Lizard", "./assets/lizard.png");
  }
}

// -- Factories -- //
class FigureFactory {
  createFigures() {
    return [];
  }
}

class ClassicGameFactory extends FigureFactory {
  createFigures() {
    return [new Rock(), new Paper(), new Scissors()];
  }
}

class BBTGameFactory extends FigureFactory {
  createFigures() {
    return [new Rock(), new Paper(), new Scissors(), new Lizard(), new Spock()];
  }
}

class WithWellGameFactory extends FigureFactory {
  createFigures() {
    return [new Rock(), new Paper(), new Scissors(), new Well()];
  }
}

// -- Strategies -- //
class GameStrategy {
  determineWinner(playerFigure, opponentFigure) {}
}

class ClassicGameStrategy extends GameStrategy {
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

class BBTGameStrategy extends GameStrategy {
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

class WithWellGameStrategy extends GameStrategy {
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

// -- Helpers -- //
function getRandomInt(min, max) {
  let k = Math.floor(Math.random() * (max - min + 1));
  const gameType = document.getElementById("gameType");
  if (gameType.value == "BBT" && k == 3) {
    return getRandomInt(min, max);
  }
  return k;
}

function computerRandomChoice(size) {
  const randomIndex = getRandomInt(0, size - 1);
  return availableFigures[randomIndex];
}

function clearPanels() {
  const gamePanel = document.getElementById("gamePanel");
  gamePanel.innerHTML = "";
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";
}

const availableFiguresClasses = {
  Rock: new Rock(),
  Paper: new Paper(),
  Scissors: new Scissors(),
  Well: new Well(),
  Spock: new Spock(),
  Lizard: new Lizard(),
};

const GameStrategies = {
  Classic: {
    strategy: new ClassicGameStrategy(),
    size: 3,
  },
  BBT: {
    strategy: new BBTGameStrategy(),
    size: 6,
  },
  WithWell: {
    strategy: new WithWellGameStrategy(),
    size: 4,
  },
};

const GameFactories = {
  Classic: new ClassicGameFactory(),
  BBT: new BBTGameFactory(),
  WithWell: new WithWellGameFactory(),
};

// -- Gameplay -- //
class GamePlay {
  constructor(gameStrategy) {
    this.gameStrategy = gameStrategy;
  }

  play(selectedCard, size) {
    const playerFigure = selectedCard;
    const opponentFigure = computerRandomChoice(size);
    const result = this.gameStrategy.determineWinner(
      playerFigure,
      opponentFigure
    );
    const computerCard = document.getElementById("computerCard");
    const opponentFigureClass = availableFiguresClasses[opponentFigure];
    const computerCardImage = document.createElement("img");
    computerCardImage.src = opponentFigureClass.getImage();
    computerCardImage.alt = opponentFigureClass.getName();
    computerCard.appendChild(computerCardImage);
    const gamePanel = document.getElementById("gamePanel");
    const winnerText = document.createElement("p");
    winnerText.id = "winnerText";
    winnerText.innerHTML = result;
    gamePanel.appendChild(winnerText);

    return { playerFigure, opponentFigure, result };
  }
}

class GamePlayProxy {
  constructor(gameStrategy) {
    this.realGamePlay = new GamePlay(gameStrategy);
  }

  play(selectedCard, size) {
    const { playerFigure, opponentFigure, result } = this.realGamePlay.play(
      selectedCard,
      size
    );
    const currentTime = new Date().toISOString();
    const date = currentTime.split("T");
    const time = date[1].split(".")[0];

    const gameData = {
      playerFigure,
      opponentFigure,
      result,
      timestamp: `${date[0]} ${time}`,
    };

    const existingGameHistory =
      JSON.parse(localStorage.getItem("gameHistory")) || [];

    existingGameHistory.push(gameData);

    localStorage.setItem("gameHistory", JSON.stringify(existingGameHistory));
  }
}

function showCards(figures) {
  const cardsContainer = document.querySelector(".cards");

  figures.forEach((figure) => {
    const figureCard = document.createElement("div");
    figureCard.className = "card";
    figureCard.innerHTML = `
        <p>Name: ${figure.getName()}</p>
        <img src="${figure.getImage()}" alt="${figure.getName()}">
    `;
    figureCard.addEventListener("click", () => {
      const gamePanel = document.getElementById("gamePanel");
      gamePanel.innerHTML = "";
      const cardsContainer = document.createElement("div");
      cardsContainer.id = "gameCards";
      cardsContainer.className = "game-cards";

      const figureCardClone = figureCard.cloneNode(true);
      const panelText = document.createElement("p");
      panelText.innerText = "VS";
      const computerCard = document.createElement("div");
      computerCard.className = "card";
      computerCard.id = "computerCard";
      computerCard.innerHTML = "<p>Computer Card</p>";

      cardsContainer.appendChild(figureCardClone);
      cardsContainer.appendChild(panelText);
      cardsContainer.appendChild(computerCard);

      gamePanel.appendChild(cardsContainer);
    });

    cardsContainer.appendChild(figureCard);
  });
}

function createCards() {
  clearPanels();
  const gameType = document.getElementById("gameType");
  const figureFactory = GameFactories[gameType.value] ?? undefined;

  const figures = figureFactory.createFigures();
  showCards(figures);
}

function playGame() {
  const gamePanel = document.getElementById("gamePanel");
  const userCard = gamePanel.querySelector(".card");
  const computerCardImage = gamePanel.querySelector("#computerCard")?.querySelector("img");

  console.log(userCard);
  if (!userCard) {
    gamePanel.innerHTML = "Please select a card!";
    return;
  }
  if (computerCardImage) {
    document.getElementById("winnerText").remove();
    computerCardImage.remove();
  }

  const gameType = document.getElementById("gameType");
  const gameStrategy = GameStrategies[gameType.value];
  const figure = gamePanel.querySelector(".card");
  const figureName = figure.querySelector("p").innerText.split(" ")[1];

  new GamePlayProxy(gameStrategy.strategy).play(figureName, gameStrategy.size);
}

playButton.addEventListener("click", playGame);
gameType.addEventListener("change", createCards);
window.document.onload = createCards();
