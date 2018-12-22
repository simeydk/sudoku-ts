import Actor from './Actor';
import Item from './Item';
import Rectangle, {r} from './rectangle';

const ens = [
    new Actor(50,5,0,0,r(120,160,20,20)),
    new Actor(60,6,0,0,r(20,20,20,20)),
    new Actor(17,8,0,0,r(200,20,20,20)),    
    new Actor(200,73,0,0,r(250,150,40,40)),    
]

const defaultItems = [
    new Item('sword',5,0,0,r(10,10,10,10)),
    new Item('shield',0,2,0,r(10,180,10,10)),
    new Item('jewel',0,0,1,r(30,180,10,10)),
]

class Game {

    constructor(
        public map : Rectangle = r(0, 0, 300, 200), 
        public player : Actor = new Actor(100,10,2,3,r(100, 50, 20, 20)), 
        public enemies : Actor[] = ens,
        public items: Item[] = defaultItems
        ) { }

    public attemptMove(x : number, y : number, callback : (g : Game) => any) {
        const newPlayer = this
            .player.position
            .move(x, y)
        if (!this.map.contains(newPlayer, true)) {
            console.log("out of bounds", {map:this.map.array, newPlayer:newPlayer.array})
        } else {
            const clashedEnemies = this.enemies.filter(enemy => newPlayer.overlaps(enemy.position,false))
            if (clashedEnemies.length > 0) {
                const e = clashedEnemies[0]
                this.player.attack(e,true)
                this.enemies = this.enemies.filter(enemy => (enemy.health > 0))
                if (!this.player.alive) {
                    Object.assign(this.player.position,{left: -100, top: -100})
                }
                console.log("fighting with enemy", {newPlayer:newPlayer.array,enemy:e.position.array})
            } else {
                const clashedItems = this.items.filter(item => newPlayer.overlaps(item.position,false))
                if (clashedItems.length > 0) {
                    const item = clashedItems[0]
                    this.player.items.push(item)
                    this.items = this.items.filter(i => i !== item)
                    if(clashedItems.length === 1) {this.player.position = newPlayer}
                } else {
                    this.player.position = newPlayer
                }
            }
        }
         

        callback(this)

    }

    public copy() : Game {
        
        const game = new Game()
        game.player = this.player.copy()
        game.map = this.map.copy()
        game.enemies = this.enemies.map(e => e.copy())
        
        return game
    }

}

export default Game