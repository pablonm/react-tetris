import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const InfoPanelContainer = styled.div`
  color: #6473ff;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  text-align: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  height: 70%;
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
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;
`;

export const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
