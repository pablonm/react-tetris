import styled from "styled-components";

export const GameOverContainer = styled.div`
  color: #6473ff;
  margin-bottom: 60px;

  > h1 {
    margin-bottom: 40px;
  }
`;

export const NameInput = styled.input`
  width: 200px;
  border: 1px solid #6473ff;
  background-color: black;
  color: #6473ff;
  padding: 10px;
  margin: 20px 0 10px 0;
  outline: none !important;

  ::placeholder {
    font-family: "Kanit";
    font-style: italic;
    color: #6473ff;
    opacity: 0.5;
  }

  ::focus-visible {
  }
`;

export const SubmitScoreButton = styled.div`
  margin: auto;
  border: 1px solid #6473ff;
  color: #6473ff;
  background-color: transparent;
  padding: 2px 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  width: 200px;

  &:hover {
    background-color: #6473ff;
    color: black;
  }
`;

export const StatusText = styled.div`
  margin: 10px 0;
`;
