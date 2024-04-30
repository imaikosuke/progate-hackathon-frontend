// components/RootListItems.tsx
import React from 'react';
import RootListItem from './RootListItem';

interface RootListItemsProps {
  items: Array<{ number: number; address: string }>;
}

const RootListItems: React.FC<RootListItemsProps> = ({ items }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <RootListItem
          key={item.number}
          number={item.number}
          address={item.address}
        />
      ))}
    </div>
  );
}

export default RootListItems;
