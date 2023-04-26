import React, { useState } from "react";
import { useTetrisActions, useTetris } from "@/hooks/useTetris";
import { GameOverContainer, NameInput, SubmitScoreButton, StatusText } from "./styles";

const GameOver = (): JSX.Element => {
  const gameState = useTetris();
  const { setScoreId } = useTetrisActions();
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmitScore = async () => {
    if (name.length > 0) {
      setStatus("Loading");
      const score = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: gameState.score, name }),
      });
      setStatus("Submitted");
      setScoreId((await score.json())[0].id);
    }
  };

  return (
    <GameOverContainer>
      <h1>Game Over!</h1>
      <h3>Score</h3>
      <h2>{gameState.score}</h2>
      {status === "Loading" ? (
        <StatusText>Submitting...</StatusText>
      ) : status === "Submitted" ? (
        <StatusText>Submitted!</StatusText>
      ) : (
        <>
          <NameInput
            maxLength={10}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          <SubmitScoreButton onClick={handleSubmitScore}>
            Submit your score
          </SubmitScoreButton>
        </>
      )}
    </GameOverContainer>
  );
};

export default GameOver;
