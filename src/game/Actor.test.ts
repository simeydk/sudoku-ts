import Actor from "./Actor";
import Attributes from './Attributes';
import Item from './Item';

test('constructor works', () => {
    const a = new Actor()
    expect(a).toBeInstanceOf(Actor)
    expect(a.health).toBe(100)
    expect(a.attributes).toBeInstanceOf(Attributes)
    expect(a.attributes.array).toEqual([0,0,0])
    expect(a.position.array).toEqual([-100,-100,1,1])
    expect(a.alive).toBe(true)
})

test('set health negative and alive', () => {
    const a = new Actor
    expect(a.health).toBe(100)
    expect(a.alive).toBe(true)
    a.health = -10
    expect(a.health).toBe(0)
    expect(a.alive).toBe(false)
})

test('attack without retaliate', () => {
    const [a,b] = [new Actor(100,10),new Actor(100,10)]
    a.attack(b,false)
    expect(b.health).toEqual(90)
    expect(a.health).toEqual(100)
})

test('attack with retaliate', () => {
    const [a,b] = [new Actor(100,10),new Actor(50,5)]
    a.attack(b,true)
    expect(b.health).toEqual(40)
    expect(a.health).toEqual(95)
})

test('attack with retaliate and death', () => {
    const [a,b] = [new Actor(100,10),new Actor(5,5)]
    a.attack(b,true)
    expect(b.health).toEqual(0)
    expect(b.alive).toEqual(false)
    expect(a.health).toEqual(100)
})

test('has item', () => {
    const a = new Actor(100,10,2,3)
    expect( a.attributes.array).toEqual([10,2,3])
    expect( a.totalItemAttributes.array).toEqual([0,0,0])
    a.items.push(new Item('item',5,1,2))
    expect( a.attributes.array).toEqual([10,2,3])
    expect( a.totalItemAttributes.array).toEqual([5,1,2])
    expect( a.totalAttributes.array).toEqual([15,3,5])

    const b = new Actor
    expect(b.health).toEqual(100)
    a.attack(b)
    expect(b.health).toEqual(85)

})