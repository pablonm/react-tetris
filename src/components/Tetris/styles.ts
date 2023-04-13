import styled from "styled-components";

export const Layout = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  height: 100vh;
  gap: 20px;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const BoardContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: right;
  position: relative;
`;

export const Board = styled.div`
  height: 100%;
  border: 2px solid #6473ff;
  width: calc(100vh / 20 * 10);
`;

export const RightSideContainer = styled.div`
  height: 100%;
  text-align: left;
`;

export const RightSide = styled.div`
  color: #6473ff;
  height: 100%;
  border: 2px solid #6473ff;
  width: calc(100vh / 20 * 6);
  position: relative;
`;

export const BlueBackground = styled.div`
  background-color: #6473ff;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const StartGameContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  > div {
    text-align: center;
  }
`;

export const PlayButton = styled.div`
  border: 1px solid #6473ff;
  color: #6473ff;
  background-color: transparent;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  width: fit-content;

  &:hover {
    background-color: #6473ff;
    color: black;
  }
`;

export const NoMobile = styled.div`
  margin-top: 50px;
`;
