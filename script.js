import displayController from "./displayController.js";
import Ship from "./ship.js";
import Player from "./player.js";

let player;
let computer;
let gameStatus = "PLACING_SHIPS";
let placingShipIndex = 0;
let axis = "H";

// attempt attack on computer and computer attacks back
function attemptAttackOnComputer(x, y) {
  if (computer.gameboard.isValidAttack(x, y)) {
    computer.gameboard.receiveAttack(x, y);
    player.gameboard.randomizeReceiveAttack();
    displayController.updateUI(player.gameboard, computer.gameboard);
  }
}

function isGameOver() {
  return player.gameboard.allShipsSunk() || computer.gameboard.allShipsSunk();
}

function setWinner() {
  if (computer.gameboard.allShipsSunk()) {
    gameStatus = "PLAYER_WINS";
  } else if (player.gameboard.allShipsSunk()) {
    gameStatus = "COMPUTER_WINS";
  }
}

function displayWinner() {
  if (gameStatus === "PLAYER_WINS") {
    displayController.displayMessage("Congratulations! You win!");
  } else if (gameStatus === "COMPUTER_WINS") {
    displayController.displayMessage("Sorry! You lost!");
  }
}

function attemptPlacePlayerShip(ship, x, y, axis) {
  if (
    gameStatus === "PLACING_SHIPS" &&
    player.gameboard.isValidShipPlacement(ship, x, y, axis)
  ) {
    player.gameboard.placeShip(ship, x, y, axis);
    displayController.populatePlayerBoard(player.gameboard.board);
    placingShipIndex++;
  }
}

function toggleAxis() {
  const changeAxisBtn = document.querySelector("#change-axis");
  if (axis === "H") {
    axis = "V";
    changeAxisBtn.innerText = "Axis: Y";
  } else if (axis === "V") {
    axis = "H";
    changeAxisBtn.innerText = "Axis: X";
  }
}

function gameLoop() {
  player = Player();
  computer = Player();

  computer.gameboard.placeComputerShips();

  displayController.disableComputerBoard();
  displayController.enableChangeAxisBtn();
  displayController.updateUI(player.gameboard, computer.gameboard);
}

displayController.createBlankBoards();
gameLoop();

// add event listener to reset button
const resetBtn = document.querySelector("reset");
reset.onclick = () => {
  gameStatus = "PLACING_SHIPS";
  displayController.displayMessage("Place your ships!");
  gameLoop();
};

// add event listeners to computer board
const computerCells = document.querySelectorAll("#computer-board > div > div");
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    computerCells[i * 10 + j].onclick = () => {
      if (gameStatus === "ONGOING") {
        attemptAttackOnComputer(j, i);
        if (isGameOver()) {
          setWinner();
          displayWinner();
        }
      }
    };
  }
}

// add event listeners to player board for ship placement
const playerCells = document.querySelectorAll("#player-board > div > div");
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    // attempt to place ship on click
    playerCells[i * 10 + j].onclick = () => {
      attemptPlacePlayerShip(
        player.gameboard.ships[placingShipIndex],
        j,
        i,
        axis
      );
      if (placingShipIndex >= player.gameboard.ships.length) {
        placingShipIndex = 0;
        gameStatus = "ONGOING";
        displayController.displayMessage("Sink your enemy's ships!");
        displayController.enableComputerBoard();
        displayController.disableChangeAxisBtn();
      }
    };

    // show current ship to place on hover
    playerCells[i * 10 + j].onmouseover = () => {
      displayController.populatePlayerBoard(player.gameboard.board);
      if (
        gameStatus === "PLACING_SHIPS" &&
        player.gameboard.isValidShipPlacement(
          player.gameboard.ships[placingShipIndex],
          j,
          i,
          axis
        )
      ) {
        displayController.peekPlayerShipPlacement(
          player.gameboard.ships[placingShipIndex],
          j,
          i,
          axis
        );
      }
    };
  }
}

// add event listener to change axis button
const changeAxisBtn = document.querySelector("#change-axis");
changeAxisBtn.onclick = toggleAxis;

// clear player board on hover out of player board
const playerBoard = document.querySelector("#player-board");
playerBoard.onmouseout = () => {
  displayController.populatePlayerBoard(player.gameboard.board);
};
