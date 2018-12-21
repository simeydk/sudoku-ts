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
    const c = rect.compass
    expect(c[0].array).toEqual([2,3])
    expect(c[1].array).toEqual([6,3])
    expect(c[2].array).toEqual([2,-2])
    expect(c[3].array).toEqual([6,-2])
    expect(c[4].array).toEqual([4,3])
    expect(c[5].array).toEqual([4,-2])
    expect(c[6].array).toEqual([2,0.5])
    expect(c[7].array).toEqual([6,0.5])
    
})

test('move works', () => {
    const moved = rect.moveVec(v(6, 7))
    expect(moved.array).toEqual([8, 10, 4, 5])
})

test('contains incl edges works', () => {
    expect(rect.containsVec(v(2,3))).toBe(true)
    expect(rect.containsVec(v(2.2,2.8))).toBe(true)
    expect(rect.containsVec(v(0,0))).toBe(false)
    expect(rect.containsVec(v(9,9))).toBe(false)
    expect(rect.containsVec(v(3,8))).toBe(false)
    expect(rect.containsVec(v(3,-7))).toBe(false)

})

test('contains excl edges works', () => {
    expect(rect.containsVec(v(2,3))).toBe(true)
    expect(rect.containsVec(v(2,3), true)).toBe(true)
    expect(rect.containsVec(v(2,3), false)).toBe(false)
    expect(rect.containsVec(v(3,-7),false)).toBe(false)
})

test('overlap excl edges works', () => {
    const b = new Rectangle(0,0,2,3)
    expect(rect.overlaps(b)).toBe(false)
    expect(r(0,10,10,10).overlaps(r(0,5,10,10),false)).toBe(true)
    expect(r(0,10,10,10).overlaps(r(0,5,10,10),true)).toBe(true)
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

test('contains works', () => {
    const big = new Rectangle(0,5,5,5)
    expect(big.contains(big,true)).toBe(true)
    expect(big.contains(big,false)).toBe(false)
    expect(big.edgesArray).toEqual([0,5,5,0])
    const small = new Rectangle(0,5,2,3)
    const half = new Rectangle(4,4,2,2)
    expect(big.contains(small,true)).toBe(true)
    expect(big.contains(small,false)).toBe(false)
    expect(big.contains(half)).toBe(false)
    expect(big.overlaps(half)).toBe(true)

    expect(big.contains(r(0,2,2,2),true)).toBe(true)
    expect(big.contains(r(0,2,2,2),false)).toBe(false)
    expect(big.contains(r(1,2,1,1),true)).toBe(true)
    expect(big.contains(r(1,2,1,1),false)).toBe(true)

    
    const map = r(0,200,300,200)
    expect(map.edgesArray).toEqual([0,200,300,0])
    
    const player = r(60,10,20,20)
    expect(player.edgesArray).toEqual([60,10,80,-10])


    // expect(r(0,200,300,200).contains(r(60,10,20,20))).toBe(true)

})

test('whlt works', () => {
    expect(rect.whlt).toEqual({left:2,top:3,width:4,height:5})
})

test('array works',() => {
    expect(rect.array).toEqual([2,3,4,5])
    expect(rect.edgesArray).toEqual([2,3,6,-2])
})

test('copy works',() => {
    const copy = rect.copy()
    expect(copy).not.toBe(rect)
    expect(rect.copy().array).toEqual(rect.array)
})