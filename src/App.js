import {useState, useEffect} from 'react'
import Game from './Components/Game.jsx'

export default function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/games')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [games])

  return <>
    <Game />
  </>
}