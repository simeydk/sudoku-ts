import puzzles from '../puzzles/puzzles';
import Board from "./board";
import Cell from './Cell';



test('copy works', () => {
    const b = new Board
    const c = b.copy()
    expect(JSON.stringify(c)).toEqual(JSON.stringify(b))
})

test('simulation', () => {
    const b = Board.fromString(puzzles.hard[2])
    b.completedCells[0].value = 0
    b.completedCells[0].value = 0
    b.completedCells[0].value = 0
    b.completedCells[0].value = 0
    b.solve()
    console.log(b.toValueString())
    const d = b.solveSimulation(true)
    console.log(d.length), d.map(sb => sb.toValueString()))

    // const sims = b.simulationStep()
    // console.log(['sim0',b.toValueString('.','','|'), ...sims.map(sb => sb.toValueString('.','','|') + sb.isValid)])
    // const sims2 = sims.map(sb => {
    //     sb.solve()
    //     if (!sb.isComplete && sb.isValid) {
    //         return sb.simulationStep()
    //     }
    //     else {
    //         return [sb]
    //     }
    // }).reduce((x,y) => [...x,...y])
    
    // console.log(['sim1',b.toValueString('.','','|'), ...sims2.map(sb => sb.toValueString('.','','|') + sb.isValid)])
    
    // const cells: Cell[] = []
    // while (c.isValid && !c.isComplete) {
    //     const cell = c.emptyCells.sort((x,y) => x.possibleValues.length - y.possibleValues.length)[0]
    //     cells.push(cell)
    //     cell.value = cell.possibleValues[0]
    //     // console.log(JSON.stringify(cell))    
    //     c.solve()
    //     // console.log(cells.length,c.emptyCells.length,b.emptyCells.length)
    // }
    // expect(c.isWon).toBe(false)
})

// console.log(JSON.stringify(b))