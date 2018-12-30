import Board from "./board";



function numArray(n:number, from = 0, step = 1) {
    return Array(n).fill('').map((x,i) => i * step + from)
}

test('numArray', () => {
    expect(numArray(5)).toEqual([0,1,2,3,4])
    expect(numArray(3,7)).toEqual([7,8,9])
})

const b = new Board()

test('constructor works', () => {
    expect(b).toBeInstanceOf(Board)
    expect(b.cells).toBeInstanceOf(Array)
    expect(b.cells.length).toBe(81)
    expect(b.cells.map(c => c.index)).toEqual(numArray(81))
})

test('rows work', () => {
    expect(b.rows[0].indexArray).toEqual(numArray(9))
    expect(b.rows[3].indexArray).toEqual(numArray(9,27))
})
test('columns work', () => {
    expect(b.columns[0].indexArray).toEqual(numArray(9,0,9))
    expect(b.columns[3].indexArray).toEqual(numArray(9,3,9))
})

test('blocks work', () => {
    expect(b.blocks[0].indexArray).toEqual([0,1,2,9,10,11,18,19,20])
    expect(b.blocks[4].indexArray).toEqual([30,31,32,39,40,41,48,49,50])
})

test('settables on empty board',() => {
    expect(b.settables).toEqual([])
})

test('toValueString', () => {
    // console.log('VALUESTRING', b.toValueString())
    expect(b.toValueString('.','','')).toEqual('.'.repeat(81))
    // b.cells[2].value
    const c = new Board
    c.cells[3].value = 4
    c.cells[10].value = 8
    c.cells[80].value = 9
    c.cells[30].value = 5
    c.cells[55].value = 1
    c.cells[70].value = 3

    const cStr = "- - - 4 - - - - -|- 8 - - - - - - -|- - - - - - - - -|- - - 5 - - - - -|- - - - - - - - -|- - - - - - - - -|- 1 - - - - - - -|- - - - - - - 3 -|- - - - - - - - 9"

    expect(c.toValueString('-',' ','|')).toEqual(cStr)

})