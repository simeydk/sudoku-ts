import * as React from 'react';
import SizedPositionedDiv from './SizedPositionedDiv';

const Player = (props:any) => {
    return <SizedPositionedDiv className='item' width={20} height={20} {...props} />
}

export default Player