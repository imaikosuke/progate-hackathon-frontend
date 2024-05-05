// progate-hackathon-frontend/app/search-location/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
if (!googleMapsApiKey) {
  throw new Error(
    "Google Maps API key is not defined. Check your environment variables."
  );
}

const SearchLocation = () => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    name: any;
  } | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 38.0,
    lng: 137.0,
  });
  const [zoom, setZoom] = useState(5);
  const autocompleteInput = useRef<HTMLInputElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && autocompleteInput.current) {
      const newAutocomplete = new google.maps.places.Autocomplete(
        autocompleteInput.current,
        {
          types: ["establishment"],
        }
      );
      newAutocomplete.setComponentRestrictions({ country: ["jp"] });
      newAutocomplete.addListener("place_changed", () => {
        const place = newAutocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const loc = place.geometry.location;
          setCenter({ lat: loc.lat(), lng: loc.lng() });
          setLocation({ lat: loc.lat(), lng: loc.lng(), name: place.name });
          setZoom(16);
        }
      });
    }
  }, [loaded]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        name: location?.name || "Unknown place",
      });
    }
  };

  const handleConfirmClick = async () => {
    if (location) {
      console.log("選択された場所:", location);
      setRedirectUrl(
        `/select-option?lon=${location.lng}&lat=${location.lat}&name=${location.name}`
      );
    }
  };

  useEffect(() => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mb-4 flex items-center">
        <input
          ref={autocompleteInput}
          type="text"
          placeholder="行きたい場所を入力"
          className="flex-grow w-4/5 p-2 text-lg border-2 border-gray-300 rounded mr-2"
        />
      </div>
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={["places"]}
        onLoad={() => setLoaded(true)}
      >
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
          location
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"
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
