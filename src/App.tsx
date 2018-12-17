import * as React from 'react';
import './App.css';
import Controller from './controller/controller';
import Game from './game/game';
import { vector } from './game/vector';

class App extends React.Component {
  public readonly game = new Game()
  public readonly controller = new Controller(document)
  public readonly scale = 2;

  constructor(props: any) {
    super(props)
    const {game,controller} = this
    this.state = {game, controller}
    this.setState = this.setState.bind(this)
    this.updateState = this.updateState.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  public updateState() {
    this.setState({
      controller: this.controller,
      game: this.game,
    })
  }

  public componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
    setInterval(this.updateState,50)
  }

  public handleKeyPress(e: KeyboardEvent) {
    if(e.key === ' ') {
      console.log('space!')
      this.game.player = this.game.player.move(vector(10,10))
      e.preventDefault()
    }
  }

  public render() {
    const {height, width} = this.game.map
    const mapStyle = {
      height: `${height * this.scale}px`,
      width: `${width * this.scale}px`
    }
    const playerStyle = {
      height: `${this.game.player.height * this.scale}px`,
      width: `${this.game.player.width * this.scale}px`
    }
    return (
      <div className="App">
        <div className="map" style={mapStyle}>
          <div className="player" style={playerStyle}>
            @
          </div>
        </div>
        <pre>
          <code>
            {/* {JSON.stringify({game:this.game,controller:this.controller},null,'\t')} */}
            {JSON.stringify(this.state,null,'\t')}
          </code>
        </pre>
      </div>
    );
  }
}

export default App;
