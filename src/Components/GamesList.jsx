export default function GamesList({ games }) {
    return <>
        <ul>
            {games.map(game => {
                return (
                    <li key={game.game_id}>{game.name}</li>
                )
            })} 
        </ul>
    </>
}