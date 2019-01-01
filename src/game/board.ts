import Cell from './Cell';
import ConstrainedSet from './constrainedSet';
import constructBoard from './constructBoard';
import ISettable from './ISettable';

class Board {

    public cells : Cell[] = []
    public rows : ConstrainedSet[] = []
    public columns : ConstrainedSet[] = []
    public blocks : ConstrainedSet[] = []

    private dirtyCells: Cell[] = []

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

    get completedCells() : Cell[] {
        return this.cells.filter(cell => cell.value !== 0)
    }

    get emptyCells() : Cell[] {
        return this.cells.filter(cell => cell.value === 0)
    }

    public toValueString(zero = '.', colDelim = '', rowDelim = '\n'): string {
        return this.rows.map(row => {
            return row.cells.map(cell => (cell.value === 0) ? zero : cell.value).join(colDelim)
        }).join(rowDelim)
    }
    public updateCanBe() {
        this.completedCells.forEach(cell => {
            cell.updateCanBe()
            cell.updateCanBeNeighbours()
        })
    }

    public applySettable(settable: ISettable) {
        const {cell,value} = settable
        if((this.cells.indexOf(cell) !== -1) && cell.isEmpty) {
            cell.value = value
            this.dirtyCells.push(cell)
        }
    }

    public applySettablesAll() {
        this.settables.forEach(s => this.applySettable(s))
    }

    get isComplete() {
        return this.emptyCells.length === 0
    }

    get isValid() {
        return this.constrainedSets.every(cs => cs.isValid)
    }

    get isWon() {
        return this.isComplete && this.isValid
    }

    public solve() {
        this.updateCanBe()
        while(!this.isComplete && this.isValid && this.settables.length > 0) {
            this.applySettablesAll()
            this.updateCanBe()
        }
    }


}

export default Board;