import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

test("place ship horizontal", () => {
  let gameboard = Gameboard();
  let ship = Ship(6);
  gameboard.placeShip(ship, 4, 9, "H");
  expect(gameboard.board).toEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [
      " ",
      " ",
      " ",
      " ",
      [ship, 0, "O"],
      [ship, 1, "O"],
      [ship, 2, "O"],
      [ship, 3, "O"],
      [ship, 4, "O"],
      [ship, 5, "O"],
    ],
  ]);
});

test("place ship vertical", () => {
  let gameboard = Gameboard();
  let ship = Ship(4);
  gameboard.placeShip(ship, 0, 0, "V");
  expect(gameboard.board).toEqual([
    [[ship, 0, "O"], " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [[ship, 1, "O"], " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [[ship, 2, "O"], " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [[ship, 3, "O"], " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);
});

test("invalid place ship on border", () => {
  let gameboard = Gameboard();
  expect(() => {
    gameboard.placeShip(Ship(4), 9, 0, "H");
  }).toThrow();
});

test("invalid place ship on ship", () => {
  let gameboard = Gameboard();
  gameboard.placeShip(Ship(5), 2, 0, "H");
  expect(() => {
    gameboard.placeShip(Ship(4), 0, 0, "H");
  }).toThrow();
});

test("receive attack on ship", () => {
  let gameboard = Gameboard();
  let ship = Ship(4);
  gameboard.placeShip(ship, 0, 0, "H");
  gameboard.receiveAttack(1, 0);
  expect(gameboard.board).toEqual([
    [
      [ship, 0, "O"],
      [ship, 1, "X"],
      [ship, 2, "O"],
      [ship, 3, "O"],
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);
  expect(ship.composition).toBe[("O", "X", "O", "O")];
});

test("receive attack miss", () => {
  let gameboard = Gameboard();
  gameboard.receiveAttack(1, 0);
  expect(gameboard.board).toEqual([
    [" ", "M", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);
});

test("all ships sunk", () => {
  let gameboard = Gameboard();
  let ship = Ship(4);
  gameboard.placeShip(ship, 0, 0, "H");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(2, 0);
  gameboard.receiveAttack(3, 0);
  expect(gameboard.allShipsSunk()).toBeTruthy();
});

test("not all ships sunk", () => {
  let gameboard = Gameboard();
  let ship = Ship(4);
  gameboard.placeShip(ship, 0, 0, "H");
  expect(gameboard.allShipsSunk()).toBeFalsy();
});