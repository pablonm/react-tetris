import styled from "styled-components";

export const ContainerDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const RowDiv = styled.div<{ children: any, key: string }>`
  display: flex;
  flex: 1;
`;

export const CellDiv = styled.div<{ children: any, key: string }>`
  text-align: center;
  flex: 1;
`;
