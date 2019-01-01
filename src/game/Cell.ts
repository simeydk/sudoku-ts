import Board from './board';
import ISettable from './ISettable';

class Cell {

    public neighbours: Cell[] = []

    constructor(
        public value: number = 0,
        public canBe: boolean[] = new Array(9).fill(true),
        public index: number | null = null,
        public row: number | null = null,
        public column: number | null = null,
        public block: number | null = null,
        public board: Board | null = null
    ) {
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
            } else {
                return []
            }
        } else {
            return []
        }
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

}

export default Cell