import {useState} from 'react'
import Board from './Board.jsx'
import GameInfo from './GameInfo.jsx'

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [locations, setLocations] = useState([])
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

  function addMoveLocation(newLocation) {
    if (!locations[currentMove]) {
      setLocations([...locations, newLocation])
      return
    }
    locations[currentMove] = newLocation
    setLocations([...locations])
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          addMoveLocation={addMoveLocation}
        />
      </div>
      <GameInfo history={history} locations={locations} currentMove={currentMove} jumpTo={jumpTo} />
    </div>
  )
}