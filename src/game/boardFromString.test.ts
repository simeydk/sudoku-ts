import puzzles from 'src/puzzles/puzzles';
import Board from "./board";
import boardFromString, { parseBoardString } from './boardFromString';

test('parseBoardString', () => {
    const short = '    123... 045'
    expect(parseBoardString(short)).toEqual([1,2,3,0,0,0,0,4,5])
})


const boardString = puzzles.med[0]

const boardStringTrim = boardString.split('').map(s => s.trim()).join('')
const bd = boardFromString(boardString)



test('importFromString',() => {
    expect(bd).toBeInstanceOf(Board)
    expect(bd.toValueString('.','','')).toBe(boardStringTrim)
})