
const pvt:{bla:string} = {bla:''}

pvt.bla = 'a'

class MyClass {

    private getState: () => {[index:string]:string}
    private get state() {
        return this.getState()
    }

    constructor() {
        const state: {[index:string]:string} = {value:''}
        state.value = 'a'
        this.getState = () => state
    }

    get value():string {
        return this.state.value
    }
    
    public setValue(v:string) {
        this.state.value = v
    }

}

export default MyClass