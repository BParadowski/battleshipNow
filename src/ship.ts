import { Ship, coordinants } from "./types";

export function newShip(length: number): Ship {
  const health = length;
  const shipPlacement: Array<coordinants> = [];

  const hit = function (this: Ship): void {
    this.health -= 1;
  };

  const isSunken = function (this: Ship): boolean {
    if (this.health === 0) return true;
    else return false;
  };

  const placeShip = function (this: Ship, coordsArray: Array<coordinants>) {
    for (let i = 0; i < this.shipPlacement.length; i++) {
      shipPlacement.shift();
    }
    coordsArray.forEach((item) => shipPlacement.push(item));
  };

  return { length, health, shipPlacement, isSunken, hit, placeShip };
}
