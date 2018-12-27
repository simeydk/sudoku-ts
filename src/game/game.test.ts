import Game from "./game";

const game = new Game()
// const {player, enemies, items, map} = game
test('correct type', () => {
    expect(game).toBeInstanceOf(Game)
})