import Attributes from './Attributes'
import Rectangle from './rectangle';

const defaultPosition = new Rectangle(-100,-100,10,10)

class Item {

    public attributes: Attributes
    constructor(public name = '', 
        strength:number = 0, 
        armor: number = 0, 
        luck:number = 0, 
        public position = defaultPosition
    ) {
        this.attributes = new Attributes(strength,armor,luck)
    }
}

export default Item