import { playGame, createCards } from "./gameplay.js";

const gameType = document.getElementById("gameType");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", playGame);
gameType.addEventListener("change", createCards);
window.document.onload = createCards();