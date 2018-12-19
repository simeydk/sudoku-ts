import * as React from 'react';
import SizedPositionedDiv from './SizedPositionedDiv';

const Enemy = (props:any) => {
    return <SizedPositionedDiv className='enemy' width={20} height={20} {...props} />
}

export default Enemy