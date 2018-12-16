import Vector, {vector} from "./vector";

class Rectangle {

    get left() {
        return this.position.x
    }
    get top() {
        return this.position.y
    }
    get width() {
        return this.size.x
    }
    get height() {
        return this.size.y
    }
    get right() {
        return this.left + this.width
    }
    get bottom() {
        return this.top - this.height
    }

    get topLeft() {
        return this.position
    }

    get topRight() {
        return vector(this.right,this.top)
    }

    get bottomLeft() {
        return vector(this.left,this.bottom)
    }

    get bottomRight() {
        return vector(this.right,this.bottom)
    }

    get corners() {
        return [this.topLeft,this.topRight, this.bottomLeft, this.bottomRight]
    }

    get array() : number[] {
        return Rectangle.toArray(this)
    }

    public static toArray(r : Rectangle) : number[] {
        return [r.left, r.top, r.width, r.height]
    }

    public static contains(r :Rectangle, v: Vector, includeEdges = true): boolean {
        if(includeEdges) {
            return((v.x >= r.left) && (v.x <= r.right) && (v.y <= r.top) && (v.y >= r.bottom))
        } else {
            return((v.x > r.left) && (v.x < r.right) && (v.y < r.top) && (v.y > r.bottom))
        }
    }

    public static overlaps(a : Rectangle, b: Rectangle, includeEdges = false): boolean {
        const bInA = a.corners.map(c => b.contains(c,includeEdges)).reduce((x,y) => x || y)
        if (bInA) {
            return bInA
        } else {
            const aInB = b.corners.map(c => a.contains(c,includeEdges)).reduce((x,y) => x || y)
            return aInB
        }
    }
    
    public readonly position : Vector;
    public readonly size : Vector;

    constructor(left : number = 0, top : number = 0, width : number = 1, height : number = 1) {
        this.position = vector(left, top)
        this.size = vector(width, height)
    }

    public move(vec : Vector) {
        return new Rectangle(...this.position.add(vec).array, ...this.size.array)
    }

    public contains(v : Vector, includeEdges = true) : boolean {
        return Rectangle.contains(this,v,includeEdges)
        // return((v.x >= this.left) && (v.x <= this.right) && (v.y <= this.top) && (v.y >= this.bottom))
    }

    public overlaps(r: Rectangle, includesEdges = false) : boolean {
        return Rectangle.overlaps(this,r,includesEdges)
    }

}

export default Rectangle