"use client";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

const SortableContainer = ({
  id,
  items,
  label,
}: {
  id: string;
  items: string[];
  label: string;
}) => {
  const searchParams = useSearchParams();
  const lon = searchParams.get("lon") as string;
  const lat = searchParams.get("lat") as string;
  const time = searchParams.get("time") as string;
  const transportation = searchParams.get("transportation") as string;
  const mainPlaceTime = searchParams.get("mainPlaceTime") as string;
  const name = searchParams.get("name") as string;
  const { setNodeRef } = useDroppable({
    id,
  });

  let containerClassName = "w-[calc(100%-5px)] min-h-full";
  if (id === "container2") {
    containerClassName = "w-[calc(100%-5px)] my-8 min-h-full";
  }

  // ボタンがクリックされたときにコンソールにコンテナ1のアイテムを出力する
  const handleButtonClick = useCallback(async () => {
    if (id === "container1" && items.length === 10) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(apiUrl + "/make_root", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items,
            lon: lon,
            lat: lat,
            name: name,
            time: time,
            transportation: transportation,
            mainPlaceTime: mainPlaceTime,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          // 成功したらリダイレクト
          window.location.href = `/map-root?items=${JSON.stringify(
            responseData.root
          )}`;
        } else {
          console.error("Failed to post data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [id, items]);

  // const root = [
  //   {
  //     number: 1,
  //     address: '東京都台東区上野公園９−８３',
  //     lat: 35.7181172305638,
  //     lng: 139.773761356751,
  //   },
  //   {
  //     number: 2,
  //     address: '東京都江東区豊洲６丁目６−１',
  //     lat: 35.6461239098884,
  //     lng: 139.784210093853,
  //   },
  //   {
  //     number: 3,
  //     address: '東京都中央区佃２丁目１',
  //     lat: 35.6726742311275,
  //     lng: 139.786473177283,
  //   },
  //   {
  //     number: 4,
  //     address: '東京都葛飾区柴又７丁目',
  //     lat: 35.7619694606295,
  //     lng: 139.876150947625,
  //   },
  // ];

  // const handleButtonClick = () => {
  //   window.location.href = `/map-root?items=${JSON.stringify(root)}`;
  // };

  return (
    <div className={containerClassName}>
      <h3 className="text-3xl font-bold text-center mb-4">{label}</h3>

      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div
          className={`grid ${
            id === "container1" ? "bg-blue-300" : "bg-grey-200"
          } w-full border-2 border-gray-500/75 px-4 my-16 rounded-md  text-center relative`}
        >
          {id === "container1" && (
            <div className="text-2xl grid grid-cols-8 text-center absolute top-12 w-[calc(100%-1rem)] pl-4">
              <p>1位</p>
              <p>2位</p>
              <p>3位</p>
              <p>4位</p>
              <p>5位</p>
              <p>6位</p>
              <p>7位</p>
              <p>8位</p>
            </div>
          )}

          <div
            ref={setNodeRef}
            className={`grid ${
              id === "container1"
                ? "grid-cols-8 h-80 pt-36 "
                : "grid-cols-6 min-h-full p-4"
            } gap-2 pb-16`}
            style={{ minHeight: "32px" }}
          >
            {items.map((id: string) => (
              <SortableItem key={id} id={id} />
            ))}
          </div>
        </div>
      </SortableContext>
      {/* ボタンを追加 */}
      {id === "container1" && (
        <button
          onClick={handleButtonClick}
          className={`mt-4 mx-auto block ${
            id === "container1" && items.length === 8
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-600"
          } text-2xl py-2 px-4 rounded`}
          disabled={id !== "container1" || items.length !== 10}
        >
          決定
        </button>
      )}
    </div>
  );
};

export default SortableContainer;
