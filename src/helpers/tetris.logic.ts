import {
  SCORES,
  HIDDEN_ROWS,
  ROTATION_MATRIX,
  SRS_ROTATION_TESTS,
  INITIAl_TETROMINO_POSITIONS,
  ALL_TETROMINOS,
} from "@/helpers/tetris.constants";
import {
  getNextTetrominos,
  getNextTetrominoPosition,
  getProyectedPlacePosition,
  getTetrominoPositionBounds,
  isInvalidTetrominoPosition,
  isTouchingPlacedTetriminosOrBottom,
} from "@/helpers/tetris.helpers";

/*
 ** Returns a new game state
 ** Used to initialize the game state reducer
 */
export const getInitialGameState = (): GameState => {
  const rows = Array(20 + HIDDEN_ROWS).fill(null);
  const columns = Array(10).fill(null);
  const board = rows.map(
    () => columns.map(() => ({ tetromino: null })) as BoardRow
  ) as Board;
  const firstTetromino = ALL_TETROMINOS[0];
  return {
    started: false,
    gameOver: false,
    level: 1,
    scoreId: null,
    levelProgress: 0,
    score: 0,
    fastDrop: false,
    lockDelay: false,
    placedTetrominos: board,
    activeTetromino: {
      type: firstTetromino,
      rotation: 0,
      position: INITIAl_TETROMINO_POSITIONS[firstTetromino],
      projectedPlacePosition: getProyectedPlacePosition(
        INITIAl_TETROMINO_POSITIONS[firstTetromino],
        board
      ),
    },
    nextTetrominos: ALL_TETROMINOS.slice(1),
    callbacks: {} as TetrisCallbacks,
  };
};

/*
 ** Returns a new game state
 ** Called when the user starts a new game
 */
 export const startGame = (gameState: GameState): GameState => {
  const randomTetrominos = getNextTetrominos();
  const firstTetromino = randomTetrominos[0];
  const newState = getInitialGameState()
  return {
    ...newState,
    started: true,
    gameOver: false,
    activeTetromino: {
      ...newState.activeTetromino,
      type: firstTetromino,
      position: INITIAl_TETROMINO_POSITIONS[firstTetromino],
      projectedPlacePosition: getProyectedPlacePosition(
        INITIAl_TETROMINO_POSITIONS[firstTetromino],
        newState.placedTetrominos
      ),
    },
    nextTetrominos: randomTetrominos.slice(1),
    callbacks: {
      ...gameState.callbacks,
    }
  };
};

/*
 ** Takes a game state and a side and returns a new game state with the active tetromino rotated
 ** Called when user press the rotate key
 */
export const rotateTetromino = (
  gameState: GameState,
  side: "left" | "right"
): GameState => {
  const { type, position, rotation } = gameState.activeTetromino;
  if (type === "O") return gameState;
  const rotationModifier = side === "left" ? -1 : 1;
  const newRotation =
    rotation + rotationModifier < 0
      ? 3
      : (((rotation + rotationModifier) % 4) as TetrominoRotation);
  const newPosition = position.map((minoPosition, index) => {
    return {
      row:
        minoPosition.row +
        ROTATION_MATRIX[type][index][newRotation][0] -
        ROTATION_MATRIX[type][index][rotation][0],
      col:
        minoPosition.col +
        ROTATION_MATRIX[type][index][newRotation][1] -
        ROTATION_MATRIX[type][index][rotation][1],
    };
  }) as TetrominoPosition;

  if (!isInvalidTetrominoPosition(newPosition, gameState.placedTetrominos)) {
    gameState.callbacks.onRotate?.();

    return {
      ...gameState,
      activeTetromino: {
        type,
        rotation: newRotation,
        position: newPosition,
        projectedPlacePosition: getProyectedPlacePosition(
          newPosition,
          gameState.placedTetrominos
        ),
      },
    };
  }

  // If the rotated position is invalid, test all the possible positions
  const tests =
    SRS_ROTATION_TESTS[gameState.activeTetromino.type][
      `${rotation}>>${newRotation}` as TetrominoRotationTestName
    ];

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const testPosition = newPosition.map((position) => ({
      row: position.row + test[0],
      col: position.col + test[1],
    })) as TetrominoPosition;
    if (!isInvalidTetrominoPosition(testPosition, gameState.placedTetrominos)) {
      gameState.callbacks.onSRSTrick?.();

      return {
        ...gameState,
        activeTetromino: {
          type,
          rotation: newRotation,
          position: testPosition,
          projectedPlacePosition: getProyectedPlacePosition(
            testPosition,
            gameState.placedTetrominos
          ),
        },
      };
    }
  }

  // If the rotated position is invalid for all tests, return the original position
  return gameState;
};

/*
 ** Takes a game state and a side and returns a new game state with the active tetromino moved
 ** Called when user press the move key
 */
export const moveTetromino = (
  gameState: GameState,
  direction: "left" | "right" | "down"
): GameState => {
  const { position } = gameState.activeTetromino;
  const newPosition = getNextTetrominoPosition(direction, position);
  if (isInvalidTetrominoPosition(newPosition, gameState.placedTetrominos))
    return gameState;
  const [, maxRow, minCol, maxCol] = getTetrominoPositionBounds(newPosition);
  if (maxRow > 20 + HIDDEN_ROWS - 1 || minCol < 0 || maxCol > 9)
    return gameState;

  gameState.callbacks.onMove?.();

  return {
    ...gameState,
    activeTetromino: {
      ...gameState.activeTetromino,
      position: newPosition,
      projectedPlacePosition: getProyectedPlacePosition(
        newPosition,
        gameState.placedTetrominos
      ),
    },
  };
};

/*
 ** Moves down the active tetromino if able
 ** Called on every tick
 */
export const moveTetrominoDown = (gameState: GameState): GameState => {
  if (gameState.lockDelay) return gameState;
  if (gameState.fastDrop) {
    return addScore(moveTetromino(gameState, "down"), SCORES.SOFT_DROP);
  } else {
    return moveTetromino(gameState, "down");
  }
};

/*
 ** Locks the tetromino if it is touching the bottom or another tetromino
 ** Called on every tick
 */
export const checkTetrominoLocked = (gameState: GameState): GameState => {
  if (
    !isTouchingPlacedTetriminosOrBottom(
      gameState.activeTetromino.position,
      gameState.placedTetrominos
    ) ||
    gameState.lockDelay
  )
    return gameState;
  return {
    ...gameState,
    lockDelay: true,
  };
};

/*
 ** Places the tetromino after the lock delay if able, else removes the lock and continues the game
 ** Called on every tick
 */
export const placeLockedTetromino = (gameState: GameState): GameState => {
  const { activeTetromino, placedTetrominos, lockDelay } = gameState;
  if (
    !lockDelay ||
    !isTouchingPlacedTetriminosOrBottom(
      gameState.activeTetromino.position,
      gameState.placedTetrominos
    )
  )
    return {
      ...gameState,
      lockDelay: false,
    };
  gameState.callbacks.onPlace?.();
  const newPlacedTetriminos = placedTetrominos.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      const placeMinoInPosition = activeTetromino.position.some(
        (minoPos) => minoPos.row === rowIndex && minoPos.col === colIndex
      );
      if (placeMinoInPosition) return { tetromino: activeTetromino.type };
      return col;
    })
  ) as Board;
  const newState = {
    ...gameState,
    lockDelay: false,
    placedTetrominos: newPlacedTetriminos,
  };
  return getNextTetromino(checkGameOver(clearLines(newState)));
};

/*
 ** Clears the filled lines
 ** Called when a tetromino is placed
 */
export const clearLines = (gameState: GameState): GameState => {
  const { placedTetrominos } = gameState;
  const clearedLines = placedTetrominos.reduce((acc, row, rowIndex) => {
    if (row.every((col) => col.tetromino !== null)) return [...acc, rowIndex];
    return acc;
  }, [] as number[]);
  if (clearedLines.length === 0) return gameState;

  if (clearedLines.length === 4) {
    gameState.callbacks.onTetris?.();
  } else {
    gameState.callbacks.onClear?.();
  }

  const newPlacedTetrominos = Array(clearedLines.length)
    .fill(null)
    .map(
      () =>
        Array(10)
          .fill(null)
          .map(() => ({ tetromino: null })) as BoardRow
    )
    .concat(
      placedTetrominos.filter(
        (row, rowIndex) => !clearedLines.includes(rowIndex)
      )
    ) as Board;

  const newState = {
    ...gameState,
    placedTetrominos: newPlacedTetrominos,
  };

  return addLevelProgress(
    addScore(newState, SCORES[clearedLines.length] * newState.level),
    clearedLines.length
  );
};

/*
 ** Takes the next tetromino and set it in active tetromino
 ** Called when the active tetromino placed
 */
export const getNextTetromino = (gameState: GameState): GameState => {
  const { nextTetrominos } = gameState;
  const nextTetromino = nextTetrominos[0];
  const newNextTetrominos = nextTetrominos.slice(1);
  const newState = {
    ...gameState,
    activeTetromino: {
      type: nextTetromino,
      rotation: 0,
      position: INITIAl_TETROMINO_POSITIONS[nextTetromino],
      projectedPlacePosition: getProyectedPlacePosition(
        INITIAl_TETROMINO_POSITIONS[nextTetromino],
        gameState.placedTetrominos
      ),
    },
    nextTetrominos: newNextTetrominos,
  } as GameState;
  return refillNextTetrominosIfNeeded(newState);
};

/*
 ** Refills the queue of next tetrominos if it's empty
 ** Called when the the next tetromino is taken
 */
export const refillNextTetrominosIfNeeded = (
  gameState: GameState
): GameState => {
  const { nextTetrominos } = gameState;
  if (nextTetrominos.length > 0) return gameState;
  return {
    ...gameState,
    nextTetrominos: getNextTetrominos(),
  };
};

/*
 ** Adds the score to the current score
 ** Called on soft/hard drop and when lines are cleared
 */
export const addScore = (gameState: GameState, score: number): GameState => {
  const { score: currentScore } = gameState;
  const newScore = currentScore + score;
  return {
    ...gameState,
    score: newScore,
  };
};

/*
 ** Adds level progress
 ** Called when lines are cleared
 */
export const addLevelProgress = (
  gameState: GameState,
  progress: number
): GameState => {
  const { levelProgress, level } = gameState;
  const newLevelProgress = levelProgress + progress;
  if (newLevelProgress >= 5 * level) {
    return {
      ...gameState,
      levelProgress: 0,
      level: Math.min(level + 1, 15),
    };
  } else {
    return {
      ...gameState,
      levelProgress: newLevelProgress,
    };
  }
};

/*
 ** Hard drops the tetromino
 ** Called when the user press the hard drop key
 */
export const hardDropTetromino = (gameState: GameState): GameState => {
  const { activeTetromino } = gameState;
  const newPosition = activeTetromino.projectedPlacePosition;
  const score = newPosition[0].row - activeTetromino.position[0].row * 2;

  gameState.callbacks.onHardDrop?.();

  const newState = {
    ...gameState,
    lockDelay: true,
    score: gameState.score + score,
    activeTetromino: {
      ...gameState.activeTetromino,
      position: newPosition,
    },
  } as GameState;

  return placeLockedTetromino(newState);
};

/*
 ** Checks if the game is over
 ** Called when a tetromino is placed
 */
export const checkGameOver = (gameState: GameState): GameState => {
  const { placedTetrominos } = gameState;
  for (let i = 0; i < HIDDEN_ROWS; i++) {
    if (placedTetrominos[i].some((col) => col.tetromino !== null)) {
      gameState.callbacks.onGameOver?.();
      return {
        ...gameState,
        started: false,
        gameOver: true,
      };
    }
  }
  return gameState;
};

/*
 ** Register callbacks to execute on different events
 ** Called by the game component
 */
export const registerCallback = (
  gameState: GameState,
  name: TetrisCallbackName,
  callback: () => void
) => {
  return {
    ...gameState,
    callbacks: {
      ...gameState.callbacks,
      [name]: callback,
    },
  };
};


