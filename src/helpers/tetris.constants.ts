export const HIDDEN_ROWS = 2;

export const ALL_TETROMINOS = [
  "I",
  "O",
  "T",
  "S",
  "Z",
  "J",
  "L",
] as Tetromino[];

export const INITIAl_TETROMINO_POSITIONS = {
  I: [
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
    { row: 1, col: 6 },
  ] as TetrominoPosition,
  O: [
    { row: 0, col: 4 },
    { row: 0, col: 5 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
  ] as TetrominoPosition,
  T: [
    { row: 0, col: 4 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
  ] as TetrominoPosition,
  S: [
    { row: 0, col: 4 },
    { row: 0, col: 5 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
  ] as TetrominoPosition,
  Z: [
    { row: 0, col: 3 },
    { row: 0, col: 4 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
  ] as TetrominoPosition,
  J: [
    { row: 0, col: 3 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
  ] as TetrominoPosition,
  L: [
    { row: 0, col: 5 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
  ] as TetrominoPosition,
};

export const ROTATION_MATRIX = {
  I: [
    [
      [1, 0],
      [0, 2],
      [2, 3],
      [3, 1],
    ],
    [
      [1, 1],
      [1, 2],
      [2, 2],
      [2, 1],
    ],
    [
      [1, 2],
      [2, 2],
      [2, 1],
      [1, 1],
    ],
    [
      [1, 3],
      [3, 2],
      [2, 0],
      [0, 1],
    ],
  ],
  O: [
    [
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [1, 1],
      [0, 1],
    ],
    [
      [1, 2],
      [1, 1],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
  ],
  T: [
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [1, 0],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 2],
      [2, 1],
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    [
      [1, 2],
      [2, 1],
      [1, 0],
      [0, 1],
    ],
  ],
  S: [
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [1, 0],
    ],
    [
      [0, 2],
      [2, 2],
      [2, 0],
      [0, 0],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 2],
      [2, 1],
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  ],
  Z: [
    [
      [0, 0],
      [0, 2],
      [2, 2],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [1, 0],
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    [
      [1, 2],
      [2, 1],
      [1, 0],
      [0, 1],
    ],
  ],
  J: [
    [
      [0, 0],
      [0, 2],
      [2, 2],
      [2, 0],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 2],
      [2, 1],
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    [
      [1, 2],
      [2, 1],
      [1, 0],
      [0, 1],
    ],
  ],
  L: [
    [
      [0, 2],
      [2, 2],
      [2, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 2],
      [2, 1],
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    [
      [1, 2],
      [2, 1],
      [1, 0],
      [0, 0],
    ],
  ],
};

const SRS_BASIC_TESTS = {
  "0>>1": [
    [0, -1],
    [-1, -1],
    [2, 0],
    [2, -1],
  ],
  "1>>0": [
    [0, 1],
    [1, 1],
    [-2, 0],
    [-2, 1],
  ],
  "1>>2": [
    [0, 1],
    [1, 1],
    [-2, 0],
    [-2, 1],
  ],
  "2>>1": [
    [0, -1],
    [-1, -1],
    [2, 0],
    [2, -1],
  ],
  "2>>3": [
    [0, 1],
    [-1, 1],
    [2, 0],
    [2, 1],
  ],
  "3>>2": [
    [0, -1],
    [1, -1],
    [-2, 0],
    [-2, -1],
  ],
  "3>>0": [
    [0, -1],
    [1, -1],
    [-2, 0],
    [-2, -1],
  ],
  "0>>3": [
    [0, 1],
    [-1, 1],
    [2, 0],
    [2, 1],
  ],
} as TetrominoRotationTestsBattery;

const SRS_I_TESTS = {
  "0>>1": [
    [0, -2],
    [0, 1],
    [1, -2],
    [-2, 1],
  ],
  "1>>0": [
    [0, 2],
    [0, -1],
    [-1, 2],
    [2, -1],
  ],
  "1>>2": [
    [0, -1],
    [0, 2],
    [-2, -1],
    [1, 2],
  ],
  "2>>1": [
    [0, 1],
    [0, -2],
    [2, 1],
    [-1, -2],
  ],
  "2>>3": [
    [0, 2],
    [0, -1],
    [-1, 2],
    [2, -1],
  ],
  "3>>2": [
    [0, -2],
    [0, 1],
    [1, -2],
    [-2, 1],
  ],
  "3>>0": [
    [0, 1],
    [0, -2],
    [2, 1],
    [-1, -2],
  ],
  "0>>3": [
    [0, -1],
    [0, 2],
    [-2, -1],
    [1, 2],
  ],
} as TetrominoRotationTestsBattery;

export const SRS_ROTATION_TESTS = {
  I: SRS_I_TESTS,
  T: SRS_BASIC_TESTS,
  S: SRS_BASIC_TESTS,
  Z: SRS_BASIC_TESTS,
  J: SRS_BASIC_TESTS,
  L: SRS_BASIC_TESTS,
} as TetrominoRotationTests;

export const TETROMINO_COLORS = {
  I: "#0BFBFD",
  O: "#FFFF54",
  T: "#8C1AF5",
  S: "#75FB4C",
  Z: "#EA3323",
  J: "#0000FF",
  L: "#F3AE3D",
};

export const SCORES = {
  SOFT_DROP: 1,
  HARD_DROP: 2,
  1: 100,
  2: 300,
  3: 500,
  4: 800,
} as { [key in any]: number };

export const PROGRESS_BY_CLEARS = {
  1: 1,
  2: 3,
  3: 5,
  4: 8,
} as { [key in number]: number };

export const EMPTY_DISPLAY_CELLS_3x3 = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const EMPTY_DISPLAY_CELLS_4x3 = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];
