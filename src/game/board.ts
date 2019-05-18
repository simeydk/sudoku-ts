import boardFromString from './boardFromString';
import Cell from './Cell';
import ConstrainedSet from './constrainedSet';
import constructBoard from './constructBoard';
import ISettable from './ISettable';

class Board {

    public static fromString(s : string) : Board {return boardFromString(s)}

    public cells : Cell[] = []
    public rows : ConstrainedSet[] = []
    public columns : ConstrainedSet[] = []
    public blocks : ConstrainedSet[] = []

    private dirtyCells : Cell[] = []

    constructor() {
        constructBoard(this)
    }

    get constrainedSets() : ConstrainedSet[] {
        return [
            ...this.rows,
            ...this.columns,
            ...this.blocks
        ]
    }

    get settablesFromConstrainedSets() : ISettable[] {
        return this
            .constrainedSets
            .map(cs => cs.settableCells)
            .reduce((a, b) => [
                ...a,
                ...b
            ])
    }

    get settablesFromCells() : ISettable[] {
        return this
            .cells
            .map(cell => cell.settable)
            .reduce((a, b) => [
                ...a,
                ...b
            ])
    }

    get settables() : ISettable[] {
        return [
            ...this.settablesFromCells,
            ...this.settablesFromConstrainedSets
        ]
    }

    get completedCells() : Cell[] {
        return this
            .cells
            .filter(cell => cell.value !== 0)
    }

    get emptyCells() : Cell[] {
        return this
            .cells
            .filter(cell => cell.value === 0)
    }

    get emptyCellsSorted() : Cell[] {
        return this
            .emptyCells
            .sort((a, b) => a.possibleValues.length - b.possibleValues.length)
    }

    get emptyCellOne() : Cell {return this.emptyCellsSorted[0]}

    get isComplete() {
        return this.emptyCells.length === 0
    }

    get isValid() {
        return this
            .constrainedSets
            .every(cs => cs.isValid)
    }

    get isWon() {
        return this.isComplete && this.isValid
    }

    get isEnded() {
        return this.isWon || !this.isValid
    }

    public toValueString(zero = '.', colDelim = '', rowDelim = '\n') : string {
        return this
            .rows
            .map(row => {
                return row
                    .cells
                    .map(cell => (cell.value === 0)
                        ? zero
                        : cell.value)
                    .join(colDelim)
            })
            .join(rowDelim)
    }

    public updateCanBe() {
        this
            .completedCells
            .forEach(cell => {
                cell.updateCanBe()
                cell.updateCanBeNeighbours()
            })
    }

    public applySettable(settable : ISettable) {
        const {cell, value} = settable
        if ((this.cells.indexOf(cell) !== -1) && cell.isEmpty) {
            cell.value = value
            this
                .dirtyCells
                .push(cell)
        }
    }

    public applySettablesAll() : ISettable[] {
        const {settables} = this
        settables.forEach(s => this.applySettable(s))
        return settables
    }

    private get canDoSolveStep() : boolean {
        return(!this.isComplete && this.isValid && this.settables.length > 0)
    }

    public solveStep(dontCheck = false) {
        this.updateCanBe()
        if (dontCheck || this.canDoSolveStep) {
            this.applySettablesAll()
            this.updateCanBe()
        }
    }

    public solve() {
        this.updateCanBe()
        while (this.canDoSolveStep) {
            this.solveStep(true)
        }
    }

    public solveSimulation(excludeInValid : boolean = false) : Board[] {
        const copy = this.copy()
        copy.solve()
        if (copy.isEnded) {
            if (!excludeInValid || copy.isValid) {
                return [copy]
            } else {
                return []
            }
        } else {
            return copy.simulationStep().map(board => board.solveSimulation(excludeInValid)).reduce((x,y) => [...x,...y],[])
        }
    }

    public simulationStep(c : Cell = this.emptyCellOne) : Board[] {
        const i : number = c.index === undefined
            ? -1
            : c.index
        return c
            .possibleValues
            .map(v => {
                const board = this.copy()
                board.cells[i].value = v
                return board
            })
    }

    public copy() : Board {
        const b = new Board this
            .cells
            .forEach((oldCell, i) => {
                const newCell = b.cells[i]
                newCell.value = oldCell.value
                newCell.canBe = [...oldCell.canBe]
            })return b
    }

    public toJSON() : any {
        const {cells} = this return {
            cells
        }
    }

}

export default Board;