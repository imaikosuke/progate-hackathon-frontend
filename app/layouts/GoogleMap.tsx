// progate-hackathon-frontend/app/layouts/GoogleMap.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

interface Location {
  lat: number;
  lng: number;
}

interface GoogleMapsProps {
  locations: Location[];
  selectedLocation?: Location;
}

// Google Mapのサイズ
const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMaps: React.FC<GoogleMapsProps> = ({
  locations,
  selectedLocation,
}) => {
  const defaultCenter = { lat: 35.709, lng: 139.732 };
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    language: "ja",
    region: "JP",
  });

  useEffect(() => {
    if (!isLoaded) return;
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
          setError("Failed to fetch directions");
        }
      }
    );
  }, [locations, isLoaded, selectedLocation]);

  return (
    <div className="h-full w-full">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={10}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              icon={{
                url: "/map_pin.gif",
                scaledSize: new google.maps.Size(64, 64),
              }}
            />
          )}
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default GoogleMaps;
