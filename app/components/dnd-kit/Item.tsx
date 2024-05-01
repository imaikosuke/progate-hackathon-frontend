import { UniqueIdentifier } from "@dnd-kit/core";
import Image from "next/image";

const Item = ({ id }: { id: UniqueIdentifier }) => {
  let image_data: string[] = [
    "https://placehold.jp/150x150.png",
    "https://placehold.jp/200x200.png",
    "https://placehold.jp/250x250.png",
    "https://placehold.jp/300x300.png",
    "https://placehold.jp/350x350.png",
  ];

  return (
    <div className="max-w-96 h-[50px] flex items-center justify-center my-2.5 border border-black rounded-lg mx-auto">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={image_data[id as number]}
        width={30}
        height={30}
        alt={""}
        className="max-w-full"
      />
    </div>
  );
};
export default Item;
