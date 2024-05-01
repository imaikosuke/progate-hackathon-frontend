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
  const handleButtonClick = useCallback(() => {
    if (id === "container1") {
      console.log("Container 1 items:", items);
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
        <button onClick={handleButtonClick} className="mt-4 mx-auto block">
          コンソールに出力
        </button>
      )}
    </div>
  );
};

export default SortableContainer;
