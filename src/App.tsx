import * as React from 'react';
import './App.css';
import Game from './components/game';
import boardFromString from './game/boardFromString';
import puzzles from './puzzles/puzzles';


class App extends React.Component {

  public b = boardFromString(puzzles.med[0])

  public state = {counter:0}

  public constructor(props : any) {
    super(props)
  }

  public render() {
    return (
      <div className="App">
        <Game board={this.b}/>
      </div>
    );
  }

  public componentDidMount() {
    document.addEventListener('keypress',this.handleKeyPress)  
  }
  
  public componentWillUnmount() {
    document.removeEventListener('keypress',this.handleKeyPress)
  }

  private handleKeyPress = (e: KeyboardEvent) => {
    if(e.key === " ") {
      e.preventDefault()
      // alert('space!')
      if(this.b.isWon) {
        alert('won!')
      } else if (e.ctrlKey === true) {
        this.b.solve()
      } else if(this.b.settables.length === 0 ) {
        this.b.updateCanBe()
      } else {
        this.b.applySettablesAll()
      }

      this.setState(prevState => {
        return {
          ...prevState, 
          counter:this.state.counter +1
        }
      })
    }
  }
}

export default App;
