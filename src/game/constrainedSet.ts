import Cell from "./Cell";
import ISettable from './ISettable';

interface IValue {
    value: number,
    cells: Cell[]
}

function cellIndexNum(cell:Cell):number {
    return cell.index === null ? -1 : cell.index
}

class ConstrainedSet {

    public cells : Cell[] = []
    constructor(populate: boolean = false) { 
        if(populate) {
            this.cells = Array(9).fill('').map((x,i) => new Cell(undefined,undefined,i))
        }
    }

    get indexArray() : number[] {
        return this.cells.map(cellIndexNum)
    }

    get completedCells() : Cell[] {
        return this.cells.filter(cell => cell.value !== 0)
    }

    get emptyCells() : Cell[] {
        return this.cells.filter(cell => cell.value === 0)
    }

    get completedValues(): number[] {
        return this.completedCells.map(cell => cell.value).sort()
    }

    get missingValues() {
        const cv = this.completedValues
        return [1,2,3,4,5,6,7,8,9].filter(x => cv.indexOf(x) === -1)
    }

    public possibleCells(value: number): Cell[] {
        return this.cells.filter(cell => cell.canBe[value - 1])
    }

    get missingVs(): IValue[] {
        return this.missingValues.map(x => {
            return {value: x, cells: this.possibleCells(x)}
        })
    }

    get settableCells(): ISettable[] {
        return this.missingVs.filter(v => v.cells.length === 1).map(v => ({value:v.value,cell:v.cells[0]}))
    }

    public updateCanBe() {
        this.emptyCells.forEach(cell => {
            this.completedValues.forEach(value => cell.canBe[value-1] = false)
        })
    }

    get isComplete(): boolean { return this.emptyCells.length === 0}

    get isValid(): boolean {
        const values = this.cells.map(c => c.value)
        return [1,2,3,4,5,6,7,8,9].every(x => values.filter(v => v === x).length <= 1)
    }

}

export default ConstrainedSet