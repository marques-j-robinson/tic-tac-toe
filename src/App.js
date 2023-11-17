import { useState } from 'react';

import Board from './Components/Board.jsx'
import MoveList from './Components/MoveList.jsx'

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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [locations, setLocations] = useState([])
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function isDraw() {
    return history.length === 10
  }
  function addLocation(boardId) {
      setLocations([...locations, locationMappings[boardId]])
      console.log(locations)
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} addLocation={addLocation} onPlay={handlePlay} isDraw={isDraw} />
      </div>
      <div className="game-info">
        <MoveList history={history} currentMove={currentMove} jumpTo={setCurrentMove} locations={locations} />
      </div>
    </div>
  );
}
