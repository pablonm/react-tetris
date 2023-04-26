import React from "react";
import { TetrisProvider } from "@/hooks/useTetris";
import Tetris from "@/components/Tetris/Tetris";

const TetrisPage = () => {
  return (
    <TetrisProvider>
      <Tetris />
    </TetrisProvider>
  );
};

export default TetrisPage;
