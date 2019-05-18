import Board from './board';
import ISettable from './ISettable';

interface ICellState {
    board?:Board
    neighbours?:Cell[]
}


class Cell {

    get neighbours(): Cell[] {
        return this.state.neighbours || []
    }
    set neighbours(neighbours: Cell[]) {
        this.state.neighbours = neighbours
    }

    private pvtState: () => ICellState
    get state(): ICellState {
        return this.pvtState()
    }

    constructor(
        public value: number = 0,
        public canBe: boolean[] = new Array(9).fill(true),
        public index?: number,
        public row?: number,
        public column?: number,
        public block?: number,
    ) {
        const state: ICellState = {}
        this.pvtState = () => state
    }

    get possibleValues() {
        return this.canBe.map((x,i) => ({x,i})).filter(o => o.x).map(o => o.i+1)
    }

    get isEmpty(): boolean { return (this.value === 0) }

    get settable(): ISettable[] {
        if(this.isEmpty) {
            const pv = this.possibleValues
            if(pv.length === 1) {
                return [{cell:this, value: pv[0]}]
            }
        }
        return []
    }

    public updateCanBe() {
        if (!this.isEmpty) {
            this.canBe = this.canBe.map((x,i) => (i === this.value - 1))
        }
    }

    public updateCanBeNeighbours() {
        if (!this.isEmpty) {
            this.neighbours.forEach(neighbour => {
                neighbour.canBe[this.value - 1] = false
            })
        }
    }

    public toJSON(): {value:number,canBe:boolean[]} {
        const value = this.value
        const canBe = [...this.canBe]
        return {value,canBe}
    }

}



export default Cell