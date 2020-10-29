import React from 'react';
import { Link } from 'react-router-dom';
import mapIcon from "../utils/mapIcon";
import { Map, Marker, TileLayer } from "react-leaflet";

import { FiEdit3, FiTrash } from 'react-icons/fi';

import '../styles/components/map-item.css';

interface MapItemProps {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
}

const MapItem: React.FC<MapItemProps> = ({ name, id, latitude, longitude }) => {

  return (
    <div id="map-item-component">
      <div className="component-map-container">
        <Map 
          center={[latitude, longitude]} 
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
          <Marker interactive={false} icon={mapIcon} position={[latitude, longitude]} />
        </Map>
      </div>
      <div className="component-map-footer">
        <Link to={`/orphanages/${id}`} className="dashboard-orphanage-name">{name}</Link>
        
        <div className="footer-button-container">
          <Link to="/" className="map-item-footer-button">
            <FiEdit3 color="#15C3D6" size={20} />
          </Link>
          
          <Link to={`/orphanages/delete/${id}`} className="map-item-footer-button">
            <FiTrash color="#15C3D6" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MapItem;