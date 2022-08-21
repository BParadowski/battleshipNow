import add from "../fun";
import { newShip } from "../ship";
import { newGameboard } from "../gameboard";
import { describe, it, expect, beforeEach } from "vitest";
import { Ship } from "../types";

describe("Testing basic adding function", () => {
  it("Returns 4 when called with 1 and 3", () => {
    expect(add(1, 3)).toBe(4);
  });

  it("returns 0 when called with no parameters", () => {
    expect(add(0)).toBe(0);
  });
});

describe("Ship testing", () => {
  const myShip = newShip(4);
  myShip.hit();

  it("Loses 1 health when hit", () => {
    expect(myShip.health).toBe(3);
  });
  it("Isn't sunken by default", () => {
    expect(myShip.isSunken()).toBe(false);
  });

  const hit3times = (myShip: Ship) => {
    myShip.hit();
    myShip.hit();
    myShip.hit();
  };

  it("Sinks when getting to 0 hp", () => {
    hit3times(myShip);
    expect(myShip.isSunken()).toBe(true);
  });
  it("Doesn't lose length when being hit", () => {
    expect(myShip.length).toBe(4);
  });
});

describe("Testing board", () => {
  let myBoard = newGameboard();
  const placeDestroyer = (ori: any) => {
    myBoard.placeShip("Destroyer", ori, [0, 0]);
  };
  const placeInvalid = () => {
    myBoard.placeShip("Destroyer", "horizontal", [8, 7]);
    myBoard.placeShip("Carrier", "vertical", [5, 5]);
  };

  beforeEach(() => {
    myBoard = newGameboard();
  });

  it("Initializes to empty board", () => {
    expect(myBoard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Doesn't allow for invalid ship placement", () => {
    placeInvalid();
    expect(myBoard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Places destroyer vertically", () => {
    placeDestroyer("vertical");
    expect(myBoard.board).toEqual([
      ["Destroyer", 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["Destroyer", 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["Destroyer", 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Places destroyer horizontally and removes previous instance thereof", () => {
    myBoard.placeShip("Destroyer", "vertical", [5, 6]);
    placeDestroyer("horizontal");
    expect(myBoard.board).toEqual([
      ["Destroyer", "Destroyer", "Destroyer", 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Receives hits succesfully", () => {
    placeDestroyer("horizontal");
    myBoard.receiveHit([0, 0]);
    expect(myBoard.board).toEqual([
      [-2, "Destroyer", "Destroyer", 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Fleet isn't sunken by default", () => {
    expect(myBoard.isFleetSunken()).toBe(false);
  });

  it("Fleet is sunken when it is sunken", () => {
    myBoard.placeShip("Carrier", "horizontal", [0, 0]);
    myBoard.placeShip("Destroyer", "horizontal", [0, 1]);
    myBoard.placeShip("Patrol Boat", "horizontal", [0, 2]);
    myBoard.placeShip("Submarine", "horizontal", [0, 3]);
    myBoard.placeShip("Battleship", "horizontal", [0, 4]);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        myBoard.receiveHit([i, j]);
      }
    }
    expect(myBoard.isFleetSunken()).toBe(true);
  });
});
