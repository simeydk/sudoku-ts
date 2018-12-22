import Actor from './Actor';
import Rectangle, {r} from './rectangle';

const ens = [
    new Actor(50,5,0,0,r(120,160,20,20)),
    new Actor(60,6,0,0,r(20,20,20,20)),
    new Actor(17,8,0,0,r(200,20,20,20)),    
    new Actor(200,73,0,0,r(250,150,40,40)),    
]

class Game {

    constructor(
        public map : Rectangle = r(0, 0, 300, 200), 
        public player : Actor = new Actor(100,10,2,3,r(100, 50, 20, 20)), 
        public enemies : Actor[] = ens
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
                this.player.position = newPlayer
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