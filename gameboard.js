import Ship from "./ship.js";

const Gameboard = () => {
  let board = [];
  const ships = [
    Ship(6),
    Ship(4),
    Ship(4),
    Ship(3),
    Ship(3),
    Ship(3),
    Ship(2),
    Ship(2),
    Ship(2),
  ];

  // set up board
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let i = 0; i < 10; i++) {
      row.push(" ");
    }
    board.push(row);
  }

  const isValidShipPlacement = (ship, x, y, axis) => {
    if (axis === "H") {
      // horizontal
      // check if ship can be placed
      for (let i = 0; i < ship.length; i++) {
        if (x + i > 9 || board[y][x + i] !== " ") {
          return false;
        }
      }
    } else if (axis === "V") {
      // vertical
      // check if ship can be placed
      for (let i = 0; i < ship.length; i++) {
        if (y + i > 9 || board[y + i][x] !== " ") {
          return false;
        }
      }
    }
    return true;
  };

  const placeShip = (ship, x, y, axis) => {
    if (axis === "H") {
      // horizontal
      // check if ship can be placed
      if (!isValidShipPlacement(ship, x, y, axis)) {
        throw new Error("Can't place ship in invalid location");
      }

      // places ship on board, with cell index
      for (let i = 0; i < ship.length; i++) {
        board[y][x + i] = [ship, i, "O"];
      }
    } else if (axis === "V") {
      // vertical
      // check if ship can be placed
      if (!isValidShipPlacement(ship, x, y, axis)) {
        throw new Error("Can't place ship in invalid location");
      }

      // places ship on board, with cell index
      for (let i = 0; i < ship.length; i++) {
        board[y + i][x] = [ship, i, "O"];
      }
    }
  };

  const receiveAttack = (x, y) => {
    // hit ship
    if (typeof board[y][x][0] === "object" && board[y][x][2] === "O") {
      // at cell index
      board[y][x][0].hit(board[y][x][1]);
      board[y][x][2] = "X";
    }

    // miss
    if (board[y][x] === " ") {
      board[y][x] = "M";
    }
  };

  const allShipsSunk = () => {
    for (const row of board) {
      for (const cell of row) {
        if (typeof cell[0] === "object" && cell[2] === "O") return false;
      }
    }
    return true;
  };

  const randomizeReceiveAttack = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isValidAttack(x, y));
    receiveAttack(x, y);
  };

  const isValidAttack = (x, y) => {
    return (
      board[y][x] === " " ||
      (typeof board[y][x][0] === "object" && board[y][x][2] === "O")
    );
  };

  function placeComputerShips() {
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
      } while (!isValidShipPlacement(ship, x, y, axis));
      placeShip(ship, x, y, axis);
    }
  }

  function shipsRemaining() {
    let counter = 0;
    for (const ship of ships) {
      if (!ship.isSunk()) {
        counter++;
      }
    }
    return counter;
  }

  return {
    board,
    ships,
    isValidShipPlacement,
    placeShip,
    receiveAttack,
    allShipsSunk,
    randomizeReceiveAttack,
    isValidAttack,
    placeComputerShips,
    shipsRemaining,
  };
};

export default Gameboard;
