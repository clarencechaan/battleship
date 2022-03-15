const Gameboard = () => {
  let board = [];

  // set up board
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let i = 0; i < 10; i++) {
      row.push(" ");
    }
    board.push(row);
  }

  const placeShip = (ship, x, y, orientation) => {
    if (orientation === "H") {
      // horizontal
      // check if ship can be placed
      for (let i = 0; i < ship.length; i++) {
        if (board[y][x + i] !== " ") {
          throw new Error("Can't place ship in invalid location");
        }
      }

      // places ship on board, with cell index
      for (let i = 0; i < ship.length; i++) {
        board[y][x + i] = [ship, i];
      }
    } else if (orientation === "V") {
      // vertical
      // check if ship can be placed
      for (let i = 0; i < ship.length; i++) {
        if (board[y + i][x] !== " ") {
          throw new Error("Can't place ship in invalid location");
        }
      }

      // places ship on board, with cell index
      for (let i = 0; i < ship.length; i++) {
        board[y + i][x] = [ship, i];
      }
    }
  };

  const receiveAttack = (x, y) => {
    // hit ship
    if (typeof board[y][x][0] === "object") {
      // at cell index
      board[y][x][0].hit(board[y][x][1]);
      board[y][x] = "X";
    }

    // miss
    if (board[y][x] === " ") {
      board[y][x] = "M";
    }
  };

  const allShipsSunk = () => {
    for (const row of board) {
      for (const cell of row) {
        if (typeof cell[0] === "object") return false;
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

    console.log(x, y);
    receiveAttack(x, y);
  };

  const isValidAttack = (x, y) => {
    return board[y][x] === " " || typeof board[y][x] === "object";
  };

  return {
    board,
    placeShip,
    receiveAttack,
    allShipsSunk,
    randomizeReceiveAttack,
    isValidAttack,
  };
};

export default Gameboard;
