// tslint:disable: object-literal-sort-keys

import Board from "./board";

const key: {[index:string]:number}= {"1": 1,
"2": 2,
"3": 3,
"4": 4,
"5": 5,
"6": 6,
"7": 7,
"8": 8,
"9": 9,
"0": 0,
".": 0,}

function parseBoardString(str: string) : number[] {
    return str.trim().split('').map(s => key[s]).filter(x => typeof(x) === 'number')
}

function boardFromString(str: string) : Board {
    const b = new Board
    const nums = parseBoardString(str)
    nums.forEach((n,i) => {
        if(n !== 0 && i < b.cells.length) {
            b.cells[i].value = n
        }
    })
    return b
}

export default boardFromString
export { parseBoardString}