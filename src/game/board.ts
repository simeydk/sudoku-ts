import Cell from './Cell';
import ConstrainedSet from './constrainedSet';
import constructBoard from './constructBoard';
import ISettable from './ISettable';

class Board {

    public cells : Cell[] = []
    public rows : ConstrainedSet[] = []
    public columns : ConstrainedSet[] = []
    public blocks : ConstrainedSet[] = []

    constructor() {
        constructBoard(this)
    }

    get constrainedSets(): ConstrainedSet[] {
        return [...this.rows,...this.columns,...this.blocks]
    }

    get settablesFromConstrainedSets(): ISettable[] {
        return this.constrainedSets.map(cs => cs.settableCells).reduce((a,b) => [...a,...b])
    }

    get settablesFromCells(): ISettable[] {
        return this.cells.map(cell => cell.settable).reduce((a,b) => [...a,...b])
    }

    get settables(): ISettable[] {
        return [...this.settablesFromCells, ...this.settablesFromConstrainedSets]
    }

    public toValueString(zero = '.', colDelim = '', rowDelim = '\n'): string {
        return this.rows.map(row => {
            return row.cells.map(cell => (cell.value === 0) ? zero : cell.value).join(colDelim)
        }).join(rowDelim)
    }

}

export default Board;