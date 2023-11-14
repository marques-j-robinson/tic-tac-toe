import Square from './Square.jsx'

export default function Board({ xIsNext, squares, onPlay, addMoveLocation }) {
    console.log(squares)
  const winner = calculateWinner(squares);
  let status;
  let victoryLines;
  if (winner) {
    const [winnerValue, lines] = winner
    status = "Winner: " + winnerValue;
    victoryLines = lines
  } else if (isDraw(squares)) {
    status = "Game ends in a draw 🐱!"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function checkIsHighlight(boardId) {
    return victoryLines && victoryLines.includes(boardId)
  }

  function addMoveToBoard(boardId) {
    if (squares[boardId] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[boardId] = 'X'
    } else {
      nextSquares[boardId] = 'O'
    }
    onPlay(nextSquares)
  }

  function handleClick(row, col) {
    addMoveLocation({row, col})
    addMoveToBoard(getBoardId(row, col))
  }

  const boardIds = [0, 1, 2]
  return <>
    <div className="status">{status}</div>
    {boardIds.map(rowId => (
        <div key={rowId} className="board-row">
          {boardIds.map(colId => (
            <Square
              key={colId}
              value={squares[getBoardId(rowId, colId)]}
              onSquareClick={() => handleClick(rowId, colId)}
              isHighlight={checkIsHighlight(getBoardId(rowId, colId))}
            />
          ))}
        </div>
      )
    )}
  </>;
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}

function isDraw(squares) {
  for (let i = 0; i<9; i++) {
    if (!squares[i]) {
      return false
    }
  }
  return true
}

function getBoardId(row, col) {
  return row*3+col
}
