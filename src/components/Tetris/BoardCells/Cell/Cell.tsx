import React from "react";
import { TETROMINO_COLORS } from "@/helpers/tetris.constants";
import { CellContainer, CellInner } from "./styles";

type CellProps = {
  tetromino: Tetromino | null;
  isProjection?: boolean;
};

const Cell = ({ tetromino, isProjection }: CellProps): JSX.Element => {
  const color = tetromino ? TETROMINO_COLORS[tetromino] : "#b0b0ae";
  return (
    <CellContainer
      cellColor={color}
      isEmpty={!tetromino}
      isProjection={isProjection}
    >
      <CellInner
        cellColor={color}
        isEmpty={!tetromino}
        isProjection={isProjection}
      />
    </CellContainer>
  );
};

export default Cell;
