class Cell {

    constructor(
        public value: number = 0,
        public canBe: boolean[] = new Array(9).fill(true),
        public index: number | null = null
    ) {
    }
    

    get possibleValues() {
        return this.canBe.map((x,i) => ({x,i})).filter(o => o.x).map(o => o.i+1)
    }

    get isEmpty(): boolean { return (this.value === 0) }

    public updateCanBe() {
        if (this.value !== 0) {
            this.canBe = this.canBe.map((x,i) => (i === this.value - 1))
        }
    }

}

export default Cell