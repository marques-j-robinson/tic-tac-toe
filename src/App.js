import {useState, useEffect} from 'react'
import GamesList from './Components/GamesList.jsx'
import Game from './Components/Game.jsx'

export default function Home() {
  const [games, setGames] = useState([])
  const [playing, setPlaying] = useState(false)
  const [gameHistory, setGameHistory] = useState([])

  function getAllGames() {
    fetch('http://localhost:5000/games')
      .then(res => res.json())
      .then(({games}) => setGames(games))
  }

  useEffect(() => {
      getAllGames()
  }, [])

  async function getGameById(id) {
      const res = await fetch(`http://localhost:5000/game/${id}`)
      const json = await res.json()
      console.log(json.game.history)
      setGameHistory(json.game.history)
      setPlaying(true)
  }

  async function handleCreateNewGame(e) {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/game', { method: 'POST' })
    const {success, data} = await res.json()
    if (success) {
      const {id} = data
      setPlaying(true)
      await getGameById(id)
    }
  }

  async function handleDisplayHome() {
    setPlaying(false)
    await getAllGames()
  }

  async function handleRemoveGame(id) {
      await fetch(`http://localhost:5000/game/${id}`, {method: "DELETE"})
      await getAllGames()
  }

  const HomeDisplay = () => {
    return <>
      <button onClick={handleCreateNewGame}>Create New Game</button>
      <GamesList games={games} handleRemoveGame={handleRemoveGame} handleDisplayGame={getGameById} />
    </>
  }

  const GameDisplay = () => {
    return <>
        <button onClick={handleDisplayHome}>Home</button>
        <Game gameHistory={gameHistory} />
    </>
  }

  return <>
    {playing
    ? <GameDisplay />
    : <HomeDisplay />}
  </>
}
