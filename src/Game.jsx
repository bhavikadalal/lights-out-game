import React, { useState } from "react";
import Grid from "./Grid";

// Helper: generate a solvable starting board
function generateSolvableBoard() {
  let board = Array(25).fill(false);
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * 25);
    const row = Math.floor(randomIndex / 5);
    const col = randomIndex % 5;

    function flip(r, c) {
      if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        const i = r * 5 + c;
        board[i] = !board[i];
      }
    }

    flip(row, col);       // self
    flip(row - 1, col);   // up
    flip(row + 1, col);   // down
    flip(row, col - 1);   // left
    flip(row, col + 1);   // right
  }
  return board;
}

export default function Game() {
  const initialLights = generateSolvableBoard();
  const [lights, setLights] = useState(initialLights);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState([initialLights]);
  const [hintIndex, setHintIndex] = useState(null);

  function checkWin(lightsArray) {
    return lightsArray.every(light => light === false);
  }

  function toggleLight(index) {
    const newLights = [...lights];
    const row = Math.floor(index / 5);
    const col = index % 5;

    function flip(r, c) {
      if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        const i = r * 5 + c;
        newLights[i] = !newLights[i];
      }
    }

    flip(row, col);
    flip(row - 1, col);
    flip(row + 1, col);
    flip(row, col - 1);
    flip(row, col + 1);

    setLights(newLights);
    setMoves(moves + 1);
    setHistory([...history, newLights]);
    setHintIndex(null); // clear hint after a move
  }

  // Undo last move
  function undoMove() {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setLights(newHistory[newHistory.length - 1]);
      setMoves(moves - 1);
      setHintIndex(null);
    }
  }

  // Reset/New Game
  function resetGame() {
    const newBoard = generateSolvableBoard();
    setLights(newBoard);
    setMoves(0);
    setHistory([newBoard]);
    setHintIndex(null);
  }

  // Show a hint (highlight one lit square)
  function showHint() {
    const litIndices = lights
      .map((isLit, idx) => (isLit ? idx : null))
      .filter(idx => idx !== null);

    if (litIndices.length > 0) {
      const randomLit = litIndices[Math.floor(Math.random() * litIndices.length)];
      setHintIndex(randomLit);
    }
  }

  const hasWon = checkWin(lights);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Lights Out</h1>
      <Grid lights={lights} onLightClick={toggleLight} hintIndex={hintIndex} />
      <p style={{ fontWeight: "bold", marginTop: "10px" }}>
        {hasWon ? "🎉 You Win!" : `Moves: ${moves}`}
      </p>
      {/* Three buttons */}
      <button onClick={resetGame} style={{ margin: "5px" }}>
        New Game
      </button>
      <button onClick={showHint} style={{ margin: "5px" }}>
        Help
      </button>
      <button onClick={undoMove} disabled={history.length <= 1} style={{ margin: "5px" }}>
        Undo
      </button>
    </div>
  );
}
