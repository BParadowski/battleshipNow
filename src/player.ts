import { Gameboard, Player, coordinants, HitMessage } from "./types";

export function newPlayer(isComputer: boolean, board: Gameboard): Player {
  const attack = function (
    oponent: Player,
    coordinants: coordinants
  ): HitMessage {
    return oponent.board.receiveHit(coordinants);
  };

  // computer player functions and properties below
  const squaresLeft: coordinants[] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      squaresLeft.push([i, j]);
    }
  }
  const aiAttack = function (this: Player, oponent: Player): HitMessage {
    const targetSquare =
      this.squaresLeft[
        Math.floor(Math.random() * (this.squaresLeft.length - 1))
      ];
    this.squaresLeft.splice(this.squaresLeft.indexOf(targetSquare), 1);
    return attack(oponent, targetSquare);
  };

  return { isComputer, board, attack, squaresLeft, aiAttack };
}
