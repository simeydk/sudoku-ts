import Cell from "./Cell";

class ConstrainedSet {
    constructor(
        public cells: Cell[] = []
    ) {
    }

    get indexArray (): number[] {
        return this.cells.map(cell => ((cell.index === null) ? -1 : cell.index))
    }
}

export default ConstrainedSet