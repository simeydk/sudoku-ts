import puzzles from '../puzzles/puzzles'
import boardFromString from './boardFromString';
import ISettable from './ISettable';

const bd = boardFromString(puzzles.med[0])
bd.updateCanBe()

function settablesToString(settables: ISettable[]) {
    return settables.map(s => `[${s.cell.row},${s.cell.column}]:${s.value}`).join(' ')
}

test('settables', () => {
    expect(bd.cells[0].isEmpty).toBe(false)
    expect(bd.cells[0].settable).toEqual([])
    // console.log(settablesToString(bd.settablesFromCells))
    // console.log(settablesToString(bd.settablesFromConstrainedSets))
    const fromCells = `[2,2]:6`
    const fromSets = `[0,7]:6 [1,8]:7 [2,0]:5 [2,5]:9 [5,5]:4 [8,2]:7 [8,4]:1 [2,5]:9 [5,6]:7 [2,0]:5 [2,5]:9 [1,8]:7 [5,5]:4`
    expect(settablesToString(bd.settablesFromCells)).toEqual(fromCells)
    expect(settablesToString(bd.settablesFromConstrainedSets)).toEqual(fromSets)
})

test('applySettables', () => {
    bd.solve()    
    expect(bd.isWon).toBe(true)
})

test('hard puzzle',()=> {
    const str = puzzles.hard[0]

    const b = boardFromString(str)
    expect(b.emptyCells.length).toBe(51)
    expect(b.isValid).toBe(true)
    b.solve()
    console.log(b.emptyCells.length, b.settables)
    console.log(b.toValueString())
    expect(b.isWon).toBe(true)
})

test('medium puzzle',()=> {

    const str = puzzles.med[3]
    const b = boardFromString(str)
    expect(b.emptyCells.length).toBe(56)
    expect(b.isValid).toBe(true)
    b.solve()
    console.log(b.emptyCells.length, b.settables)
    console.log(b.toValueString())
    expect(b.isWon).toBe(true)
})
