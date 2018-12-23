import * as React from 'react';
import Game, { EnumStatus } from '../game/game';
import Enemy from './enemy'
import Item from './item'
import Map from './map'
import Player from './player'

function statusClass(s:EnumStatus) : string {
  let str:string = `status-`
  switch (s) {
    case EnumStatus.playing: 
      str += `playing`
      break;
      case EnumStatus.won: 
      str += `won`
      break;
    case EnumStatus.lost: 
      str += `lost`
      break;
    default:
      throw new Error("invalid status");
      break;
  }
  return str
}

const GameView = (props: {game:Game}) => {
    const {map,player,enemies,items, status} = props.game
    const className = `app ` + statusClass(status)
    return (
        <div className={className}>
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