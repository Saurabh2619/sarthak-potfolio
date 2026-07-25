"use client";

import { useState, useCallback, useEffect } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import GoogleMapComponent, { PlaceResult } from './GoogleMapComponent';

const FILTERS = [
  { id: 'gym', type: 'gym', label: 'Gyms', icon: '🏋️' },
  { id: 'restaurant', type: 'restaurant', label: 'Dining', icon: '🍽️' },
  { id: 'night_club', type: 'night_club', label: 'Clubs', icon: '🪩' },
  { id: 'hospital', type: 'hospital', label: 'Hospitals', icon: '🏥' },
  { id: 'park', type: 'park', label: 'Parks', icon: '🌲' },
  { id: 'shopping_mall', type: 'shopping_mall', label: 'Malls', icon: '🛍️' },
];

const DEFAULT_CENTER = { lat: 26.4499, lng: 80.3319 }; // Kanpur

export default function MapSearchClient() {
  const [locationInput, setLocationInput] = useState('Kanpur, Uttar Pradesh');
  const [center, setCenter] = useState<{ lat: number; lng: number }>(DEFAULT_CENTER);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMapInstance(map);
  }, []);

  // When center changes or mapInstance loads, if we have an active filter, refetch places in the new area
  useEffect(() => {
    if (mapInstance && activeFilter) {
      fetchPlaces(activeFilter, center);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, mapInstance]); 

  const searchLocation = () => {
    if (!locationInput.trim() || !window.google) return;
    setIsLoading(true);
    
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: locationInput }, (results, status) => {
      setIsLoading(false);
      if (status === 'OK' && results && results[0]) {
        const newCenter = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        setCenter(newCenter);
        if (mapInstance) {
          mapInstance.panTo(newCenter);
        }
      } else {
        alert('Could not find location. Error status: ' + status);
      }
    });
  };

  const fetchPlaces = async (type: string, locationCenter: {lat: number, lng: number}) => {
    if (!window.google) return;
    setIsLoading(true);
    setPlaces([]);
    setActiveFilter(type);

    const { Place, SearchNearbyRankPreference } =
      await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

    try {
      const { places } = await Place.searchNearby({
        fields: [
          "id", "displayName", "location", "formattedAddress", "rating",
          "userRatingCount", "nationalPhoneNumber", "websiteURI", "googleMapsURI"
        ],
        locationRestriction: { center: locationCenter, radius: 5000 }, // 8 km (Kakadeo area)
        includedPrimaryTypes: [type],
        maxResultCount: 20,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
      });

      setPlaces((places || []).map((p) => ({
        id: p.id,
        lat: p.location?.lat() || 0,
        lng: p.location?.lng() || 0,
        name: p.displayName || "Unknown",
        type,
        address: p.formattedAddress || undefined,
        rating: p.rating || undefined,
        phone: p.nationalPhoneNumber || undefined,
        website: p.websiteURI || undefined,
        userRatingCount: p.userRatingCount || undefined,
        mapsUri: p.googleMapsURI || undefined,
      })));
    } catch (e) {
      console.error("Places search failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterToggle = (type: string) => {
    if (activeFilter === type) {
      // Toggle off to clear map without refreshing
      setActiveFilter(null);
      setPlaces([]);
    } else {
      fetchPlaces(type, center);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      
      {/* Floating Control Panel - Enhanced UI */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 w-[95%] max-w-2xl">
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col gap-5">
          
          {/* Header & Location Search */}
          <div className="relative flex items-center group">
            <div className="absolute left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl py-4 pl-12 pr-14 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-white/10 transition-all placeholder:text-gray-500 text-lg shadow-inner"
              placeholder="Search Area (e.g. Kidwai Nagar)"
            />
            <button 
              onClick={searchLocation}
              className="absolute right-3 p-2.5 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>

          {/* Dynamic Filter Pills */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.type;
              return (
                <button
                  key={f.id}
                  onClick={() => handleFilterToggle(f.type)}
                  className={`py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-medium text-sm
                    ${isActive 
                      ? 'bg-blue-600 border border-blue-500 text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)]' 
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                    }`}
                >
                  <span className="text-lg">{f.icon}</span> 
                  {f.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Map Canvas */}
      <div className="h-full w-full">
        <GoogleMapComponent 
          center={center} 
          places={places} 
          onMapLoad={handleMapLoad} 
        />
      </div>

    </div>
  );
}
