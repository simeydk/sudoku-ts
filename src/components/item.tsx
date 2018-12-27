import * as React from 'react';
import SizedPositionedDiv from './SizedPositionedDiv';

const Item = (props:any) => {
    return <SizedPositionedDiv className='item' width={20} height={20} {...props} />
}

export default Item