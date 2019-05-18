import MyClass from "./classWithClosure";

const c = new MyClass
const d = new MyClass

test('closure', () => {
    expect(c.value).toEqual('a')
    c.setValue('test')
    expect(c.value).toEqual('test')
    expect(d.value).toEqual('a')
    expect(JSON.stringify(c)).toEqual('{}')
})