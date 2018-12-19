import Rectangle, {r} from './rectangle';

class Game {

    constructor(
        public map : Rectangle = r(0, 200, 300, 200), 
        public player : Rectangle = r(100, 50, 20, 20), 
        public enemies : Rectangle[] = [r(120, 160, 20, 20)]
        ) { }

    public attemptMove(x : number, y : number, callback : (g : Game) => any) {
        const newPlayer = this
            .player
            .move(x, y)
        if (!this.map.containsRect(newPlayer, true)) {
            console.log("out of bounds", this.map, newPlayer)
        } else if (newPlayer.overlaps(this.enemies[0])) {
            console.log("bumping into enemy", newPlayer,this.enemies[0])
        } else {
            this.player = newPlayer
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