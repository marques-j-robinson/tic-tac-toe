export default function Square({value, onSquareClick, highlight}) {
  return <button className={`square ${highlight?'highlight':null}`} onClick={onSquareClick}>
    {value}
  </button>;
}
