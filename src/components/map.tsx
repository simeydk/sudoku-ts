import * as React from 'react';
import SizedPositionedDiv from './SizedPositionedDiv';

const Map = (props:any) => {
    return <SizedPositionedDiv className='map' width={600} height={400} {...props} />
}

export default Map