import Attributes from './Attributes';
import Rectangle from "./rectangle";

class Actor {
    public attributes : Attributes

    constructor(public health : number = 100, strength : number = 0, armor : number = 0, luck : number = 0, public position : Rectangle = new Rectangle(-100, -100, 1, 1)) {

        this.attributes = new Attributes(strength, armor, luck)

    }

    public copy() : Actor {
        const {health} = this
        const attributes = this.attributes.copy()
        const position = this.position.copy()
        return Object.assign(new Actor(),{health,attributes,position})
    }

}

export default Actor