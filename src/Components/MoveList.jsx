import { useState } from 'react'

function MoveListButton({move, jumpTo}) {
  let description;
  if (move > 0) {
    description = 'Go to move #' + move;
  } else {
    description = 'Go to game start';
  }
  return <button onClick={() => jumpTo(move)}>{description}</button>
}

export default function MoveList({history, currentMove, jumpTo}) {
  const [ascOrder, setAscOrder] = useState(true)

  const moves = history.map((square, move) => (
    <li key={move}>
      {move === currentMove
        ? <span>You are at move #{move}</span>
        : <MoveListButton move={move} jumpTo={jumpTo} />
      }
    </li>
  ))

  return <>
    <button onClick={() => setAscOrder(!ascOrder)}>Toggle Order</button>
    <ul>{ascOrder?moves:moves.reverse()}</ul>
  </>
}