import Vector, {v} from "./vector";

function genDynamicCompare(includeEqual = true) {
    if (includeEqual) {
        return (a:any, b: any) => (a >= b)
    } else {
        return (a:any, b: any) => (a > b)
    }
}

interface Iwhlt {
    width: number,
    height: number,
    left: number,
    top: number,
}

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

    get middleH() {
        return this.left + this.width/2
    }
    
    get middleV() {
        return this.top - this.height/2
    }

    get topLeft() {
        return this.position
    }

    get topRight() {
        return v(this.right, this.top)
    }

    get bottomLeft() {
        return v(this.left, this.bottom)
    }

    get bottomRight() {
        return v(this.right, this.bottom)
    }

    get corners() {
        return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]
    }

    get array() : number[] {
        return Rectangle.toArray(this)
    }

    public static toArray(rect : Rectangle) : number[] {
        return [rect.left, rect.top, rect.width, rect.height]
    }

    public static whlt(rect: Rectangle): Iwhlt {
        const {width, height, left, top} = rect
        const result = {width,height,left,top}
        return result
    }

    public static contains(rect : Rectangle, vec : Vector, includeEdges = true) : boolean {
        // Greater than or equal to if include edges, and Greater than only if not
        // include edges
        const gt = genDynamicCompare(includeEdges)
        return (gt(vec.x, rect.left) && gt(rect.right, vec.x) && gt(rect.top, vec.y) && gt(vec.y, rect.bottom))
    }

    public static overlaps(a : Rectangle, b : Rectangle, includeEdges = false) : boolean {
        const bInA = a
            .corners
            .map(c => b.contains(c, includeEdges))
            .reduce((x, y) => x || y)
        if (bInA) {
            return bInA
        } else {
            const aInB = b
                .corners
                .map(c => a.contains(c, includeEdges))
                .reduce((x, y) => x || y)
            return aInB
        }
    }

    public static containsRect(a : Rectangle, b : Rectangle, includeEdges = true) : boolean {
        return b
            .corners
            .map(c => a.contains(c, includeEdges))
            .reduce((x, y) => x && y)
    }

    public static copy(rect: Rectangle): Rectangle {
        return new Rectangle(rect.left,rect.top,rect.width,rect.height)
    }

    public readonly position : Vector;
    public readonly size : Vector;

    constructor(left : number = 0, top : number = 0, width : number = 1, height : number = 1) {
        this.position = v(left, top)
        this.size = v(width, height)
    }

    public moveVec(vec : Vector): Rectangle {
        return new Rectangle(...this.position.addVec(vec).array, ...this.size.array)
    }

    public move(x:number, y:number): Rectangle {
        return this.moveVec(new Vector(x,y))
    }

    public contains(vec : Vector, includeEdges = true) : boolean {
        return Rectangle.contains(this, vec, includeEdges)
    }

    public overlaps(rect : Rectangle, includesEdges = false) : boolean {
        return Rectangle.overlaps(this, rect, includesEdges)
    }

    public containsRect(rect : Rectangle, includeEdges = true) : boolean {
        return Rectangle.containsRect(this, rect, includeEdges)
    }

    get whlt() :Iwhlt {
        return Rectangle.whlt(this)
    }

    public copy() : Rectangle {
        return Rectangle.copy(this)
    }

}

function r(left : number = 0, top : number = 0, width : number = 1, height : number = 1): Rectangle {
    return new Rectangle(left,top,width,height)
}

export default Rectangle
export {r}