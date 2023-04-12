import styled from "styled-components";

type CellContainerProps = {
  cellColor: string;
  isEmpty?: boolean;
  isProjection?: boolean;
};

type CellInnerProps = {
  cellColor: string;
  isEmpty?: boolean;
  isProjection?: boolean;
};

export const CellContainer = styled.div<CellContainerProps>`
  border: 1px solid ${(props) => props.cellColor};
  color: ${(props) => props.cellColor};
  opacity: ${(props) => (props.isEmpty ? 0 : props.isProjection ? 0.4 : 1)};
  height: 100%;
  padding: 20%;
  text-align: center;
  flex: 1;
`;

export const CellInner = styled.div<CellInnerProps>`
  background-color: ${(props) => props.cellColor};
  opacity: ${(props) => (props.isEmpty ? 0 : props.isProjection ? 0.4 : 1)};
  width: 100%;
  height: 100%;
`;
