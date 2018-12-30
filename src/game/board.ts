import Cell from './Cell';
import ConstrainedSet from './constrainedSet';
import ISettable from './ISettable';

class Board {

    public cells : Cell[] = []
    public rows : ConstrainedSet[] = []
    public columns : ConstrainedSet[] = []
    public blocks : ConstrainedSet[] = []

    constructor() {
        this.setupStructure()
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

    private setupStructure(board: Board = this) {
        
        board.cells = Array(81)
            .fill('')
            .map((x, i) => new Cell(undefined, undefined, i))

        board.rows = Array(9)
            .fill('')
            .map((x, i) => new ConstrainedSet(false))
        board.columns = Array(9)
            .fill('')
            .map((x, i) => new ConstrainedSet(false))
        board.blocks = Array(9)
            .fill('')
            .map((x, i) => new ConstrainedSet(false))

        board
            .cells
            .forEach((cell, i) => {
                const rowNum = Math.floor(i / 9)
                const colNum = i % 9
                const blkNum = Math.floor(rowNum / 3) * 3 + Math.floor(colNum / 3)

                board
                    .rows[rowNum]
                    .cells
                    .push(cell)

                board
                    .columns[colNum]
                    .cells
                    .push(cell)

                board
                    .blocks[blkNum]
                    .cells
                    .push(cell)

            })

    }

}

export default Board;