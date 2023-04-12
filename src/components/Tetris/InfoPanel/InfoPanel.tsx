import dynamic from "next/dynamic";
import React from "react";
import { useTetris } from "@/hooks/useTetris";
import {
  Key,
  HideIf,
  Center,
  NextRow,
  NextCell,
  Container,
  ControlRow,
  ScoreNumber,
  NextContainer,
  ControlsContainer,
} from "./styles";
import { isTetriminoInPosition } from "@/helpers/tetris.helpers";
import {
  ROTATION_MATRIX,
  EMPTY_DISPLAY_CELLS_3x3,
  EMPTY_DISPLAY_CELLS_4x3,
} from "@/helpers/tetris.constants";

const CellNoSSR = dynamic(() => import("@/components/Tetris/BoardCells/Cell/Cell"), {
  ssr: false,
});

const InfoPanel = (): JSX.Element => {
  const gameState = useTetris();

  const EmptyDisplayCells =
    gameState.nextTetrominos[0] === "I" || gameState.nextTetrominos[0] === "O"
      ? EMPTY_DISPLAY_CELLS_4x3
      : EMPTY_DISPLAY_CELLS_3x3;

  return (
    <Container>
      <HideIf hide={!gameState.started || gameState.gameOver}>
        <h2>Next</h2>
        <Center>
          <NextContainer
            shrink={
              gameState.nextTetrominos[0] !== "I" &&
              gameState.nextTetrominos[0] !== "O"
            }
          >
            {EmptyDisplayCells.map((row, rowIndex) => {
              return (
                <NextRow key={`next-tetromino-row-${rowIndex}`}>
                  {row.map((col, colIndex) => {
                    return (
                      <NextCell
                        key={`next-tetromino-cell-${rowIndex}-${colIndex}`}
                      >
                        {isTetriminoInPosition(
                          [
                            {
                              row: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][0][0][0],
                              col: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][0][0][1],
                            },
                            {
                              row: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][1][0][0],
                              col: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][1][0][1],
                            },
                            {
                              row: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][2][0][0],
                              col: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][2][0][1],
                            },
                            {
                              row: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][3][0][0],
                              col: ROTATION_MATRIX[
                                gameState.nextTetrominos[0]
                              ][3][0][1],
                            },
                          ],
                          {
                            row: rowIndex,
                            col: colIndex,
                          }
                        ) && (
                          <CellNoSSR tetromino={gameState.nextTetrominos[0]} />
                        )}
                      </NextCell>
                    );
                  })}
                </NextRow>
              );
            })}
          </NextContainer>
        </Center>
      </HideIf>
      <HideIf hide={!gameState.started || gameState.gameOver}>
        <h2>Level</h2>
        <ScoreNumber>{gameState.level}</ScoreNumber>
      </HideIf>
      <HideIf hide={!gameState.started || gameState.gameOver}>
        <h2>Score</h2>
        <ScoreNumber>{gameState.score}</ScoreNumber>
      </HideIf>
      <ControlsContainer>
        <h2>Controls</h2>
        <ControlRow>
          <h4>Rotate</h4>
          <Center>
            <Key>Z</Key>
            <Key>X</Key>
          </Center>
        </ControlRow>
        <ControlRow>
          <h4>Move</h4>
          <Center>
            <Key>←</Key>
            <Key>→</Key>
          </Center>
        </ControlRow>
        <ControlRow>
          <h4>Fast Drop</h4>
          <Key>↓</Key>
        </ControlRow>
        <ControlRow>
          <h4>Hard Drop</h4>
          <Key>↑</Key>
        </ControlRow>
      </ControlsContainer>
    </Container>
  );
};

export default InfoPanel;
