import Rectangle from './rect';

class Game {
    public readonly map = new Rectangle(0,200,300,200)
    public player = new Rectangle(100,50,20,20) 
}

export default Game

// a map is drawn on the screen
// there is a player on the map
// the game responds to keyboard inputs
// the player moves when arrow keys are pressed
// the player does not move outside the bounds of the map