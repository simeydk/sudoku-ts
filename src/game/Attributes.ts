
interface IAttributes {
    strength: number,
    armor: number,
    luck: number,
  }

class Attributes implements IAttributes {

    public static sum(...attrs : Attributes[]) : Attributes {
        const result = new Attributes
        attrs.forEach(attr => result.absorb(attr))
        return result
    }
    
    constructor(
        public strength: number = 0,
        public armor: number = 0,
        public luck: number = 0
      ) {}

    get object(): IAttributes {
        const {strength,armor, luck} = this
        return {strength,armor, luck}
    }

    get array(): [number,number,number] {
        return [this.strength,this.armor,this.luck]
    }

    public copy(): Attributes {
        return new Attributes(...this.array)
    }

    public absorb(attr: Attributes) {
        this.strength += attr.strength
        this.armor += attr.armor
        this.luck += attr.luck
    }

    public sum(...attrs: Attributes[]) : Attributes {
        return Attributes.sum(this,...attrs)
    }
    
}

function a(strength: number = 0,armor: number = 0,luck: number = 0) {
    return new Attributes(strength,armor,luck)
}

export default Attributes
export {a}