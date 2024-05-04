"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SortableContainer from "./SortableContainer";
import Item from "./Item";

const Contaienr = ({ data }: { data: any }) => {
  const dataArray = JSON.parse(data);

  const stringArray = dataArray.map((number: number) => String(number));
  // ドラッグ&ドロップでソート可能なリスト
  const [items, setItems] = useState<{
    [key: string]: string[];
  }>({
    // ここに候補の観光地のIDを入れる
    container1: [],
    container2: stringArray,
    container3: [],
  });

  //リストのリソースid（リストの値）
  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  // コンテナ1の個数
  const [container1Count, setContainer1Count] = useState(0);

  // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
  const sensors = useSensors(useSensor(PointerSensor));

  //各コンテナ取得関数
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key: string) =>
      items[key].includes(id.toString())
    );
  };

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    const startcontainer = findContainer(id);
    console.log("start", startcontainer);
    setActiveId(id);
  };

  //ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動時に発火する関数
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    console.log("drag中", activeId);
    console.log("dragover", overId);

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);
    console.log("overContainer", overContainer);
    console.log("activeContainer", activeContainer);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // コンテナ間の移動処理
    setItems((prev) => {
      // 移動元のコンテナの要素配列を取得
      const activeItems = prev[activeContainer];
      // 移動先のコンテナの要素配列を取得
      const overItems = prev[overContainer];
      console.log("overItems", overItems);

      // 配列のインデックス取得
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId.toString());

      // コンテナ1のアイテム数が10未満の場合のみ移動を許可する処理をここに
      if (overContainer === "container1" && overItems.length >= 10) {
        // コンテナ1のアイテム数が10以上の場合は何もしない
        return prev;
      }

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      const newState = {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };

      // コンテナ1の個数を更新
      if (overContainer === "container1" || activeContainer === "container1") {
        setContainer1Count(newState.container1.length);
      }

      return newState;
    });
  };

  // ドラッグ終了時に発火する関数
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    console.log("end", activeContainer, overContainer);

    // 配列のインデックス取得
    const activeIndex = items[activeContainer].indexOf(id);
    const overIndex = items[overContainer].indexOf(overId.toString());

    console.log("activeIndex", activeIndex);
    console.log("overIndex", overIndex);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveId(undefined);
  };

  // ドロップが終了した後の状態を取得
  useEffect(() => {
    console.log("Items after drop", items["container2"]);
  }, [items]);
  return (
    <>
      <div className="mx-16 mt-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* SortableContainer */}
          {/* <p className="text-3xl">個数:{container1Count}</p> */}
          <SortableContainer
            id="container1"
            items={items.container1}
            label="ランキング"
          />

          <SortableContainer
            id="container2"
            label=""
            items={items.container2}
          />
          {/* <SortableContainer
            id="container3"
            items={items.container3}
            label="いらない"
          /> */}

          {/* DragOverlay */}
          {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
        </DndContext>
      </div>
    </>
  );
};

export default Contaienr;
