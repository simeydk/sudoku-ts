import Attributes from "./Attributes";

test('constructor works with defaults', () => {
    const aDef = new Attributes()
    expect(aDef).toBeInstanceOf(Attributes)
    expect(aDef.strength).toBe(0)
    expect(aDef.armor).toBe(0)
    expect(aDef.luck).toBe(0)
})

const a = new Attributes(10,2,3)

test('constructor works', () => {
    expect(a.object).toEqual({strength:10,armor:2,luck:3})
    expect(a.array).toEqual([10,2,3])
})

test('to-object and to-array works', () => {
    expect(a.object).toEqual({strength:10,armor:2,luck:3})
    expect(a.array).toEqual([10,2,3])
})

test('copy works', () => {
    const b = a.copy()
    expect(b).toBeInstanceOf(Attributes)
    expect(b).not.toBe(a)
    expect(b).toEqual(a)
    expect(b.object).toEqual(a.object)
}) 

test('absorb works', () => {
    const b = a.copy()
    const c = new Attributes(3,2,5)
    b.absorb(c)
    expect(b.array).toEqual([13,4,8]) 
})

const x = new Attributes(3,4,5)
const y = new Attributes(7,1,4)
const z = new Attributes(100,40,20)

test('static sum works', () => {
    const xyz = Attributes.sum(x,y,z)
    expect(xyz.array).toEqual([110,45,29])
})

test('instance method sum works', () => {
    const axy = a.sum(x,y)
    expect(axy.array).toEqual([20,7,12])
    expect(a.array).toEqual([10,2,3])
})