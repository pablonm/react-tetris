import React, { useEffect } from "react";
import useSound from "use-sound";
import { Kanit } from "@next/font/google";
import Sound from "react-sound";
import { isMobile } from "react-device-detect";

import { useTetrisActions, useTetris } from "@/hooks/useTetris";
import {
  Layout,
  Board,
  Center,
  NoMobile,
  RightSide,
  PlayButton,
  BoardContainer,
  StartGameContainer,
  RightSideContainer,
  BlueBackground,
} from "./styles";
import BoardCells from "@/components/Tetris/BoardCells/BoardCells";
import InfoPanel from "@/components/Tetris/InfoPanel/InfoPanel";
import GameOver from "@/components/Tetris/GameOver/GameOver";

const kanit = Kanit({ subsets: ["latin"], weight: "400" });

let pressedKeys: { [key in string]: boolean } = {};
let moveCooldown = false;
let moveCooldownTimeout: NodeJS.Timeout;
const INPUT_INTERVAL = 50;
const MOVE_COOLDOWN = 200;

const Tetris = (): JSX.Element => {
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
    let interval = setInterval(() => {
      if (pressedKeys["ArrowLeft"] && !moveCooldown) move("left");
      if (pressedKeys["ArrowRight"] && !moveCooldown) move("right");
    }, INPUT_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [rotate, start, move, fastDrop, hardDrop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" && !e.repeat) start();
      if (e.code === "ArrowLeft" && !e.repeat) {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = true;
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false;
        }, MOVE_COOLDOWN);
        move("left");
      }
      if (e.code === "ArrowRight" && !e.repeat) {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = true;
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false;
        }, MOVE_COOLDOWN);
        move("right");
      }
      if (e.code === "KeyZ" && !e.repeat) rotate("left");
      if (e.code === "KeyX" && !e.repeat) rotate("right");
      if (e.code === "ArrowDown") fastDrop(true);
      if (e.code === "ArrowUp" && !e.repeat) hardDrop();
      pressedKeys[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys[e.code] = false;
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = false;
      }
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

  if (isMobile)
    return (
      <Layout className={kanit.className}>
        <NoMobile>
          <div>Sorry, this game only works on desktop</div>
        </NoMobile>
      </Layout>
    );

  return (
    <Layout className={kanit.className}>
      <BoardContainer>
        <Board>
          {!gameState.started ? (
            <StartGameContainer>
              <BlueBackground />
              {gameState.gameOver && <GameOver />}
              <Center>
                <PlayButton onClick={handleStartClick}>
                  {gameState.gameOver ? "Play Again" : "Play"}
                </PlayButton>
              </Center>
            </StartGameContainer>
          ) : (
            <>
              <Sound
                url="/sfx/BGM.mp3"
                playStatus={"PLAYING"}
                loop
                volume={20}
              />
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
