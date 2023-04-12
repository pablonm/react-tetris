import dynamic from 'next/dynamic'
import { useTetris } from "@/hooks/useTetris";
import { HIDDEN_ROWS } from "@/helpers/tetris.constants";
import { isTetriminoInPosition } from "@/helpers/tetris.helpers";
import { ContainerDiv, RowDiv, CellDiv } from "./styles";

const CellNoSSR = dynamic(() => import("@/components/Tetris/BoardCells/Cell/Cell"), {
  ssr: false,
});

const BoardCells = (): JSX.Element => {
  const gameState = useTetris();

  return (
    <ContainerDiv>
      {gameState.placedTetrominos.map((row, rowIndex) => {
        if (rowIndex < HIDDEN_ROWS) return;
        return (
          <RowDiv key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => {
              const point = { row: rowIndex, col: colIndex } as BoardPoint;
              if (
                isTetriminoInPosition(gameState.activeTetromino.position, point)
              ) {
                return (
                  <CellDiv key={`active-tetromino-${rowIndex}-${colIndex}`}>
                    <CellNoSSR tetromino={gameState.activeTetromino.type} />
                  </CellDiv>
                );
              } else {
                if (
                  isTetriminoInPosition(
                    gameState.activeTetromino.projectedPlacePosition,
                    point
                  )
                ) {
                  return (
                    <CellDiv
                      key={`projected-place-position-${rowIndex}-${colIndex}`}
                    >
                      <CellNoSSR
                        tetromino={gameState.activeTetromino.type}
                        isProjection
                      />
                    </CellDiv>
                  );
                } else {
                  return (
                    <CellDiv key={`cell-${rowIndex}-${colIndex}`}>
                      <CellNoSSR tetromino={cell.tetromino} />
                    </CellDiv>
                  );
                }
              }
            })}
          </RowDiv>
        );
      })}
    </ContainerDiv>
  );
};

export default BoardCells;
