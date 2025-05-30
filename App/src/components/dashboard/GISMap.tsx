import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Site {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'warning';
  lat: number;
  lng: number;
  type: string;
  lastUpdate: string;
}

const mockSites: Site[] = [
  {
    id: 1,
    name: 'Water Treatment Plant A',
    status: 'online',
    lat: 18.0179,
    lng: -76.8099,
    type: 'Treatment Plant',
    lastUpdate: '2 mins ago'
  },
  {
    id: 2,
    name: 'Pump Station B',
    status: 'warning',
    lat: 18.0279,
    lng: -76.7999,
    type: 'Pump Station',
    lastUpdate: '5 mins ago'
  },
  {
    id: 3,
    name: 'Storage Tank C',
    status: 'offline',
    lat: 18.0379,
    lng: -76.7899,
    type: 'Storage',
    lastUpdate: '1 hour ago'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'text-green-600 dark:text-green-400';
    case 'warning': return 'text-amber-600 dark:text-amber-400';
    case 'offline': return 'text-red-600 dark:text-red-400';
    default: return 'text-slate-600 dark:text-slate-400';
  }
};

const GISMap: React.FC = () => {
  return (
    <div className="card">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="font-medium text-slate-900 dark:text-white">System Locations</h2>
      </div>
      
      <div className="p-4">
        <div className="h-[500px] rounded-lg overflow-hidden">
          <MapContainer
            center={[18.0179, -76.8099]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {mockSites.map((site) => (
              <Marker
                key={site.id}
                position={[site.lat, site.lng]}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium text-slate-900">{site.name}</h3>
                    <p className="text-sm text-slate-600">{site.type}</p>
                    <div className="mt-2 flex items-center">
                      <span className={`text-sm ${getStatusColor(site.status)} capitalize`}>
                        {site.status}
                      </span>
                      <span className="mx-2 text-slate-300">•</span>
                      <span className="text-sm text-slate-500">
                        Updated {site.lastUpdate}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default GISMap;