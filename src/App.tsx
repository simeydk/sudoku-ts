import * as React from 'react';
import './App.css';
import GameView from './components/gameView';
import Game from './game/game';



class App extends React.Component {

  public state: any;
  
  constructor(props : any) {
    super(props)

    this.state = {game: new Game()}

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
    const {game} = this.state 
    // const {width, height, left, top} = this.state.player
    return <GameView game={game} />
    // return (
    //   <div className="app">
    //     <Map>
    //       {/* <Player width={width} height={height} left={left} top={top}/> */}
    //       <Player {...game.player.whlt}/>
    //       {/* {this.game.enemies.map(e => )} */}
    //     </Map>
    //     <pre>
    //       {JSON.stringify(game,null,2)}
    //     </pre>
    //   </div>
    // )
  }

  public move(x:number,y:number) {
    this.state.game.attemptMove(x,y,(game: Game) => this.updateState({game}))
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
