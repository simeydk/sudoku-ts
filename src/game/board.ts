import Cell from './Cell';
import ConstrainedSet from './constrainedSet';

class Board {

    public cells : Cell[] = []
    public rows : ConstrainedSet[] = []
    public columns : ConstrainedSet[] = []
    public blocks : ConstrainedSet[] = []

    constructor() {
        this.populateInitial()
    }

    private populateInitial() {
        
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

}

export default Board;