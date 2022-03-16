const displayController = (() => {
  function createBlankBoards() {
    const playerBoard = document.querySelector("#player-board");
    const computerBoard = document.querySelector("#computer-board");

    for (let i = 0; i < 10; i++) {
      const playerRow = document.createElement("div");
      const computerRow = document.createElement("div");
      for (let j = 0; j < 10; j++) {
        const playerCell = document.createElement("div");
        const computerCell = document.createElement("div");
        const playerMarker = document.createElement("div");
        const computerMarker = document.createElement("div");
        playerMarker.className = "marker";
        computerMarker.className = "marker";
        playerCell.appendChild(playerMarker);
        computerCell.appendChild(computerMarker);
        playerRow.appendChild(playerCell);
        computerRow.appendChild(computerCell);
      }
      playerBoard.appendChild(playerRow);
      computerBoard.appendChild(computerRow);
    }
  }

  function populatePlayerBoard(board) {
    const cells = document.querySelectorAll("#player-board > div > div");
    const markers = document.querySelectorAll(
      "#player-board > div > div > div"
    );
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // sunk ship
        if (typeof board[i][j][0] === "object" && board[i][j][0].isSunk()) {
          cells[i * 10 + j].className = "sunk";
          // not sunk ship
        } else if (
          typeof board[i][j][0] === "object" &&
          board[i][j][2] === "O"
        ) {
          cells[i * 10 + j].className = "ship";
          // hit ship
        } else if (
          typeof board[i][j][0] === "object" &&
          board[i][j][2] === "X"
        ) {
          markers[i * 10 + j].className = "marker hit";
          // missed attack
        } else if (board[i][j] === "M") {
          markers[i * 10 + j].className = "marker miss";
          // no marker
        } else if (board[i][j] === " ") {
          cells[i * 10 + j].className = "";
          markers[i * 10 + j].className = "marker";
        }
      }
    }
  }

  function populateComputerBoard(board) {
    const cells = document.querySelectorAll("#computer-board > div > div");
    const markers = document.querySelectorAll(
      "#computer-board > div > div > div"
    );
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // sunk ship
        if (typeof board[i][j][0] === "object" && board[i][j][0].isSunk()) {
          cells[i * 10 + j].className = "sunk";
          // not sunk ship
          // } else if (
          //   typeof board[i][j][0] === "object" &&
          //   board[i][j][2] === "O"
          // ) {
          //   cells[i * 10 + j].className = "ship"
          //   markers[i * 10 + j].className = "marker";
          // hit ship
        } else if (
          typeof board[i][j][0] === "object" &&
          board[i][j][2] === "X"
        ) {
          markers[i * 10 + j].className = "marker hit";
          // missed attack
        } else if (board[i][j] === "M") {
          markers[i * 10 + j].className = "marker miss";
          // no marker
        } else if (board[i][j] === " " || typeof board[i][j][0] === "object") {
          cells[i * 10 + j].className = "";
          markers[i * 10 + j].className = "marker";
        }
      }
    }
  }

  function updateUI(playerGameboard, computerGameboard) {
    populatePlayerBoard(playerGameboard.board);
    populateComputerBoard(computerGameboard.board);
    updateShipsRemaining(computerGameboard);
  }

  function peekPlayerShipPlacement(ship, x, y, axis) {
    const playerCells = document.querySelectorAll("#player-board > div > div");
    if (axis === "H") {
      for (let i = 0; i < ship.length; i++) {
        playerCells[y * 10 + x + i].className = "ship";
      }
    } else if (axis === "V") {
      for (let i = 0; i < ship.length; i++) {
        playerCells[(y + i) * 10 + x].className = "ship";
      }
    }
  }

  function updateShipsRemaining(gameboard) {
    const shipsRemaining = document.querySelector("#ships-remaining");
    shipsRemaining.innerText =
      "Enemy Ships Remaining: " + gameboard.shipsRemaining();
  }

  function displayMessage(message) {
    const messageDiv = document.querySelector("#message");
    messageDiv.innerText = message;
  }

  function disableComputerBoard() {
    const computerBoard = document.querySelector(
      "#board-container > div:nth-child(2)"
    );
    console.log(computerBoard);
    computerBoard.style.opacity = "0.2";
  }

  function enableComputerBoard() {
    const computerBoard = document.querySelector(
      "#board-container > div:nth-child(2)"
    );
    console.log(computerBoard);
    computerBoard.style.opacity = "1";
  }

  function disableChangeAxisBtn() {
    const changeAxisBtn = document.querySelector("#change-axis");
    changeAxisBtn.style.opacity = "0.2";
  }

  function enableChangeAxisBtn() {
    const changeAxisBtn = document.querySelector("#change-axis");
    changeAxisBtn.style.opacity = "1";
  }
  return {
    createBlankBoards,
    populatePlayerBoard,
    populateComputerBoard,
    updateUI,
    peekPlayerShipPlacement,
    updateShipsRemaining,
    displayMessage,
    disableComputerBoard,
    enableComputerBoard,
    disableChangeAxisBtn,
    enableChangeAxisBtn,
  };
})();

export default displayController;
