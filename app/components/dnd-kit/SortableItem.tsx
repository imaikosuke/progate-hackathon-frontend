import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./Item";

const SortableItem = ({ id }: { id: UniqueIdentifier }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className="text-center rounded-lg p-4 cursor-move hover:bg-gray-200 transition-colors bg-white"
    >
      <Item id={id} />
    </div>
  );
};

export default SortableItem;
