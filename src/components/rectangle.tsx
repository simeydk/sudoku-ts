// import Rectangle from "src/game/rectangle";
import * as React from 'react';

const defaultStyles = {}

const Block = (props:any) => {
    const {bottom, left, height, width, style = {}, scale = 2, children } = props
    const blockStyle = {
        ... defaultStyles,
        bottom : bottom * scale + 'px',
        left : left * scale + 'px',
        height : height * scale + 'px',
        width : width * scale + 'px',
        ... style,
    }
    return (
        <div className = 'block' style = {blockStyle}>
            {children}
        </div>
    )
}

export default Block