import * as React from 'react';
import './App.css';
import Game from './game/game';

class App extends React.Component {
  public readonly game = new Game()
  public readonly scale = 2;

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
        {JSON.stringify(this.game)}
      </div>
    );
  }
}

export default App;
