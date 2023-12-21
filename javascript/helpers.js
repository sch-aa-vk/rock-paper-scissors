import { availableFigures } from './factories.js';

// -- Helpers -- //
function getRandomInt(min, max) {
  let k = Math.floor(Math.random() * (max - min + 1));
  const gameType = document.getElementById("gameType");
  if (gameType.value == "BBT" && k == 3) {
    return getRandomInt(min, max);
  }
  return k;
}

export function computerRandomChoice(size) {
  const randomIndex = getRandomInt(0, size - 1);
  console.log(availableFigures[randomIndex])
  return availableFigures[randomIndex];
}

export function clearPanels() {
  const gamePanel = document.getElementById("gamePanel");
  gamePanel.innerHTML = "";
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";
}