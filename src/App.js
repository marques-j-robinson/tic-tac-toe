import {useState, useEffect} from 'react'
import GamesList from './Components/GamesList.jsx'

export default function Home() {
  const [games, setGames] = useState([])
  const [errorMsg, setErrorMsg] = useState("")
  const [newName, setNewName] = useState("")

  useEffect(() => {
    fetch('http://localhost:5000/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  function handleCreateNewGame(e) {
    e.preventDefault()
    fetch('http://localhost:5000/games', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({name: newName}),
    }).then(res => res.json())
    .then(({success, games:newGames, msg}) => {
      if (success) {
        setGames(newGames)
        setNewName("")
        setErrorMsg(null)
      }
      if (!success) {
        setErrorMsg(msg)
      }
    })
  }
  
  function handleRemoveGame(gameId) {
      fetch(`http://localhost:5000/game/${gameId}`, {method: "DELETE"})
        .then(res => res.json())
        .then(({success, games:newGames, msg}) => {
          if (success) {
            setGames(newGames)
            setErrorMsg(null)
          }
          if (!success) setErrorMsg(msg)
        })
  }


  return <>
    {errorMsg ? <p className="error">{errorMsg}</p> : null}
    <input placeholder='New Game Name' value={newName} onChange={e => setNewName(e.target.value)} />
    <button onClick={handleCreateNewGame}>Create New Game</button>
    <GamesList games={games} handleRemoveGame={handleRemoveGame} />
  </>
}