import { clearPanels } from './helpers.js';
import { GamePlayProxy } from './proxy.js';
import { GameTypes } from './strategies.js';

// -- Gameplay -- //
export function showCards(figures) {
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

export function createCards() {
  clearPanels();

  const gameType = document.getElementById("gameType");
  const figureFactory = GameTypes[gameType.value].factory ?? undefined;
  const figures = figureFactory.createFigures();

  showCards(figures);
}

export function playGame() {
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
  const gameStrategy = GameTypes[gameType.value];
  const figure = gamePanel.querySelector(".card");
  const figureName = figure.querySelector("p").innerText.split(" ")[1];

  new GamePlayProxy(gameStrategy).play(figureName);
}