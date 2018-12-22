import Attributes from './Attributes';
import Item from './Item';
import Rectangle from "./rectangle";

class Actor {

    public attributes : Attributes
    public items: Item[]
    private pvtHealth: number

    constructor(health : number = 100, strength : number = 0, armor : number = 0, luck : number = 0, public position : Rectangle = new Rectangle(-100, -100, 1, 1)) {
        this.health = health
        this.attributes = new Attributes(strength, armor, luck)
    }

    get health(): number {return this.pvtHealth}
    set health(health: number) {this.pvtHealth = Math.max(health,0)}
    get alive(): boolean {return this.health > 0}
    public copy() : Actor {
        const {health} = this
        const attributes = this.attributes.copy()
        const position = this.position.copy()
        return Object.assign(new Actor(),{health,attributes,position})
    }

    get totalAttributes(): Attributes {
        return this.attributes
    }

    get totalItemAttributes(): Attributes {
        return new Attributes()
    }

    public attack(enemy:Actor, retaliate:boolean = false) {
        
        enemy.health -= this.totalAttributes.strength
        
        if (retaliate && (enemy.alive)) {
            enemy.attack(this)
        }                    
    }

}

export default Actor