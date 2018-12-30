import Cell from "./Cell";

const c = new Cell

test('constructor works', ()=> {
    expect(c).toBeInstanceOf(Cell)
    expect(c.value).toBe(0)
    expect(c.possibleValues).toEqual([1,2,3,4,5,6,7,8,9])
})

test('possibleValues works', ()=> {
    const x = new Cell
    x.canBe[5] = false
    expect(x.possibleValues).toEqual([1,2,3,4,5,7,8,9])
})

test('set value works', () => {
    const x = new Cell(4)
    expect(x.value).toBe(4)
})

test('updateCanBe', () => {
    const x = new Cell(4)
    x.updateCanBe()
    expect(x.canBe).toEqual([false,false,false,true,false,false,false,false,false])
})