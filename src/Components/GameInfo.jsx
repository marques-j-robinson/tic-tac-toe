import {useState} from 'react'

export default function GameInfo({ history, locations, currentMove, jumpTo }) {
  const [moveOrder, setMoveOrder] = useState(true)

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
        <span>{move===0 || !locations[move-1] ? null : `(${locations[move-1].row}, ${locations[move-1].col})`}</span>
      </li>
    )
  })
  
  return <div className="game-info">
    <div>
      <button onClick={toggleMoveOrder}>Toggle Move Order</button>
      <span>{moveOrder?'ASC':'DESC'}</span>
    </div>
    <ol>{moveOrder?moves:moves.reverse()}</ol>
  </div>
}