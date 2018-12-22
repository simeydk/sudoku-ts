import Attributes from './Attributes'

class Item {

    public attributes: Attributes

    constructor(public name = '', strength:number, armor: number, luck:number) {
        this.attributes = new Attributes(strength,armor,luck)
    }
}

export default Item