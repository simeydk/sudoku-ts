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

}

export default Cell