import { isAscending } from './compare';
import Vector, {v} from "./vector";

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
    get bottom() { return this.top + this.height }
    get middleV() {return (this.top + this.bottom) / 2}
    get middleH() {return (this.left + this.right) / 2}

    get position() : Vector {return v(this.left,this.top)};
    get size() : Vector {return v(this.width,this.height)};
    get middle() { return v(this.middleH, this.middleV)}
        
    get topLeft() { return this.position }
    get topRight() { return v(this.right, this.top)}
    get bottomLeft() { return v(this.left, this.bottom)}
    get bottomRight() { return v(this.right, this.bottom)}

    get topMiddle() {return v(this.middleH,this.top)}
    get bottomMiddle() {return v(this.middleH,this.bottom)}
    get middleLeft() {return v(this.left,this.middleV)}
    get middleRight() {return v(this.right,this.middleV)}
    
    get corners() { return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]}
    get mids() {return [this.topMiddle, this.bottomMiddle, this.middleLeft, this.middleRight]}
    get compass() {return [...this.corners, ...this.mids]}
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
        return isAscending([this.left,vec.x,this.right],includeEdges) && isAscending([this.top,vec.y,this.bottom])
    }

    public overlaps(rect : Rectangle, includeEdges = false) : boolean {
        return this.containsAnyCompass(rect, includeEdges) || rect.containsAnyCompass(this, includeEdges)
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

    private containsCompassArray(rect: Rectangle, includeEdges: boolean): boolean[] {
        return rect.compass.map(corner => this.containsVec(corner, includeEdges))
    }

    private containsAnyCompass(rect: Rectangle, includeEdges: boolean): boolean {
        return this.containsCompassArray(rect, includeEdges).reduce((x,y) => x || y)
    }
    
    // private containsAnyCorner(rect: Rectangle, includeEdges: boolean): boolean {
    //     return this.containsCornerArray(rect, includeEdges).reduce((x,y) => x || y)
    // }

    private containsAllCorners(rect: Rectangle, includeEdges: boolean): boolean {
        return this.containsCornerArray(rect, includeEdges).reduce((x,y) => x && y)
    }


}

function r(left : number = 0, top : number = 0, width : number = 1, height : number = 1): Rectangle {
    return new Rectangle(left,top,width,height)
}

export default Rectangle
export {r}