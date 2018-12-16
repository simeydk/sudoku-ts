interface IVector {
    x : number
    y : number
}

function roundFloat(x : number, precision : number) : number {
    return Number(x.toPrecision(precision))
}

class Vector {

    public static add(a : IVector, b : IVector) {
        return new Vector(a.x + b.x, a.y + b.y)
    }

    public readonly x : number
    public readonly y : number

    private readonly precision = 6

    constructor(x = 0, y = 0) {
        this.x = roundFloat(x, this.precision)
        this.y = roundFloat(y, this.precision)
    }

    public add(b : IVector) {
        return Vector.add(this, b)
    }

    public scale(s : number) {
        return new Vector(this.x * s, this.y * s)
    }

    get array() {
        return [this.x, this.y]
    }

}

const vector = (x : number, y : number) => new Vector(x, y)

export default Vector
export {IVector, Vector, vector}