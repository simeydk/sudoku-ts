
const keysToTrack : string[] = ['ArrowRight','ArrowLeft','ArrowUp', 'ArrowDown']

class Controller {

    public pressedKeys : {[key:string]: boolean} = {}
    private pvtRootElement : HTMLElement | Document | null = null
    // get pressedKeys() { return this._pressedKeys}

    constructor(rootElement: HTMLElement | Document | null = null) {
        if(rootElement) {
            this.rootElement = rootElement
        }
        this.trackKeys = this.trackKeys.bind(this)
    }

    get rootElement() : HTMLElement | Document | null {
        return this.pvtRootElement
    }

    set rootElement(rootElement : HTMLElement | Document | null) {
            this.pvtRootElement = rootElement
            if (this.pvtRootElement) {
                this.pvtRootElement.addEventListener('keydown',this.trackKeys.bind(this))
                this.pvtRootElement.addEventListener('keyup',this.trackKeys.bind(this))
                // this.pvtRootElement.addEventListener('keypress',this.onKeyPress.bind(this))
            }
    }

    public trackKeys(e: KeyboardEvent) {
        if (keysToTrack.indexOf(e.key) !== -1) {
            this.pressedKeys[e.key] = (e.type === 'keydown')
            e.preventDefault()
        } 
    }
}


export default Controller