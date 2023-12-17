const tableContainer = document.querySelector(".content-container-table");
const tableBody = document.getElementById("tableBody");
const tableBodyGeneral = document.getElementById("tableBodyGeneral");
const result = JSON.parse(localStorage.getItem("gameHistory")) || undefined;

if (result) {
  let lose = 0;
  let win = 0;
  let tie = 0;

  result.map((item) => {
    const tableRow = document.createElement("tr");
    const playerFigure = document.createElement("td");
    playerFigure.innerHTML = item.playerFigure;
    const opponentFigure = document.createElement("td");
    opponentFigure.innerHTML = item.opponentFigure;
    const result = document.createElement("td");
    result.innerHTML = item.result;
    switch (item.result) {
      case "You lose!":
        lose++;
        break;
      case "You win!":
        win++;
        break;
      case "It's a tie!":
        tie++;
        break;
      default:
        break;
    }
    const timestamp = document.createElement("td");
    timestamp.innerHTML = item.timestamp;

    tableRow.append(playerFigure, opponentFigure, result, timestamp);
    tableBody.appendChild(tableRow);
  });

  const tableRow = document.createElement("tr");
  const loseBlock = document.createElement("td");
  loseBlock.innerHTML = lose;
  const winBlock = document.createElement("td");
  winBlock.innerHTML = win;
  const tieBlock = document.createElement("td");
  tieBlock.innerHTML = tie;
  
  tableRow.append(loseBlock, winBlock, tieBlock);
  tableBodyGeneral.appendChild(tableRow);
} else {
  tableContainer.innerHTML = "<p>No games played yet.</p>";
}