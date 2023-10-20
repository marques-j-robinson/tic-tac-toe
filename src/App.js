import {useState, useEffect} from 'react'
import GamesList from './Components/GamesList.jsx'
import Game from './Components/Game.jsx'

export default function Home() {
  const [games, setGames] = useState([])
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/games')
      .then(res => res.json())
      .then(({data}) => setGames(data.games))
  }, [])

  function handleCreateNewGame(e) {
    e.preventDefault()
    fetch('http://localhost:5000/game', { method: 'POST' })
    .then(res => res.json())
    .then(({success, data}) => {
      if (success) {
        const {id} = data
        setPlaying(true)
      }
    })
  }
  
  function handleRemoveGame(id) {
      fetch(`http://localhost:5000/game/${id}`, {method: "DELETE"})
  }

  const HomeDisplay = () => {
    return <>
      <button onClick={handleCreateNewGame}>Create New Game</button>
      <GamesList games={games} handleRemoveGame={handleRemoveGame} />
    </>
  }
  
  return <>
    {playing
    ? <Game />
    : <HomeDisplay />}
  </>
}