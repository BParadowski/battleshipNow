import "./style.scss";
import { newGameboard } from "./gameboard";
import { newPlayer } from "./player";
import { renderBoard, renderSquare } from "./gameboardDOM";

const leftBoardNode =
  document.querySelector<HTMLDivElement>(".left-side-board")!;
const rightBoardNode =
  document.querySelector<HTMLDivElement>(".right-side-board")!;

newGame();

function gameOver(message: string) {
  console.log(message);
  newGame();
}

function newGame() {
  const player = newPlayer(false, newGameboard());
  const computer = newPlayer(true, newGameboard());
  renderBoard(player.board, leftBoardNode, true);

  player.board.placeShip("Carrier", "horizontal", [0, 0]);
  player.board.placeShip("Destroyer", "vertical", [7, 1]);
  player.board.placeShip("Patrol Boat", "horizontal", [0, 2]);
  player.board.placeShip("Submarine", "vertical", [5, 3]);
  player.board.placeShip("Battleship", "horizontal", [2, 8]);
  renderBoard(player.board, leftBoardNode, true);

  computer.board.placeShip("Carrier", "horizontal", [0, 0]);
  computer.board.placeShip("Destroyer", "vertical", [7, 1]);
  computer.board.placeShip("Patrol Boat", "horizontal", [0, 2]);
  computer.board.placeShip("Submarine", "vertical", [5, 3]);
  computer.board.placeShip("Battleship", "horizontal", [2, 8]);
  renderBoard(computer.board, rightBoardNode, false);

  const squares =
    rightBoardNode.querySelectorAll<HTMLDivElement>(".board__square");

  squares.forEach((square, index) => {
    square.style.cursor = "pointer";

    square.addEventListener(
      "click",
      player.attack.bind(null, computer, [Math.floor(index / 10), index % 10])
    );

    square.addEventListener("click", function () {
      this.style.cursor = "auto";
      this.style.pointerEvents = "none";
    });

    square.addEventListener(
      "click",
      renderSquare.bind(null, square, computer.board, [
        Math.floor(index / 10),
        index % 10,
      ])
    );

    square.addEventListener("click", function () {
      if (computer.board.isFleetSunken()) {
        gameOver("You are victorious");
      }
    });

    square.addEventListener("click", function () {
      computer.aiAttack(player);
      renderBoard(player.board, leftBoardNode, true);
      if (player.board.isFleetSunken()) {
        gameOver("Computer is victorious");
      }
    });
  });
}
