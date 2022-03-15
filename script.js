import displayController from "./displayController.js";
import Ship from "./ship.js";
import Player from "./player.js";

let player;
let computer;
let gameStatus = "ONGOING";

// attempt attack on computer and computer attacks back
function attemptAttackOnComputer(x, y) {
  if (computer.gameboard.isValidAttack(x, y)) {
    computer.gameboard.receiveAttack(x, y);
    player.gameboard.randomizeReceiveAttack();
    displayController.populateBoards(
      player.gameboard.board,
      computer.gameboard.board
    );
  }
}

function isGameOver() {
  return player.gameboard.allShipsSunk() || computer.gameboard.allShipsSunk();
}

// set winner
function setWinner() {
  if (computer.gameboard.allShipsSunk()) {
    gameStatus = "PLAYER_WINS";
  } else if (player.gameboard.allShipsSunk()) {
    gameStatus = "COMPUTER_WINS";
  }
}

// display winner
function displayWinner() {
  if (gameStatus === "PLAYER_WINS") {
    console.log("Player wins!");
  } else if (gameStatus === "COMPUTER_WINS") {
    console.log("Computer wins!");
  }
}

function gameLoop() {
  player = Player();
  computer = Player();

  // place player ships
  player.gameboard.placeShip(Ship(2), 0, 0, "H");
  player.gameboard.placeShip(Ship(3), 3, 0, "V");
  player.gameboard.placeShip(Ship(4), 6, 0, "H");
  player.gameboard.placeShip(Ship(4), 0, 2, "V");
  player.gameboard.placeShip(Ship(3), 5, 2, "H");
  player.gameboard.placeShip(Ship(2), 9, 2, "V");
  player.gameboard.placeShip(Ship(2), 5, 5, "V");
  player.gameboard.placeShip(Ship(3), 9, 5, "V");
  player.gameboard.placeShip(Ship(2), 0, 7, "H");
  player.gameboard.placeShip(Ship(6), 4, 9, "H");

  // place computer ships
  computer.gameboard.placeShip(Ship(2), 1, 0, "H");
  // computer.gameboard.placeShip(Ship(3), 3, 4, "V");
  // computer.gameboard.placeShip(Ship(4), 4, 0, "H");
  // computer.gameboard.placeShip(Ship(3), 3, 2, "H");
  // computer.gameboard.placeShip(Ship(4), 1, 2, "V");
  // computer.gameboard.placeShip(Ship(2), 7, 2, "V");
  // computer.gameboard.placeShip(Ship(2), 4, 5, "V");
  // computer.gameboard.placeShip(Ship(3), 7, 5, "V");
  // computer.gameboard.placeShip(Ship(2), 8, 8, "H");
  // computer.gameboard.placeShip(Ship(6), 0, 9, "H");

  displayController.populateBoards(
    player.gameboard.board,
    computer.gameboard.board
  );

  // add event listeners to computer board
  const cells = document.querySelectorAll("#computer-board > div > div");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      cells[i * 10 + j].onclick = () => {
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
}

displayController.createBlankBoards();
gameLoop();

// add event listener to reset button
const resetBtn = document.querySelector("reset");
reset.onclick = () => {
  displayController.clearBoards();
  gameStatus = "ONGOING";
  gameLoop();
};
