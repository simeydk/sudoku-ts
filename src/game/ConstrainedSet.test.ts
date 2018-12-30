import ConstrainedSet from "./constrainedSet";

test('constructor works',() => {
    const csDefault = new ConstrainedSet
    expect(csDefault).toBeInstanceOf(ConstrainedSet)
    expect(csDefault.cells).toBeDefined()
    expect(csDefault.cells.length).toBe(9)
})

const cs = new ConstrainedSet
cs.cells[3].value = 5
cs.cells[7].value = 2
cs.cells[3].updateCanBe()
cs.cells[7].updateCanBe()


cs.cells[1].canBe[2] = false
cs.cells[8].canBe[2] = false
cs.cells[5].canBe[2] = false

cs.cells[0].value = 1
cs.cells[0].updateCanBe()
cs.cells[8].value = 9
cs.cells[8].updateCanBe()
cs.cells[6].value = 4
cs.cells[6].updateCanBe()
cs.cells[4].canBe[2] = false
test('completed values', () => {
    expect(cs.completedValues).toEqual([1,2,4,5,9])
})

test('missing values', () => {
    expect(cs.missingValues).toEqual([3, 6, 7, 8])
})

test('possibleCells', () => {
    expect(cs.possibleCells(3).map(cell => cell.index)).toEqual([2])
    expect(cs.possibleCells(6).map(cell => cell.index)).toEqual([1,2,4,5])
} )

test('settables', () => {
    expect(cs.settableValues).toEqual([{cell:cs.cells[2],value:3}])
})

// .forEach(n => {cs.cells[n].updateCanBe()});

console.log(JSON.stringify(cs.missingVs.map(v => ({v:v.value,c:v.cells.map(c=> c.index).join('')}))))