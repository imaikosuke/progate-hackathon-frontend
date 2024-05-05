// progate-hackathon-frontend/app/components/RootListItems.tsx
import React from "react";
import RootListItem from "./RootListItem";
import Image from "next/image";

interface RootListItemsProps {
  items: Array<{ order: number; id: number; lat: number; lng: number; place_name: string; }>;
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const RootListItems: React.FC<RootListItemsProps> = ({
  items,
  onSelectLocation,
}) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div>
          <RootListItem
            key={item.id}
            order={item.order}
            id={item.id}
            lat={item.lat}
            lng={item.lng}
            place_name={item.place_name}
            onSelectLocation={onSelectLocation}
          />
          {index !== items.length - 1 && (
            <div className="p-3">
              <Image
                src="/south.png"
                alt="Example Image"
                width={30}
                height={30}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RootListItems;
