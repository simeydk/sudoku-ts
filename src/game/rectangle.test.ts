import Rectangle, {r} from './rectangle';
import Vector, {v} from './vector';

test('default values are 0,0,1,1', () => {

// tslint:disable-next-line: no-shadowed-variable
    const rDefault = r()
    expect(rDefault).toBeInstanceOf(Rectangle)

    expect(rDefault.left).toBe(0)
    expect(rDefault.top).toBe(0)
    expect(rDefault.width).toBe(1)
    expect(rDefault.height).toBe(1)
})

test('rectangle Array', () => {
    const rDefault = r()
    expect(rDefault.array).toEqual([0, 0, 1, 1])
})

const rect = r(2, 3, 4, 5)

test('custom values', () => {
    expect(rect.array).toEqual([2, 3, 4, 5])
    expect(rect.right).toBe(6)
    expect(rect.bottom).toBe(-2)

})

test('corners', () => {
    expect(rect.topLeft).toBeInstanceOf(Vector)
    const c = rect.corners
    expect(c[0].array).toEqual([2,3])
    expect(c[1].array).toEqual([6,3])
    expect(c[2].array).toEqual([2,-2])
    expect(c[3].array).toEqual([6,-2])
})

test('move works', () => {
    const moved = rect.moveVec(v(6, 7))
    expect(moved.array).toEqual([8, 10, 4, 5])
})

test('contains incl edges works', () => {
    expect(rect.contains(v(2,3))).toBe(true)
    expect(rect.contains(v(2.2,2.8))).toBe(true)
    expect(rect.contains(v(0,0))).toBe(false)
    expect(rect.contains(v(9,9))).toBe(false)
    expect(rect.contains(v(3,8))).toBe(false)
    expect(rect.contains(v(3,-7))).toBe(false)
})

test('contains excl edges works', () => {
    expect(rect.contains(v(2,3))).toBe(true)
    expect(rect.contains(v(2,3), true)).toBe(true)
    expect(rect.contains(v(2,3), false)).toBe(false)
    expect(rect.contains(v(3,-7),false)).toBe(false)
})

test('overlap excl edges works', () => {
    const b = new Rectangle(0,0,2,3)
    expect(rect.overlaps(b)).toBe(false)
})
test('overlap excl edges works inside', () => {
    const c = new Rectangle(0,0,4,5)
    expect(rect.overlaps(c)).toBe(true)
})
test('overlap excl edges works inside 2', () => {
    const b = new Rectangle(0,0,2.001,3)
    expect(rect.overlaps(b)).toBe(true)
})
test('overlap incl edges works', () => {
    const b = new Rectangle(0,0,2,3)
    expect(rect.overlaps(b,true)).toBe(true)
    const c = new Rectangle(0,0,1.999,3)
    expect(rect.overlaps(c,true)).toBe(false)
})

test('containsRect works', () => {
    const big = new Rectangle(0,5,5,5)
    const small = new Rectangle(1,4,2,2)
    const half = new Rectangle(4,4,2,2)
    expect(big.containsRect(small)).toBe(true)
    expect(big.containsRect(half)).toBe(false)
    expect(big.overlaps(half)).toBe(true)
})

test('whlt works', () => {
    expect(rect.whlt).toEqual({left:2,top:3,width:4,height:5})
})