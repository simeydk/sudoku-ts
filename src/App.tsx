import * as React from 'react';
import './App.css';
import Map from './components/map'
import Player from './components/player';
import Game from './game/game';

class App extends React.Component {

  public state: any;
  public game = new Game()
  
  constructor(props : any) {
    super(props)

    this.state = {player: this.game.player}

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
    // const {width, height, left, top} = this.state.player
    return (
      <div className="app">
        <Map>
          {/* <Player width={width} height={height} left={left} top={top}/> */}
          <Player {...this.state.player.whlt}/>
          {/* {this.game.enemies.map(e => )} */}
        </Map>
        <pre>
          {JSON.stringify(this.game,null,2)}
        </pre>
      </div>
    )
  }

  public move(x:number,y:number) {
    this.game.attemptMove(x,y,(game) => this.updateState({player: game.player}))
  }

  public onKey(e: KeyboardEvent) {
    // alert('key!')
    const keys  :{[key:string] : [number,number]}= {
      'ArrowLeft': [-10,0],
      'ArrowRight': [10,0],
      'ArrowUp': [0,-10],
      'ArrowDown': [0,10],
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
