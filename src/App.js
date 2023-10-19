import {useState, useEffect} from 'react'
import GamesList from './Components/GamesList.jsx'

export default function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  return <>
    <GamesList games={games} />
  </>
}