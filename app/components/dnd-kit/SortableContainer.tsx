import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useCallback } from "react";

const SortableContainer = ({
  id,
  items,
  label,
}: {
  id: string;
  items: string[];
  label: string;
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  let containerClassName = "w-[calc(33%-5px)] min-h-full";
  if (id === "container2") {
    containerClassName = "w-[calc(60%-5px)] mx-8 min-h-full";
  }

  // ボタンがクリックされたときにコンソールにコンテナ1のアイテムを出力する
  const handleButtonClick = useCallback(async () => {
    if (id === "container1" && items.length === 10) {
      try {
        const apiUrl = process.env.NEXT_PABLIC_BACKEND_URL;
        const response = await fetch(apiUrl + "/make_root", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(items),
        });
        if (response.ok) {
          const responseData = await response.json(); // Parse the response JSON data
          // 成功したらリダイレクト
          window.location.href = `/map-root?items=${JSON.stringify(
            responseData.root // Access the 'root' property from the response data
          )}`; // リダイレクト先のURLを設定
        } else {
          console.error("Failed to post data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [id, items]);
  return (
    <div className={containerClassName}>
      <h3 className="text-xl font-bold text-center">{label}</h3>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className="w-full border-2 border-gray-500/75 p-5 my-8 rounded-md h-full text-center"
        >
          {items.map((id: string) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
      {/* ボタンを追加 */}
      {id === "container1" && (
        <button
          onClick={handleButtonClick}
          className={`mt-4 mx-auto block ${
            id === "container1" && items.length === 10
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-600"
          }`}
          disabled={id !== "container1" || items.length !== 10}
        >
          決定
        </button>
      )}
    </div>
  );
};

export default SortableContainer;
