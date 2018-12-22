import * as React from 'react';
import Game from '../game/game';
import Enemy from './enemy'
import Item from './item'
import Map from './map'
import Player from './player'


const GameView = (props: {game:Game}) => {
    const {map,player,enemies,items} = props.game
    return (
        <div className="app">
        <Map {...map.whlt}>
          <Player {...player.position.whlt} />
          {enemies.map((e,i) => <Enemy {...e.position.whlt} key={i} />)}
          {items.map((item,i) => <Item {...item.position.whlt} key={i} />)}
          
        </Map>
        <pre>
          {JSON.stringify(props.game,null,2)}
        </pre>
      </div>
    )
}

export default GameView