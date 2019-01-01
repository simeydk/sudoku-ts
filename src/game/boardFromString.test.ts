import Board from "./board";
import boardFromString, { parseBoardString } from './boardFromString';

test('parseBoardString', () => {
    const short = '    123... 045'
    expect(parseBoardString(short)).toEqual([1,2,3,0,0,0,0,4,5])
})


const boardString = `
    9.8 ... 5.1
    ..3 5.6 9..
    .7. 1.. 4..

    .64 82. 19.
    ... .7. .4.
    .85 .9. ...
    
    ... 95. .7.
    ..2 46. ..9
    ... ... ...
`

const boardStringTrim = boardString.split('').map(s => s.trim()).join('')
const bd = boardFromString(boardString)



test('importFromString',() => {
    expect(bd).toBeInstanceOf(Board)
    expect(bd.toValueString('.','','')).toBe(boardStringTrim)
})

export {bd}