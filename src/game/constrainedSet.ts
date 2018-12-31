import Cell from "./Cell";
import ISettable from './ISettable';

interface IValue {
    value: number,
    cells: Cell[]
}


class ConstrainedSet {

    public cells : Cell[] = []
    constructor(populate: boolean = false) { 
        if(populate) {
            this.cells = Array(9).fill('').map((x,i) => new Cell(undefined,undefined,i))
        }
    }

    get indexArray() : number[] {
        return this
            .cells
            .map(cell => {
                if (cell.index === null) {
                    return -1
                } else {
                    return cell.index
                }
            })
    }

    get completedValues(): number[] {
        return this.cells.filter(cell => cell.value !== 0).map(cell => cell.value).sort()
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



}

export default ConstrainedSet