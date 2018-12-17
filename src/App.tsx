import * as React from 'react';
import './App.css';
import Map from './components/map'
import Player from './components/player';
import Rectangle from './game/rectangle';

class App extends React.Component {

  public state: any;

  constructor(props : any) {
    super(props)
    const player = new Rectangle(40, 40, 20, 20)
    this.state = {player}

    this.updateState = this.updateState.bind(this)
    this.move = this.move.bind(this)
    this.onKey = this.onKey.bind(this)
  }

  public updateState(obj : any) {
    return this.setState((prevState) => ({
      ...prevState,
      ...obj
    }))
  }
  public render() {
    const {width, height, left, top} = this.state.player
    return (
      <div className="app">
        <Map>
          <Player width={width} height={height} left={left} top={top}/>
        </Map>
        <pre>
          {JSON.stringify(this.state,null,2)}
        </pre>
      </div>
    )
  }

  public move(x:number,y:number) {
    const player = this.state.player.move(x,y)
    this.updateState({player})
  }

  public onKey(e: KeyboardEvent) {
    // alert('key!')
    const keys  :{[key:string] : [number,number]}= {
      'ArrowLeft': [-20,0],
      'ArrowRight': [20,0],
      'ArrowUp': [0,-20],
      'ArrowDown': [0,20],
    }
    const move = keys[e.key]
    if(move) {
      this.move(...move)
      e.preventDefault()
    }
  }

  public componentDidMount() {
    document.addEventListener('keydown',this.onKey)
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown',this.onKey)
  }

}

export default App;
