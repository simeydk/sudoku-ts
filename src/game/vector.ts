interface IVector {
    x : number
    y : number
}

const globalPrecision = 6

function roundFloat(x : number, precision : number) : number {
    return Number(x.toPrecision(precision))
}


class Vector {

    public static add(a : Vector, b : Vector) : Vector {
        return new Vector(a.x + b.x, a.y + b.y)
    }

    public static subtract(a : Vector, b : Vector) : Vector {
        return new Vector(a.x - b.x, a.y - b.y)
    }

    public readonly x : number
    public readonly y : number

    constructor(x = 0, y = 0) {
        this.x = roundFloat(x, globalPrecision)
        this.y = roundFloat(y, globalPrecision)
    }

    get array() { return [this.x, this.y] }

    public addVec(b : Vector) {
        return Vector.add(this, b)
    }

    public add(x:number, y:number) {
        return new Vector(this.x + x, this.y + y)
    }

    public scale(s : number) {
        return new Vector(this.x * s, this.y * s)
    }


}

const v = (x : number, y : number) => new Vector(x, y)

export default Vector
export {IVector, Vector, v}