import Vector, { vector } from "./vector";

const v = vector(2,3)

test('vector creates a Vector object',() => {
    expect(v).toBeInstanceOf(Vector)
    expect(v.x).toBe(2)
    expect(v.y).toBe(3)
})

test('array works', () => {
    expect(v.array).toEqual([2,3])
})

const w = vector(3,5)

test('add works',() => {
    const x = v.addVec(w)
    expect(x).toBeInstanceOf(Vector)
    expect(x.array).toEqual([5,8])
    expect(x.x).toBe(5)
    expect(x.y).toBe(8)
})

test('scale works', () => {
    const x = v.scale(1.2)
    expect(x).toBeInstanceOf(Vector)
    expect(x.array).toEqual([2.4,3.6])

})