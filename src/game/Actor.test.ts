import Actor from "./Actor";
import Attributes from './Attributes';

test('constructor works', () => {
    const a = new Actor()
    expect(a).toBeInstanceOf(Actor)
    expect(a.health).toBe(100)
    expect(a.attributes).toBeInstanceOf(Attributes)
    expect(a.attributes.array).toEqual([0,0,0])
    expect(a.position.array).toEqual([-100,-100,1,1])
})