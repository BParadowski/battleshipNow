import { coordinants, Gameboard } from "./types";

export function renderBoard(
  board: Gameboard,
  gridNode: Element,
  visible: boolean
) {
  const grid: Array<HTMLDivElement> = [];
  board.board.forEach((row) => {
    row.forEach((square) => {
      const domSquare = document.createElement("div");
      domSquare.classList.add("board__square");
      if (typeof square === "string" && visible === true) {
        domSquare.classList.add("board__square--ship");
      } else if (square === -1) {
        domSquare.classList.add("board__square--miss");
      } else if (square === -2) {
        domSquare.classList.add("board__square--hit");
      } else {
        domSquare.classList.add("board__square--water");
      }
      grid.push(domSquare);
    });
  });
  gridNode.replaceChildren(...grid);
}

export function renderSquare(
  square: HTMLDivElement,
  board: Gameboard,
  index: coordinants
): void {
  if (board.board[index[1]][index[0]] === -1) {
    square.classList.add("board__square--miss");
    square.classList.remove("board__square--water");
  }
  if (board.board[index[1]][index[0]] === -2) {
    square.classList.add("board__square--hit");
    square.classList.remove("board__square--water");
  }
}
