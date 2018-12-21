import Actor from './Actor';
import Rectangle, {r} from './rectangle';

class Game {

    constructor(
        public map : Rectangle = r(0, 0, 300, 200), 
        public player : Actor = new Actor(100,10,2,3,r(100, 50, 20, 20)), 
        public enemies : Rectangle[] = [r(120, 160, 20, 20), r(20,20,20,20)]
        ) { }

    public attemptMove(x : number, y : number, callback : (g : Game) => any) {
        const newPlayer = this
            .player.position
            .move(x, y)
        if (!this.map.contains(newPlayer, true)) {
            console.log("out of bounds", {map:this.map.array, newPlayer:newPlayer.array})
        } else if (this.enemies.map(enemy => newPlayer.overlaps(enemy,false)).reduce((a,b) => a || b)) {
            console.log("bumping into enemy", {newPlayer:newPlayer.array,enemy:this.enemies[0].array})
        } else {
            this.player.position = newPlayer
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