import * as React from 'react';
// import positionStyle from './positionStyle';

function positionStyle(width: number, height: number, left?: number, top?: number) {
    const style: any = {};
    style.width = width + 'px';
    style.height = height + 'px';
    if (left !== null) {
        style.left = left + 'px';
    }
    if (top !== null) {
        style.top = top + 'px';
    }
    return style;
}

const SizedPositionedDiv = (props:any) => {
    const {className, width, height, top, left} = props
    const style = positionStyle(width, height, left, top)
    return (<div className={className} style={style}>
        {props.children}
    </div>)
}

export default SizedPositionedDiv