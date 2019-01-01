import * as React from 'react';
import './App.css';
import Game from './components/game';
import boardFromString from './game/boardFromString';
import puzzles from './puzzles/puzzles';

const b = boardFromString(puzzles.med[0])

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Game board={b}/>
      </div>
    );
  }
}

export default App;
