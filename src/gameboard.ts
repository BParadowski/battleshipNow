import { newShip } from "./ship";
import {
  Ship,
  orientation,
  coordinants,
  shipName,
  Gameboard,
  HitMessage,
} from "./types";

export function newGameboard(): Gameboard {
  const board: Array<Array<number | string>> = [];
  for (let i = 0; i < 10; i++) {
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  const ships = new Map();
  ships.set("Carrier", newShip(5));
  ships.set("Battleship", newShip(4));
  ships.set("Destroyer", newShip(3));
  ships.set("Submarine", newShip(3));
  ships.set("Patrol Boat", newShip(2));

  const placeShip = function (
    this: Gameboard,
    shipName: shipName,
    orientation: orientation,
    coordinants: coordinants
  ): boolean {
    const x = coordinants[0];
    const y = coordinants[1];
    const placedShip: Ship = ships.get(shipName);

    const isValidPlacement = (): boolean => {
      if (orientation === "horizontal") {
        if (x + placedShip.length <= 9) {
          let squares = this.board[y].slice(x, x + placedShip.length);
          squares = squares.filter(
            (square) => square === 0 || square === shipName
          );
          this.board[y][x];
          if (squares.length === placedShip.length) {
            return true;
          }
        }
      }
      if (orientation === "vertical") {
        if (y + placedShip.length <= 9) {
          let squares = [];
          for (let i = 0; i < placedShip.length; i++) {
            squares.push(this.board[y + i][x]);
          }
          squares = squares.filter(
            (square) => square === 0 || square === shipName
          );
          if (squares.length === placedShip.length) {
            return true;
          }
        }
      }
      return false;
    };

    // removes previously placed ship of the same type from the this.board;
    const clearSpace = (): void => {
      const newBoard: Array<Array<number | string>> = [];
      this.board.forEach((row) => {
        return newBoard.push(
          row.map((square: string | number) =>
            square === shipName ? 0 : square
          )
        );
      });

      this.board = newBoard;
    };

    if (isValidPlacement()) {
      clearSpace();
      if (orientation === "horizontal") {
        for (let i = 0; i < placedShip.length; i++) {
          this.board[y][x + i] = shipName;
        }
      }
      if (orientation === "vertical") {
        for (let i = 0; i < placedShip.length; i++) {
          this.board[y + i][x] = shipName;
        }
      }
      return true;
    }
    return false;
  };

  const receiveHit = function (
    this: Gameboard,
    coordinants: coordinants
  ): HitMessage {
    const x = coordinants[0];
    const y = coordinants[1];

    if (typeof this.board[y][x] === "string") {
      const targetedShip: Ship = ships.get(this.board[y][x]);
      targetedShip.hit();
      this.board[y][x] = -2;
      return {
        didHit: true,
        didSink: targetedShip.isSunken(),
        ship: targetedShip,
      };
    } else {
      this.board[y][x] = -1;
      return { didHit: false, didSink: false, ship: null };
    }
  };

  const isFleetSunken = function (this: Gameboard): boolean {
    for (const ship of this.ships.values()) {
      if (ship.isSunken() === true) continue;
      else return false;
    }
    return true;
  };

  return { board, ships, placeShip, receiveHit, isFleetSunken };
}
