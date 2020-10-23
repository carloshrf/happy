import React from 'react';
import { Link } from 'react-router-dom';
import mapIcon from "../utils/mapIcon";
import { Map, Marker, TileLayer } from "react-leaflet";

import { FiEdit3, FiTrash } from 'react-icons/fi';

import '../styles/components/map-item.css';

const MapItem: React.FC = () => {
  
  return (
    <div id="map-item-component">
      <div className="component-map-container">
        <Map 
          center={[-3.774991, -38.572768]} 
          zoom={15} 
          style={{ width: '100%', height: '100%' }}
          dragging={false}
          touchZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <TileLayer 
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          <Marker interactive={false} icon={mapIcon} position={[-3.774991, -38.572768]} />
        </Map>
      </div>
      <div className="component-map-footer">
        <Link to="/">Orfanato Tia Julia</Link>
        
        <div className="footer-button-container">
          <button className="map-item-footer-button">
            <FiEdit3 color="#15C3D6" size={20} />
          </button>
          
          <button className="map-item-footer-button">
            <FiTrash color="#15C3D6" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapItem;