import Ship from './ship.js'

test("length", () => {
  expect(Ship(4).length).toBe(4);
});

test("composition", () => {
  expect(Ship(4).composition).toEqual(["O", "O", "O", "O"]);
});

test("hit", () => {
  let ship = Ship(4);
  ship.hit(0);
  expect(ship.composition).toEqual[("X", "O", "O", "O")];
});

test("sunk", () => {
  let ship = Ship(3);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBeTruthy();
});

test("not sunk", () => {
  expect(Ship(5).isSunk()).toBeFalsy();
});