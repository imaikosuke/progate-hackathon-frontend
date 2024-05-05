// progate-hackathon-frontend/app/components/RootListItem.tsx
'use client';
import React from 'react';
import Image from 'next/image';

function convertToAlphabeticalOrder(n: number): string {
  if (n <= 0) {
    return '';
  }

  const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  let result = '';
  while (n > 0) {
    const idx = (n - 1) % 26;
    result = alphabet[idx] + result;
    n = Math.floor((n - 1) / 26);
  }

  return result;
}
interface RootListItemProps {
  order: number;
  id: number;
  lat: number;
  lng: number;
  place_name: string;
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const RootListItem: React.FC<RootListItemProps> = ({ order, id, lat, lng, place_name, onSelectLocation }) => {
  return (
    <div
      onClick={() => onSelectLocation({ lat, lng })}
      className="bg-white rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-200"
    >
      <span className="font-semibold">{convertToAlphabeticalOrder(order)}</span>
      <span>{place_name}</span>
    </div>
  );
};

export default RootListItem;
