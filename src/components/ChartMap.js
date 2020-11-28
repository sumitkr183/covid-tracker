import React from 'react';
import {Map,TileLayer} from 'react-leaflet';
import {showDataOnMap} from '../utlity';

const ChartMap = ({coutries,contriesName}) => {
    
    const keyMap = Math.random();
    
    return (
        <div className="map">            
            <Map key={keyMap} center={[coutries.lat,coutries.lng]} zoom={coutries.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    /> 
                {showDataOnMap(contriesName)}                           
            </Map>
        </div>
    )
}

export default ChartMap;