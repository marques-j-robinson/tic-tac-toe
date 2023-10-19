export default function Square({ value, onSquareClick, isHighlight }) {
  return (
    <button className={`square ${isHighlight?'highlight':null}`} onClick={onSquareClick}>
      {value}
    </button>
  )
}