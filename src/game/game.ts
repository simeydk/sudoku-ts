import Rectangle from './rectangle';

class Game {
    public readonly map = new Rectangle(0,200,300,200)
    public player = new Rectangle(100,50,20,20)
    public enemies: Rectangle[] = []
    
    constructor() {
        this.enemies.push(new Rectangle(120,160,20,20))
    }

    public attemptMove(x:number, y:number, callback:(g:Game) => any) {
        const newPlayer = this.player.move(x,y)
            if(!this.map.containsRect(newPlayer)) {
                console.log("out of bounds",this)
            } else if(this.player.overlaps(this.enemies[0])) {
                console.log("bumping into enemy",this)
            } else {
                this.player = newPlayer
            }
    
        callback(this)

    }

}

export default Game