import Board from "./board";
import boardFromString from './boardFromString';

test('importFromString',() => {
    const boardString = `
        9.8...5.1
        ..35.69..
        .7.1..4..
        .6482.19.
        ....7..4.
        .85.9....
        ...95..7.
        ..246...9
    `
    const bd = boardFromString(boardString)
    expect(bd).toBeInstanceOf(Board)
})