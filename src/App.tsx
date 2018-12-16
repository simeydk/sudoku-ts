import * as React from 'react';
import './App.css';
import Game from './game/game';

class App extends React.Component {
  public readonly game = new Game()
  public readonly scale = 2;

  public render() {
    const {height, width} = {height: 200, width:300} // this.game.map
    const style = {
      height:`${height}px`,
      width: `${width}px`, 
    } 
    return (
      <div className="App">
        <div className="map" style={style}>Hello</div>
      </div>
    );
  }
}

export default App;
