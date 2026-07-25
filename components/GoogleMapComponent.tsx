"use client";
import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const libraries: "places"[] = ["places"];

export interface PlaceResult {
  id: string;
  lat: number;
  lng: number;
  name: string;
  type: string;
  address?: string;
  rating?: number;
  phone?: string;
  website?: string;
  userRatingCount?: number;
  mapsUri?: string;
}

interface GoogleMapProps {
  center: { lat: number; lng: number };
  places: PlaceResult[];
  onMapLoad: (map: google.maps.Map) => void;
}

export default function GoogleMapComponent({ center, places, onMapLoad }: GoogleMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<PlaceResult | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    onMapLoad(map);
  }, [onMapLoad]);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  if (loadError) return <div className="h-full w-full flex items-center justify-center bg-gray-900 text-white text-lg">Error loading maps: Make sure your API key in .env.local is correct.</div>;
  if (!isLoaded) return <div className="h-full w-full flex items-center justify-center bg-gray-900 text-white text-lg">Loading premium Google Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true, // Clean premium look
        zoomControl: true,
        // Premium Dark Mode Styling
        styles: [
            { elementType: "geometry", stylers: [{ color: "#212121" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
            { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
            { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
            { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
            { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
            { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
            { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
            { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
            { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
            { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
        ]
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          onClick={() => setActiveMarker(place)}
          onMouseOver={() => setActiveMarker(place)}
        />
      ))}

      {activeMarker && (
        <InfoWindow
          position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
          onCloseClick={() => setActiveMarker(null)}
        >
          <div className="p-2 text-black max-w-[220px]">
            <h3 className="font-bold text-lg mb-1">{activeMarker.name}</h3>
            {activeMarker.rating && (
              <div className="text-yellow-600 font-semibold text-sm mb-1">
                ⭐ {activeMarker.rating} ({activeMarker.userRatingCount || 0} reviews)
              </div>
            )}
            {activeMarker.address && (
              <p className="text-sm text-gray-600 mb-1">{activeMarker.address}</p>
            )}
            {activeMarker.phone && (
              <p className="text-sm text-blue-700">📞 {activeMarker.phone}</p>
            )}
            {activeMarker.website && (
              <a href={activeMarker.website} target="_blank" rel="noopener noreferrer"
                 className="text-sm text-blue-600 underline">🌐 Website</a>
            )}
            {activeMarker.mapsUri && (
              <a href={activeMarker.mapsUri} target="_blank" rel="noopener noreferrer"
                 className="block text-sm text-green-700 underline mt-1">📍 Open in Google Maps</a>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
