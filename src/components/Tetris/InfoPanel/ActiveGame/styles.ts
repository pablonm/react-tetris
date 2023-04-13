import styled from "styled-components";

export const Container = styled.div`
  z-index: 1;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const NextContainer = styled.div<{ shrink: boolean }>`
  margin-top: 20px;
  width: ${(prop) => (prop.shrink ? "75%" : "100%")};
`;

export const NextRow = styled.div`
  display: flex;
  flex: 1;
`;

export const NextCell = styled.div`
  text-align: center;
  flex: 1;
  aspect-ratio: 1 / 1;
`;

export const ScoreNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const LevelNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
