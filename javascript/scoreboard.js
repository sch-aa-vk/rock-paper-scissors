const tableContainer = document.querySelector(".content-container-table");
const tableBody = document.getElementById("tableBody");
const tableHead = document.getElementById("tableHead");
const tableBodyGeneral = document.getElementById("tableBodyGeneral");
const tableHeadGeneral = document.getElementById("tableHeadGeneral");
const result = JSON.parse(localStorage.getItem("gameHistory")) || undefined;

if (result) {
  const tableCategories = [
    { key: 'playerFigure', label: 'Player Figure' },
    { key: 'opponentFigure', label: 'Opponent Figure' },
    { key: 'result', label: 'Result' },
    { key: 'timestamp', label: 'Timestamp' },
  ];
  const tableCategoriesGeneral = [
    { key: 0, label: 'Lose' },
    { key: 0, label: 'Win' },
    { key: 0, label: 'Tie' },
  ];

  tableCategories.map((category) => {
    const tableHeader = document.createElement("th");
    tableHeader.innerHTML = category.label;
    tableHead.appendChild(tableHeader);
  });

  result.map((item) => {
    const tableRow = document.createElement("tr");

    tableCategories.map((category) => {
      const tableData = document.createElement("td");
      tableData.innerHTML = item[category.key];
      tableRow.appendChild(tableData);
    });

    switch (item.result) {
      case "You lose!":
        tableCategoriesGeneral[0].key++;
        break;
      case "You win!":
        tableCategoriesGeneral[1].key++;
        break;
      case "It's a tie!":
        tableCategoriesGeneral[2].key++;
        break;
      default:
        break;
    }

    tableBody.appendChild(tableRow);
  });

  const tableRow = document.createElement("tr");

  tableCategoriesGeneral.map((category) => {
    const tableHeader = document.createElement("th");
    tableHeader.innerHTML = category.label;
    tableHeadGeneral.appendChild(tableHeader);

    const tableData = document.createElement("td");
    tableData.innerHTML = category.key;
    tableRow.appendChild(tableData);
  });

  tableBodyGeneral.appendChild(tableRow);
} else {
  tableContainer.innerHTML = "<p>No games played yet.</p>";
}