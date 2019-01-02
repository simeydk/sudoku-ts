import * as React from 'react';
import GameCell from 'src/game/Cell';

const Cell = (cell:GameCell, j:number) => {
    const content = cell.isEmpty ? <span className = "game-possiblevalues" >{cell.possibleValues.join(' ')}</span> :         <input className="game-input" value={cell.value === 0 ? '' : cell.value} disabled={true} /> 
    return <td className="game-cell" key={j}>
        {content}
    </td>;
}

export default Cell