import Board from "./board";
import boardFromString, { parseBoardString } from './boardFromString';
const boardString = `
    9.8...5.1
    ..35.69..
    .7.1..4..
    .6482.19.
    ....7..4.
    .85.9....
    ...95..7.
    ..246...9
    .........
`

const boardStringTrim = boardString.split('').map(s => s.trim()).join('')

test('parseBoardString', () => {
    const short = '    123... 045'
    expect(parseBoardString(short)).toEqual([1,2,3,0,0,0,0,4,5])
})

test('importFromString',() => {
    const bd = boardFromString(boardString)
    expect(bd).toBeInstanceOf(Board)
    expect(bd.toValueString('.','','')).toBe(boardStringTrim)
})