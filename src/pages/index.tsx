import React from "react";
import { TetrisProvider } from "@/hooks/useTetris";
import Tetris from "@/components/Tetris/Tetris";
import { setup } from "@/lib/csrf";

const TetrisPage = () => {
  return (
    <TetrisProvider>
      <Tetris />
    </TetrisProvider>
  );
};

export const getServerSideProps = setup(async () => {
  return { props: {} };
});

export default TetrisPage;
