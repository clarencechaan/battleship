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
        playerRow.appendChild(playerCell);
        computerRow.appendChild(computerCell);
      }
      playerBoard.appendChild(playerRow);
      computerBoard.appendChild(computerRow);
    }
  }

  function clearBoards() {
    const cells = document.querySelectorAll(
      "#computer-board > div > div, #player-board > div > div"
    );
    for (const c of cells) {
      c.innerText = "";
    }
  }

  function populatePlayerBoard(board) {
    const cells = document.querySelectorAll("#player-board > div > div");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (typeof board[i][j][0] === "object") {
          cells[i * 10 + j].innerText = "O";
        } else if (board[i][j] === "M") {
          cells[i * 10 + j].innerText = "M";
        } else if (board[i][j] === "X") {
          cells[i * 10 + j].innerText = "X";
        }
      }
    }
  }

  function populateComputerBoard(board) {
    const cells = document.querySelectorAll("#computer-board > div > div");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (typeof board[i][j][0] === "object") {
          cells[i * 10 + j].innerText = "O";
        } else if (board[i][j] === "M") {
          cells[i * 10 + j].innerText = "M";
        } else if (board[i][j] === "X") {
          cells[i * 10 + j].innerText = "X";
        }
      }
    }
  }

  function populateBoards(playerBoard, computerBoard) {
    populatePlayerBoard(playerBoard);
    populateComputerBoard(computerBoard);
  }

  return {
    createBlankBoards,
    clearBoards,
    populatePlayerBoard,
    populateComputerBoard,
    populateBoards,
  };
})();

export default displayController;
