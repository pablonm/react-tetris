import React, { useEffect } from "react";
import useSound from "use-sound";
import { Kanit } from "@next/font/google";
import Sound from "react-sound";

import { useTetrisActions, useTetris } from "@/hooks/useTetris";
import {
  Layout,
  Board,
  Center,
  RightSide,
  PlayButton,
  BoardContainer,
  GameOverContainer,
  StartGameContainer,
  RightSideContainer,
  BlueBackground,
} from "./styles";
import BoardCells from "@/components/BoardCells/BoardCells";
import InfoPanel from "@/components/InfoPanel/InfoPanel";

const kanit = Kanit({ subsets: ["latin"], weight: "400" });

const Tetris = () => {
  const [playMoveSFX] = useSound("/sfx/move.wav", { volume: 0.25 });
  const [playRotateSFX] = useSound("/sfx/rotate.wav", { volume: 0.25 });
  const [playPlaceSFX] = useSound("/sfx/place.wav", { volume: 0.25 });
  const [playHardDropSFX] = useSound("/sfx/hard-drop.wav", { volume: 0.25 });
  const [playLineClearSFX] = useSound("/sfx/clear.wav", { volume: 0.25 });
  const [playGameOverSFX] = useSound("/sfx/game-over.wav", { volume: 0.25 });
  const [playSRSTrickSFX] = useSound("/sfx/srs-trick.wav", { volume: 0.25 });
  const [playTetrisSFX] = useSound("/sfx/tetris.wav", { volume: 0.25 });

  const gameState = useTetris();
  const { rotate, move, start, fastDrop, hardDrop, registerCallback } =
    useTetrisActions();

  useEffect(() => {
    registerCallback("onMove", () => {
      playMoveSFX();
    });
    registerCallback("onRotate", () => {
      playRotateSFX();
    });
    registerCallback("onHardDrop", () => {
      playHardDropSFX();
    });
    registerCallback("onPlace", () => {
      playPlaceSFX();
    });
    registerCallback("onClear", () => {
      playLineClearSFX();
    });
    registerCallback("onGameOver", () => {
      playGameOverSFX();
    });
    registerCallback("onSRSTrick", () => {
      playSRSTrickSFX();
    });
    registerCallback("onTetris", () => {
      playTetrisSFX();
    });
  }, [
    registerCallback,
    playHardDropSFX,
    playMoveSFX,
    playRotateSFX,
    playLineClearSFX,
    playGameOverSFX,
    playSRSTrickSFX,
    playTetrisSFX,
    playPlaceSFX,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" && !e.repeat) start();
      if (e.code === "ArrowLeft") move("left");
      if (e.code === "ArrowRight") move("right");
      if (e.code === "KeyZ" && !e.repeat) rotate("left");
      if (e.code === "KeyX" && !e.repeat) rotate("right");
      if (e.code === "ArrowDown") fastDrop(true);
      if (e.code === "ArrowUp" && !e.repeat) hardDrop();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") fastDrop(false);
    };
    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("keyup", handleKeyUp, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("keydown", handleKeyUp, false);
    };
  }, [rotate, start, move, fastDrop, hardDrop]);

  const handleStartClick = () => start();

  return (
    <Layout className={kanit.className}>
      <BoardContainer>
        <Board>
          {!gameState.started ? (
            <StartGameContainer>
              <BlueBackground />
              {gameState.gameOver && (
                <GameOverContainer>
                  <h1>Game Over!</h1>
                  <h3>Your Score</h3>
                  <h2>{gameState.score}</h2>
                </GameOverContainer>
              )}
              <Center>
                <PlayButton onClick={handleStartClick}>
                  {gameState.gameOver ? "Play Again" : "Play"}
                </PlayButton>
              </Center>
            </StartGameContainer>
          ) : (
            <>
              <Sound url="/sfx/BGM.mp3" playStatus={"PLAYING"} loop volume={20} />
              <BoardCells />
            </>
          )}
        </Board>
      </BoardContainer>
      <RightSideContainer>
        <RightSide>
          <BlueBackground />
          <InfoPanel />
        </RightSide>
      </RightSideContainer>
    </Layout>
  );
};

export default Tetris;