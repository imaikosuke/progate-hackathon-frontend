// components/RootListItem.tsx
"use client";
import React from 'react';

interface RootListItemProps {
  number: number;
  address: string;
}

const RootListItem: React.FC<RootListItemProps> = ({ number, address }) => {
  return (
    <div
      onClick={() => {
        console.log(`Item ${number} clicked`);
      }}
      className="bg-white rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-200"
    >
      <span className="font-semibold">{number}</span>
      <span>{address}</span>
    </div>
  );
};

export default RootListItem;
