import React, { useEffect, useState } from "react";
import { useTetris } from "@/hooks/useTetris";
import { LeaderboardContainer, ScoresContainer, ScoreRow } from "./styles";

const medals = {
  0: "🥇",
  1: "🥈",
  2: "🥉",
} as { [key in number]: string };

const Leaderboard = (): JSX.Element => {
  const gameState = useTetris();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scores = await fetch("/api/leaderboard");
      setScores(await scores.json());
    };
    fetchScores();
  }, [gameState.scoreId]);

  return (
    <LeaderboardContainer>
      <h2>Leaderboard</h2>
      <ScoresContainer>
        {scores.map((score: any, index) => (
          <ScoreRow
            isHighlighted={score.id === gameState.scoreId}
            key={score.id}
          >
            <div>
              {medals[index] && `${medals[index]} `}
              {score.name}
            </div>
            <div>{score.score}</div>
          </ScoreRow>
        ))}
      </ScoresContainer>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
