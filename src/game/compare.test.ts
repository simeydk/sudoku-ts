import { genDynamicCompare, isAscending } from "./compare";

test('genDymicCompare works',() => {
    const gt = genDynamicCompare(false)
    const gte = genDynamicCompare(true)

    expect(gt(2,3)).toBe(false)
    expect(gt(2,2)).toBe(false)
    expect(gt(3,2)).toBe(true)

    expect(gte(2,3)).toBe(false)
    expect(gte(2,2)).toBe(true)
    expect(gte(3,2)).toBe(true)
})

test('isAscending works', () => {
    expect(isAscending([2,3,4,5],true)).toBe(true)
    expect(isAscending([2,3,4,3],true)).toBe(false)
    expect(isAscending([2,2,4,4],true)).toBe(true)

    expect(isAscending([2,2,4,4],false)).toBe(false)
    expect(isAscending([2,2,4,3],false)).toBe(false)
    expect(isAscending([2,3,4,5],false)).toBe(true)
})