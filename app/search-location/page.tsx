// progate-hackathon-frontend/src/app/search-location/page.tsx
'use client';

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px',
};

// 環境変数からGoogle Maps API キーを取得し、undefined の場合は明示的にエラーを出力
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
if (!googleMapsApiKey) {
  throw new Error('Google Maps API key is not defined. Check your environment variables.');
}

const SearchLocation = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [zoom, setZoom] = useState<number>(5);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 38.0,
    lng: 137.0,
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handleConfirmClick = () => {
    if (location) {
      console.log('選択された場所:', location);
    }
  };

  const handleSearch = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const newCenter = results[0].geometry.location;
        setZoom(16);
        setCenter({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
        setLocation({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.isDefaultPrevented) {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mb-4 flex items-center">
        <input
          type="text"
          placeholder="住所を入力"
          className="flex-grow w-4/5 p-2 text-lg border-2 border-gray-300 rounded mr-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-1/5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          検索
        </button>
      </div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onClick={handleMapClick}
        >
          {location && <Marker position={location} />}
        </GoogleMap>
      </LoadScript>
      <button
        className={`mt-4 w-1/2 px-4 py-2 rounded text-white ${
          location ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
        }`}
        disabled={!location}
        onClick={handleConfirmClick}
      >
        決定
      </button>
    </div>
  );
};

export default SearchLocation;
