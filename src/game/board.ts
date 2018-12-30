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

    private setupStructure() {
        
        this.cells = Array(81)
            .fill('')
            .map((x, i) => new Cell(undefined, undefined, i))

        this.rows = Array(9)
            .fill('')
            .map((x, i) => new ConstrainedSet(false))
        this.columns = Array(9)
            .fill('')
            .map((x, i) => new ConstrainedSet(false))
        this.blocks = Array(9)
            .fill('')
            .map((x, i) => new ConstrainedSet(false))

        this
            .cells
            .forEach((cell, i) => {
                const rowNum = Math.floor(i / 9)
                const colNum = i % 9
                const blkNum = Math.floor(rowNum / 3) * 3 + Math.floor(colNum / 3)

                this
                    .rows[rowNum]
                    .cells
                    .push(cell)

                this
                    .columns[colNum]
                    .cells
                    .push(cell)

                this
                    .blocks[blkNum]
                    .cells
                    .push(cell)

            })

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

    get toValueString(): string {
        return this.rows.map(row => {
            row.cells.map(cell => cell.value).join('')
        }).join('\n')
    }

}

export default Board;