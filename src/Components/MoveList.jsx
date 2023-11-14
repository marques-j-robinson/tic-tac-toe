function MoveListItem({move, jumpTo}) {
  let description;
  if (move > 0) {
    description = 'Go to move #' + move;
  } else {
    description = 'Go to game start';
  }
  return <button onClick={() => jumpTo(move)}>{description}</button>
}

export default function MoveList({history, jumpTo}) {
  return <ol>{history.map((square, move) => (
    <li key={move}>
      <MoveListItem move={move} jumpTo={jumpTo} />
    </li>
  ))}</ol>
}