import Square from './Square.jsx'

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], linesIdx: i};
    }
  }
  return null;
}

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const isGameOver = calculateWinner(squares);
  let status;
  let victoryLines
  if (isGameOver) {
    const {winner, linesIdx} = isGameOver
    status = "Winner: " + winner;
    victoryLines = lines[linesIdx]
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="game-board-items">
        {squares.map((_, i) => <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          highlight={victoryLines && victoryLines.includes(i)}
        />)}
      </div>
    </>
  );
}
