import React from "react";
import ChoicePhoto from "../components/ChoicePhoto";

const photo_data = [
  { id: 1, image_url: "https://placehold.jp/150x150.png" },
  { id: 2, image_url: "https://placehold.jp/150x150.png" },
];

const page = () => {
  return (
    <div>
      <h1>写真を選んでください</h1>
      <ul>
        {photo_data.map((item) => (
          <li key={item.id}>
            <ChoicePhoto item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
