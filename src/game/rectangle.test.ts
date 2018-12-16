import Rectangle from "./Rectangle";
import Vector, {vector} from './vector';

test('default values are 0,0,1,1', () => {

    const r = new Rectangle()
    expect(r).toBeInstanceOf(Rectangle)

    expect(r.left).toBe(0)
    expect(r.top).toBe(0)
    expect(r.width).toBe(1)
    expect(r.height).toBe(1)
})

test('rectangle Array', () => {
    const r = new Rectangle()
    expect(r.array).toEqual([0, 0, 1, 1])
})

const r = new Rectangle(2, 3, 4, 5)

test('custom values', () => {
    expect(r.array).toEqual([2, 3, 4, 5])
    expect(r.right).toBe(6)
    expect(r.bottom).toBe(-2)

})

test('corners', () => {
    expect(r.topLeft).toBeInstanceOf(Vector)
    const c = r.corners
    expect(c[0].array).toEqual([2,3])
    expect(c[1].array).toEqual([6,3])
    expect(c[2].array).toEqual([2,-2])
    expect(c[3].array).toEqual([6,-2])
})

test('move works', () => {
    const moved = r.move(vector(6, 7))
    expect(moved.array).toEqual([8, 10, 4, 5])
})

test('contains incl edges works', () => {
    expect(r.contains(vector(2,3))).toBe(true)
    expect(r.contains(vector(2.2,2.8))).toBe(true)
    expect(r.contains(vector(0,0))).toBe(false)
    expect(r.contains(vector(9,9))).toBe(false)
    expect(r.contains(vector(3,8))).toBe(false)
    expect(r.contains(vector(3,-7))).toBe(false)
})

test('contains excl edges works', () => {
    expect(r.contains(vector(2,3))).toBe(true)
    expect(r.contains(vector(2,3), true)).toBe(true)
    expect(r.contains(vector(2,3), false)).toBe(false)
    expect(r.contains(vector(3,-7),false)).toBe(false)
})

test('overlap excl edges works', () => {
    const b = new Rectangle(0,0,2,3)
    expect(r.overlaps(b)).toBe(false)
})
test('overlap excl edges works inside', () => {
    const c = new Rectangle(0,0,4,5)
    expect(r.overlaps(c)).toBe(true)
})
test('overlap excl edges works inside 2', () => {
    const b = new Rectangle(0,0,2.001,3)
    expect(r.overlaps(b)).toBe(true)
})
test('overlap incl edges works', () => {
    const b = new Rectangle(0,0,2,3)
    expect(r.overlaps(b,true)).toBe(true)
    const c = new Rectangle(0,0,1.999,3)
    expect(r.overlaps(c,true)).toBe(false)
})

// test('overlap including edges works')