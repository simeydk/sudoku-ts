import * as React from 'react';
import positionStyle from './positionStyle';

const Player = (props:any) => {
    const {height = 20,width = 20,left = 0,top = 0} = props
    const playerStyle = positionStyle(height,width,left,top)
    return(
    <div className="player" style={playerStyle} >
        @
    </div>
    )
}

export default Player