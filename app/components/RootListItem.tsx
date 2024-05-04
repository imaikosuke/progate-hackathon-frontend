// progate-hackathon-frontend/app/components/RootListItem.tsx
"use client";
import React from "react";
import Image from "next/image";

interface RootListItemProps {
  order: number;
  id: number;
  lat: number;
  lng: number;
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const RootListItem: React.FC<RootListItemProps> = ({
  order,
  id,
  lat,
  lng,
  onSelectLocation,
}) => {
  return (
    <div
      onClick={() => onSelectLocation({ lat, lng })}
      className="bg-white rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-200"
    >
      <span className="font-semibold">{order}</span>
      <span>{id}</span>
    </div>
  );
};

export default RootListItem;
