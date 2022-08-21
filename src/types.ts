export type orientation = "vertical" | "horizontal";
export type coordinants = [x: number, y: number];
export type shipName =
  | "Carrier"
  | "Battleship"
  | "Destroyer"
  | "Submarine"
  | "Patrol Boat";

export interface Ship {
  length: number;
  health: number;
  shipPlacement: Array<coordinants>;
  isSunken(): boolean;
  hit(): void;
  placeShip(coordsArray: Array<coordinants>): void;
}

export interface Gameboard {
  ships: Map<string, Ship>;
  board: Array<Array<number | string>>;
  placeShip(
    this: Gameboard,
    shipName: shipName,
    orientation: orientation,
    coordinants: coordinants
  ): boolean;
  receiveHit(coordinants: coordinants): HitMessage;
  isFleetSunken(): boolean;
}
export interface HitMessage {
  didHit: boolean;
  didSink: boolean;
  ship: null | Ship;
}

export interface Player {
  isComputer: boolean;
  board: Gameboard;
  attack(oponent: Player, coordinants: coordinants): HitMessage;
  squaresLeft: Array<coordinants>;
  aiAttack(oponent: Player): HitMessage;
}
