// progate-hackathon-frontend/app/layouts/RootList.tsx
import React from "react";
import RootListItems from "../components/RootListItems";

// const data = [
//   { number: 1, address: "東京スカイツリー", lat: 35.7100627, lng: 139.8107004 },
//   { number: 2, address: "すみだ水族館", lat: 35.710318, lng: 139.810764 },
//   { number: 3, address: "雷門", lat: 35.711258, lng: 139.796736 },
//   {
//     number: 4,
//     address: "浅草文化観光センター",
//     lat: 35.711742,
//     lng: 139.796574,
//   },
//   { number: 5, address: "江戸東京博物館", lat: 35.696312, lng: 139.792806 },
// ];

interface RootListProps {
  onSelectLocation: (location: { lat: number; lng: number }) => void;
  routeData: { order: number; id: number; lat: number; lng: number }[];
}

const RootList: React.FC<RootListProps> = ({ onSelectLocation, routeData }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">ルート一覧</h2>
      <RootListItems items={routeData} onSelectLocation={onSelectLocation} />
    </div>
  );
};

export default RootList;
