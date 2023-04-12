import { HIDDEN_ROWS, ALL_TETROMINOS } from "@/helpers/tetris.constants";
import { shuffleArray } from "@/helpers/arrays";

/*
 ** Get the randomized list of tetrominos to use in the next pieces
 */
export const getNextTetrominos = (): Tetromino[] => {
  return shuffleArray(ALL_TETROMINOS);
};

/*
 ** Get the next position of a tetromino based on the direction of movement
 */
export const getNextTetrominoPosition = (
  direction: "down" | "left" | "right",
  position: TetrominoPosition
): TetrominoPosition => {
  return position.map(
    (point) =>
      ({
        row: point.row + (direction === "down" ? 1 : 0),
        col:
          point.col +
          (direction === "right" ? 1 : direction === "left" ? -1 : 0),
      } as BoardPoint)
  ) as TetrominoPosition;
};

/*
 ** Gets the min and max positions of row and col of the position of a tetromino
 */
export const getTetrominoPositionBounds = (
  position: TetrominoPosition
): [number, number, number, number] => {
  let minRow = Infinity;
  let minCol = Infinity;
  let maxRow = -Infinity;
  let maxCol = -Infinity;
  position.forEach((point) => {
    minRow = Math.min(minRow, point.row);
    minCol = Math.min(minCol, point.col);
    maxRow = Math.max(maxRow, point.row);
    maxCol = Math.max(maxCol, point.col);
  });
  return [minRow, maxRow, minCol, maxCol];
};

/*
 ** Checks if there is a tetromino in the given position
 */
export const isTetriminoInPosition = (
  position: TetrominoPosition,
  point: BoardPoint
): boolean => {
  if (!position) return false; // Is this really needed?
  return position.some((minoPosition) => {
    if (minoPosition.row === point.row && minoPosition.col === point.col) {
      return true;
    }
  });
};

/*
 ** Checks if the tetromino in the given position is touching a placed tetromino or the bottom of the board
 */
export const isTouchingPlacedTetriminosOrBottom = (
  position: TetrominoPosition,
  placedTetrominos: Board
): boolean => {
  const [, maxRow] = getTetrominoPositionBounds(position);
  if (maxRow >= 20 + HIDDEN_ROWS - 1) return true;
  return position.some((point) => {
    if (placedTetrominos[point.row + 1][point.col].tetromino !== null)
      return true;
    return false;
  });
};

/*
 ** Checks if the given position for a tetromino is valid
 ** which means that it is not outside the board or touching a placed tetromino
 */
export const isInvalidTetrominoPosition = (
  position: TetrominoPosition,
  placedTetrominos: Board
): boolean => {
  return position.some((point) => {
    if (
      point.row < 0 ||
      point.row >= 20 + HIDDEN_ROWS ||
      point.col < 0 ||
      point.col >= 10 ||
      placedTetrominos[point.row][point.col].tetromino !== null
    ) {
      return true;
    }
  });
};

/*
 ** Returns the tick interval time based on the level
 ** It uses the formula from the original game
 */
export const getTickTime = (level: number, fastDrop: boolean): number => {
  return (
    Math.pow(0.8 - (level - 1) * 0.007, level - 1) * (fastDrop ? 100 : 1000)
  );
};

/*
 ** Returns the position the active tetromino would be placed if it was dropped
 */
export const getProyectedPlacePosition = (
  position: TetrominoPosition,
  placedTetrominos: Board
): TetrominoPosition => {
  let previosPosition = position;
  let nextPosition = getNextTetrominoPosition("down", position);
  while (
    !isInvalidTetrominoPosition(nextPosition, placedTetrominos) &&
    !isTouchingPlacedTetriminosOrBottom(nextPosition, placedTetrominos)
  ) {
    previosPosition = nextPosition;
    nextPosition = getNextTetrominoPosition("down", nextPosition);
  }
  if (!isInvalidTetrominoPosition(nextPosition, placedTetrominos))
    return nextPosition;
  return previosPosition;
};
