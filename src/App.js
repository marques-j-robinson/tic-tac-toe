import {useState} from 'react'

function Square({ value, onSquareClick, isHighlight }) {
  return (
    <button className={`square ${isHighlight?'highlight':null}`} onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay, moveLocations, setMoveLocations }) {
  function handleClick(row, col) {
    const boardId = getBoardId(row, col)
    if (squares[boardId] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[boardId] = 'X'
    } else {
      nextSquares[boardId] = 'O'
    }
    setMoveLocations([...moveLocations, {row, col}])
    onPlay(nextSquares)
  }

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

  const boardIds = [0, 1, 2]
  return <>
    <div className="status">{status}</div>
    {boardIds.map(rowId => {
      return (
        <div key={rowId} className="board-row">
          {boardIds.map(colId => (
            <Square
              key={colId}
              value={squares[getBoardId(rowId, colId)]}
              onSquareClick={() => handleClick(rowId, colId)}
              isHighlight={victoryLines && victoryLines.includes(getBoardId(rowId, colId))}
            />
          ))}
        </div>
      )
    })}
  </>;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [moveOrder, setMoveOrder] = useState(true)
  const [moveLocations, setMoveLocations] = useState([])
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function toggleMoveOrder() {
    setMoveOrder(!moveOrder)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move === currentMove) {
      description = 'You are at move #' + move
    } else if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {move === currentMove ? <span>{description}</span> : <button onClick={() => jumpTo(move)}>{description}</button>}
        <span>{!moveLocations[move] ? null : `(${moveLocations[move].row}, ${moveLocations[move].col})`}</span>
      </li>
    )
  })
  
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          moveLocations={moveLocations}
          setMoveLocations={setMoveLocations}
        />
      </div>
      <div className="game-info">
        <div>
          <button onClick={toggleMoveOrder}>Toggle Move Order</button>
          <span>{moveOrder?'ASC':'DESC'}</span>
        </div>
        <ol>{moveOrder?moves:moves.reverse()}</ol>
      </div>
    </div>
  )
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