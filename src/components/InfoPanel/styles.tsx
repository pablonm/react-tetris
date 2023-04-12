import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Container = styled.div`
  color: #6473ff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  text-align: center;
  justify-content: space-between;
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

export const Key = styled.span`
  color: #6473ff;
  border: 1px solid #6473ff;
  border-radius: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-bottom-width: 3px;
  border-right-width: 2px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ScoreNumber = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

export const HideIf = styled.div<{hide: boolean}>`
  visibility: ${(prop) => (prop.hide ? "hidden" : "visible")};
  z-index: 99;
`