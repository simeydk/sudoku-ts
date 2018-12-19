import Vector, {v} from "./vector";

// Horizontal measurements increase as you go east
// Vertical measurements increase as you go up

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
    constructor(
        public readonly left : number = 0, 
        public readonly top : number = 0, 
        public readonly width : number = 1, 
        public readonly height : number = 1
        ) {}
        
    get right() { return this.left + this.width }
    get bottom() { return this.top - this.height }
    
    get position() : Vector {return v(this.left,this.top)};
    get size() : Vector {return v(this.width,this.height)};
        
    get topLeft() { return this.position }
    get topRight() { return v(this.right, this.top)}
    get bottomLeft() { return v(this.left, this.bottom)}
    get bottomRight() { return v(this.right, this.bottom)}
    
    get corners() { return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]}
    get array() { return [this.left, this.top, this.width, this.height]}  
    
    get whlt() :Iwhlt {
        const {width, height, left, top} = this
        return {width, height, left, top}
    }

    get ltrb() {
        const {left, top, right, bottom} = this
        return {left, top, right, bottom}
    }
    get edgesArray() { return [this.left, this.top, this.right, this.bottom] }
    
    public moveVec(vec : Vector): Rectangle {
        return this.move(vec.x,vec.y)
    }

    public move(x:number, y:number): Rectangle {
        return new Rectangle(this.left + x,this.top + y,this.width, this.height)
    }

    public containsVec(vec : Vector, includeEdges = true) : boolean {
        // Greater than or equal to if include edges, and Greater than only if not
        // include edges
        const gt = genDynamicCompare(includeEdges)
        return (gt(vec.x, this.left) && gt(this.right, vec.x) && gt(this.top, vec.y) && gt(vec.y, this.bottom))
    }

    public overlaps(rect : Rectangle, includeEdges = false) : boolean {
        return this.containsAnyCorner(rect, includeEdges) || rect.containsAnyCorner(this, includeEdges)
    }

    public contains(rect : Rectangle, includeEdges = true) : boolean {
        return this.containsAllCorners(rect, includeEdges)
    }

    public copy() : Rectangle {
        return new Rectangle(this.left, this.top, this.width, this.height) 
    }

    private containsCornerArray(rect: Rectangle, includeEdges: boolean): boolean[] {
        return rect.corners.map(corner => this.containsVec(corner, includeEdges))
    }
    
    private containsAnyCorner(rect: Rectangle, includeEdges: boolean): boolean {
        return this.containsCornerArray(rect, includeEdges).reduce((x,y) => x || y)
    }

    private containsAllCorners(rect: Rectangle, includeEdges: boolean): boolean {
        return this.containsCornerArray(rect, includeEdges).reduce((x,y) => x && y)
    }


}

function r(left : number = 0, top : number = 0, width : number = 1, height : number = 1): Rectangle {
    return new Rectangle(left,top,width,height)
}

export default Rectangle
export {r}