export default function GamesList({ games, handleRemoveGame }) {
    return <>
        <ul>
            {games.map(game => {
                return (
                    <li key={game.game_id} className="game-list-item">
                        <button onClick={() => handleRemoveGame(game.game_id)}>Remove</button>
                        <p>{game.name}</p>
                    </li>
                )
            })} 
        </ul>
    </>
}