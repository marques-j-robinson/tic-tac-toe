import { useState } from 'react'

const locationMappings = [
    '0,0',
    '0,1',
    '0,2',
    '1,0',
    '1,1',
    '1,2',
    '2,0',
    '2,1',
    '2,2',
]

function MoveListButton({move, jumpTo}) {
  let description;
  if (move > 0) {
    description = 'Go to move #' + move;
  } else {
    description = 'Go to game start';
  }
  return <button onClick={() => jumpTo(move)}>{description}</button>
}

export default function MoveList({history, currentMove, jumpTo, locations}) {
  const [ascOrder, setAscOrder] = useState(true)

  const moves = history.map((square, move) => (
    <li key={move}>
      {move === currentMove
        ? <span>You are at move #{move}</span>
        : <MoveListButton move={move} jumpTo={jumpTo} />
      }
      {move !== 0 ? <span>&nbsp;({locationMappings[locations[move-1]]})</span> : null}
    </li>
  ))

  return <>
    <button onClick={() => setAscOrder(!ascOrder)}>Toggle Order</button>
    <ul>{ascOrder?moves:moves.reverse()}</ul>
  </>
}
