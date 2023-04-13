type BoardPoint = {
  row: number;
  col: number;
};

type Tetromino = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
type TetrominoRotationTestName =
  | "0>>1"
  | "1>>2"
  | "2>>3"
  | "3>>0"
  | "0>>3"
  | "3>>2"
  | "2>>1"
  | "1>>0";
type TetrominoRotationTestsBattery = {
  [key in TetrominoRotationTestName]: Array<[number, number]>;
};
type TetrominoRotationTests = {
  [key in Tetromino]: TetrominoRotationTestsBattery;
};
type TetrominoPosition = [BoardPoint, BoardPoint, BoardPoint, BoardPoint];

type BoardCell = {
  tetromino: Tetromino | null;
};

type BoardRow = [
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell
];

type Board = [
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow
];

type TetrominoRotation = 0 | 1 | 2 | 3;

type ActiveTetromino = {
  type: Tetromino;
  rotation: TetrominoRotation;
  position: TetrominoPosition;
  projectedPlacePosition: TetrominoPosition;
};

type TetrisCallbackName =
  | "onMove"
  | "onRotate"
  | "onHardDrop"
  | "onSRSTrick"
  | "onGameOver"
  | "onPlace"
  | "onClear"
  | "onTetris";

type TetrisCallbacks = { [key in TetrisCallbackName]: () => void | null };

type GameState = {
  started: boolean;
  gameOver: boolean;
  scoreId: string | null;
  level: number;
  levelProgress: number;
  callbacks: TetrisCallbacks;
  score: number;
  lockDelay: boolean;
  fastDrop: boolean;
  activeTetromino: ActiveTetromino;
  placedTetrominos: Board;
  nextTetrominos: Tetromino[];
};
