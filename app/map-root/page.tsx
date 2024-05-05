// progate-hackathon-frontend/app/map-root/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import Header from "../layouts/Header";
import RootList from "../layouts/RootList";
import GoogleMaps from "../layouts/GoogleMap";
import Footer from "../layouts/Footer";

const MapRoot = () => {
  const searchParams = useSearchParams();
  const responseParam = searchParams.get("items");
  const route_data = responseParam ? JSON.parse(responseParam) : [];
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>();

  const [mapImage, setMapImage] = useState<string>();
  const googleMapDemoData = route_data.map(
    (item: { latitude: number; longitude: number }) => ({
      lat: item.latitude,
      lng: item.longitude,
    })
  );

  const handleSelectLocation = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  const captureMap = async () => {
    const mapElement = document.querySelector("#map") as HTMLElement;
    if (mapElement) {
      const canvas = await html2canvas(mapElement, {
        scale: 2,
        useCORS: true,
      });
      setMapImage(canvas.toDataURL("image/png"));
    }
  };

  return (
    <div id="map" className="flex flex-col min-h-screen">
      <Header mapImage={mapImage!} captureMap={captureMap} />
      <main className="flex flex-grow">
        <div className="w-2/5 border-r border-gray-300">
          <RootList
            onSelectLocation={handleSelectLocation}
            routeData={route_data}
          />
        </div>
        <div className="w-3/5 p-4">
          <GoogleMaps
            locations={googleMapDemoData}
            selectedLocation={selectedLocation}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapRoot;
