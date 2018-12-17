import * as React from 'react';
import positionStyle from './positionStyle';

const Map = (props:any) => {
    const mapStyle = positionStyle(600, 400);
    return (<div className="map" style={mapStyle}>
        {props.children}
    </div>);
}

export default Map