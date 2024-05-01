// app/layouts/GoogleMap.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface GoogleMapsProps {
  locations: Location[];
}

// Google Mapのサイズ
const containerStyle = {
  width: '100%',
  height: '100%',
};

// 東京の座標をデフォルトに設定（ルートを表示する場合はこの値に影響を受けない）
const center = { lat: 35.709, lng: 139.732 };

const GoogleMaps: React.FC<GoogleMapsProps> = ({ locations }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    language: 'ja',
    region: 'JP'
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (locations.length > 1) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: locations[0],
          destination: locations[locations.length - 1],
          waypoints: locations.slice(1, -1).map((location) => ({ location })),
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setError('Failed to fetch directions');
          }
        }
      );
    }
  }, [locations, isLoaded]);

  return (
    <div className="h-full w-full">
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default GoogleMaps;
