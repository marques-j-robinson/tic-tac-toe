export default function GamesList({ games, handleRemoveGame, handleDisplayGame }) {
    return <>
        <ul>
            {games.map(game => {
                return (
                    <li key={game.game_id} className="game-list-item">
                        <button onClick={() => handleRemoveGame(game.game_id)}>Remove</button>
                        <button onClick={() => handleDisplayGame(game.game_id)}>View</button>
                        <p>{game.name || game.created_at}</p>
                    </li>
                )
            })} 
        </ul>
    </>
}