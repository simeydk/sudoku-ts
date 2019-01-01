import * as React from 'react';
import Board from 'src/game/board';
import './Game.css'

const Game = (props: {board:Board}) => <div>
    <table className="game-table">
        <tbody className="game-tbody">
            {Array(9)
                .fill('')
                .map((x, i) => <tr className="game-row" key={i}>
                    {Array(9)
                        .fill('')
                        .map((y, j) => <td className="game-cell" key={j}>
                            <input className="game-input" value={i * 9 + j + 1} disabled={true} />
                        </td>)}
                </tr>)}
        </tbody>
    </table>
</div>

export default Game