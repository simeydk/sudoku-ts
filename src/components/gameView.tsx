import * as React from 'react';
import Game from '../game/game';
import Enemy from './enemy'
import Map from './map'
import Player from './player'


const GameView = (props: {game:Game}) => {
    const {map,player,enemies} = props.game
    return (
        <div className="app">
        <Map {...map.whlt}>
          <Player {...player.whlt} />
          {enemies.map((e,i) => <Enemy {...e.whlt} key={i} />)}
        </Map>
        <pre>
          {JSON.stringify(props.game,null,2)}
        </pre>
      </div>
    )
}

export default GameView