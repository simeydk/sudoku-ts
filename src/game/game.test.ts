import Actor from './Actor';
import Game from "./game";
import Rectangle, { r } from './rectangle';


const game = new Game()
const {player, enemies, items, map} = game
player.position = player.position.moveTo(0,0)
game.enemies = []
const e1 = new Actor(20,5,0,0,r(30,0,20,20))
const e2 = new Actor(20,5,0,0,r(30,30,20,20))
enemies.push(e1,e2)

test('correct type', () => {
    expect(game).toBeInstanceOf(Game)
    expect(items).toBeInstanceOf(Array)
    expect(map).toBeInstanceOf(Rectangle)
})
