import Vector, { v } from "./vector";

const vec = v(2,3)

test('vector creates a Vector object',() => {
    expect(vec).toBeInstanceOf(Vector)
    expect(vec.x).toBe(2)
    expect(vec.y).toBe(3)
})

test('array works', () => {
    expect(vec.array).toEqual([2,3])
})

const w = v(3,5)

test('add works',() => {
    const x = vec.addVec(w)
    expect(x).toBeInstanceOf(Vector)
    expect(x.array).toEqual([5,8])
    expect(x.x).toBe(5)
    expect(x.y).toBe(8)
})

test('subtract works',() => {
    const x = Vector.subtract(w,vec)
    expect(x.array).toEqual([1,2])

})

test('scale works', () => {
    const x = vec.scale(1.2)
    expect(x).toBeInstanceOf(Vector)
    expect(x.array).toEqual([2.4,3.6])

})

test('diagonal works', () => {
    const x = v(3,4)
    expect(x.diagonal).toEqual(5)

    expect(w.diagonal).toBeCloseTo(Math.sqrt(3**2 + 5 **2))

})