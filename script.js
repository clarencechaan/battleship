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

function setWinner() {
  if (computer.gameboard.allShipsSunk()) {
    gameStatus = "PLAYER_WINS";
  } else if (player.gameboard.allShipsSunk()) {
    gameStatus = "COMPUTER_WINS";
  }
}

function displayWinner() {
  if (gameStatus === "PLAYER_WINS") {
    console.log("Player wins!");
  } else if (gameStatus === "COMPUTER_WINS") {
    console.log("Computer wins!");
  }
}

function placeComputerShips() {
  let ships = [];
  ships.push(
    Ship(2),
    Ship(2),
    Ship(2),
    Ship(3),
    Ship(3),
    Ship(3),
    Ship(4),
    Ship(4),
    Ship(6)
  );

  for (const ship of ships) {
    let x, y, axis;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      if (Math.random() < 0.5) {
        axis = "H";
      } else {
        axis = "V";
      }
    } while (!computer.gameboard.isValidShipPlacement(ship, x, y, axis));
    console.log(ship, x, y, axis);
    computer.gameboard.placeShip(ship, x, y, axis);
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

  placeComputerShips();

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
