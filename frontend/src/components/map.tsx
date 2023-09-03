import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Coordinates, Transformer } from '../../types/types';

import { latLng, marker } from 'leaflet';
import { useState } from 'react';
import { faultyTransformer, normalTransformer } from '../../db/images';

const Map = ReactMapboxGl({
    accessToken: process.env.MAPBOX_ACCESS_TOKEN || '',
});

export interface Marker {
    coordinates: Coordinates;
    img: string;
}

export interface MapProps {
    width: string;
    height: string;
    transformers: Transformer[];
    center: Coordinates;
}
// in render()
const clusterMarker = (coordinates: Coordinates) => 'M';
const MapComponent = ({ width, height, transformers, center }: MapProps) => {
    return (
        <Map
            zoom={[10]}
            style="mapbox://styles/mapbox/streets-v9"
            center={[85, 27.1]}
            containerStyle={{
                height,
                width,
            }}
        >
            {/* <Cluster ClusterMarkerFactory={clusterMarker}> */}
            {transformers.map((transformer, i) => {
                return (
                    <Marker
                        key={marker}
                        coordinates={{
                            lat: transformer.latitude,
                            lon: transformer.longitude,
                        }}
                        anchor="bottom"
                    >
                        <img
                            height={'20px'}
                            width={'20px'}
                            src={transformer.fault ? faultyTransformer : normalTransformer}
                        />
                    </Marker>
                );
            })}
            {/* </Cluster> */}
            <ZoomControl position="top-left" />

            {/* {tr.map((marker, key) => (
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={marker.coordinates} />
                </Layer>
            ))} */}
        </Map>
    );
};

export default MapComponent;

// import { Popup } from "react-mapbox-gl";

// <Popup
//   coordinates={[-0.13235092163085938,51.518250335096376]}
// onClick: ()=>{}
//   offset={{
//     'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
//   }}>
//   <h1>Popup</h1>
// </Popup>