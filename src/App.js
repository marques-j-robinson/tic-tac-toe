import {useState} from 'react'

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rows = [0, 3, 6]
  return <>
    <div className="status">{status}</div>
    {rows.map(row => (
        <div key={row} className="board-row">
          {rows.map((col, colId) => (
            <Square key={colId} value={squares[colId+row]} onSquareClick={() => handleClick(colId+row)} />
          ))}
        </div>
      )
    )}
  </>;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [moveOrder, setMoveOrder] = useState(true)
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
      </li>
    )
  })
  
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
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
      return squares[a];
    }
  }
  return null;
}