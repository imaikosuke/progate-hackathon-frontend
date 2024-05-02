// progate-hackathon-frontend/app/components/RootListItems.tsx
import React from 'react';
import RootListItem from './RootListItem';

interface RootListItemsProps {
  items: Array<{ number: number; address: string; lat: number; lng: number; }>;
  onSelectLocation: (location: { lat: number; lng: number; }) => void;
}

const RootListItems: React.FC<RootListItemsProps> = ({ items, onSelectLocation }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <RootListItem
          key={item.number}
          number={item.number}
          address={item.address}
          lat={item.lat}
          lng={item.lng}
          onSelectLocation={onSelectLocation}
        />
      ))}
    </div>
  );
}

export default RootListItems;
