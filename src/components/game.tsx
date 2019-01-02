import * as React from 'react';
import Board from 'src/game/board';
import Cell from './Cell';
import './Game.css'

const Game = (props: {board:Board}) => {
    const {board} = props
    return <div>
        <table className="game-table">
            <tbody className="game-tbody">
                {board.rows
                    .map((row, i) => <tr className="game-row" key={i}>
                        {row.cells.map(Cell)}
                    </tr>)}
            </tbody>
        </table>
        <div className = "workings-wrapper">
            {board.constrainedSets.map((cs,i) => {
                return (
                    <div key={i} className="workings-div">
                        <table key={i} className="workings-table">
                            <tbody>
                                {cs.emptyCells.map((cell,ix) => <tr key={ix}>
                                    {cell.canBe.map((x,j) => <td key={j} >{x ? 1 : "."}</td> )}
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                )
            })}        
        </div>
    </div>;
}

export default Game