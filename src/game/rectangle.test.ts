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
    expect(rect.bottom).toBe(8)

})

test('corners', () => {
    expect(rect.topLeft).toBeInstanceOf(Vector)
    const c = rect.compass
    expect(c[0].array).toEqual([2,3])
    expect(c[1].array).toEqual([6,3])
    expect(c[2].array).toEqual([2,8])
    expect(c[3].array).toEqual([6,8])
    expect(c[4].array).toEqual([4,3])
    expect(c[5].array).toEqual([4,8])
    expect(c[6].array).toEqual([2,5.5])
    expect(c[7].array).toEqual([6,5.5])
    
})

test('move works', () => {
    const moved = rect.moveVec(v(6, 7))
    expect(moved.array).toEqual([8, 10, 4, 5])
})

test('containsVec incl edges works', () => {
    expect(rect.containsVec(v(2,3))).toBe(true)
    expect(rect.containsVec(v(2.2,3.1))).toBe(true)
    expect(rect.containsVec(v(2.2,2.9))).toBe(false)
    expect(rect.containsVec(v(0,0))).toBe(false)
    expect(rect.containsVec(v(9,9))).toBe(false)
    expect(rect.containsVec(v(3,8))).toBe(true)
    expect(rect.containsVec(v(3,-7))).toBe(false)

})

test('containsVec excl edges works', () => {
    expect(rect.containsVec(v(2,3))).toBe(true)
    expect(rect.containsVec(v(2,3), true)).toBe(true)
    expect(rect.containsVec(v(2,3), false)).toBe(false)
    expect(rect.containsVec(v(3,-7),false)).toBe(false)

    const y = r(110, 180, 20, 20)
    expect(y.containsVec(v(120,180),false)).toBe(false)
    // expect(y.containsVec(v(120,180),true)).toBe(true)
})

test('overlap excl edges works', () => {
    const b = new Rectangle(0,0,2,3)
    expect(rect.overlaps(b)).toBe(false)
    expect(r(0,10,10,10).overlaps(r(0,5,10,10),false)).toBe(true)
    expect(r(0,10,10,10).overlaps(r(0,5,10,10),true)).toBe(true)

    const x = r(120, 160, 20, 20)
    const y = r(110, 180, 20, 20)
    expect(x.overlaps(y,false)).toBe(false)
    expect(x.overlaps(y,true)).toBe(true)
})
test('overlap excl edges works inside', () => {
    const c = new Rectangle(0,0,4,5)
    expect(rect.overlaps(c)).toBe(true)
})
test('overlap excl edges works inside 2', () => {
    const b = new Rectangle(0.1, 0.1, 2, 3)
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
    expect(big.edgesArray).toEqual([0,5,5,10])
    const small = new Rectangle(0,5,2,3)
    const half = new Rectangle(4,4,2,2)
    expect(big.contains(small,true)).toBe(true)
    expect(big.contains(small,false)).toBe(false)
    expect(big.contains(half)).toBe(false)
    expect(big.overlaps(half)).toBe(true)

    expect(big.contains(r(0,5,2,2),true)).toBe(true)
    expect(big.contains(r(0,5,2,2),false)).toBe(false)
    expect(big.contains(r(1,5,1,1),true)).toBe(true)
    expect(big.contains(r(1,5,1,1),false)).toBe(false)
        
})

test('whlt works', () => {
    expect(rect.whlt).toEqual({left:2,top:3,width:4,height:5})
})

test('array works',() => {
    expect(rect.array).toEqual([2,3,4,5])
    expect(rect.edgesArray).toEqual([2,3,6,8])
})

test('copy works',() => {
    const copy = rect.copy()
    expect(copy).not.toBe(rect)
    expect(rect.copy().array).toEqual(rect.array)
})

test('longest radius', () => {
    const x = r(100,100,6,8)
    expect(x.longestRadius).toBe(5)
    expect(x.move(234,23412).longestRadius).toBe(5)
})

test('middleDistanceTo works', () => {
    const x = r(0,0,10,10)
    
    expect(x.MiddleDistanceTo(x.move(100,0))).toBe(100)
    expect(x.MiddleDistanceTo(x.move(0,100))).toBe(100)
    expect(x.MiddleDistanceTo(x.move(30,40))).toBe(50)
    
    const y = r(100,100,20,30)

    expect(x.MiddleDistanceTo(y)).toBeCloseTo(Math.sqrt((110-5)**2+(115-5)**2))

})