import {useState, useEffect} from 'react'
import GamesList from './Components/GamesList.jsx'
import Game from './Components/Game.jsx'

export default function Home() {
  const [games, setGames] = useState([])
  const [playing, setPlaying] = useState(false)

  function getAllGames() {
    fetch('http://localhost:5000/games')
      .then(res => res.json())
      .then(({data}) => setGames(data.games))
  }

  useEffect(() => {
      getAllGames()
  }, [])

  async function handleCreateNewGame(e) {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/game', { method: 'POST' })
    const {success, data} = await res.json()
    if (success) {
      const {id} = data
      setPlaying(true)
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
      <GamesList games={games} handleRemoveGame={handleRemoveGame} />
    </>
  }

  const GameDisplay = () => {
    return <>
        <button onClick={handleDisplayHome}>Home</button>
        <Game />
    </>
  }

  return <>
    {playing
    ? <GameDisplay />
    : <HomeDisplay />}
  </>
}
