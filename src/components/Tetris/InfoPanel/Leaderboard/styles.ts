import styled from "styled-components";

export const LeaderboardContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 100%;
`;

export const ScoresContainer = styled.div`
  background-color: black;
  overflow-y: scroll;
  border: 1px solid #6473ff;
  padding: 10px;
  flex: 1;
`;

export const ScoreRow = styled.div<{ isHighlighted?: boolean; key: string }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isHighlighted ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  margin: ${(props) => (props.isHighlighted ? "0px -10px" : "0px")};
  padding: ${(props) => (props.isHighlighted ? "0 10px" : "0")};
`;
