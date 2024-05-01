"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";

interface ChoicePhotoProps {
  item: { id: number; image_url: string };
}

const ChoicePhoto: React.FC<ChoicePhotoProps> = ({ item }) => {
  useEffect(() => {
    const targetElement = document.getElementById(`${item.id}`);

    const handleClick = () => {
      console.log(item.id + "要素がクリックされました");
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      fetch(`${endpoint}/photo_choice/${item.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("サーバーエラーが発生しました");
          }
          return response.json();
        })
        .then(() => {
          console.log("OK");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (targetElement) {
      targetElement.addEventListener("click", handleClick);
    }

    // クリーンアップ関数
    return () => {
      if (targetElement) {
        targetElement.removeEventListener("click", handleClick);
      }
    };
  }, [item.id]);

  return (
    <>
      <Image
        src={item.image_url}
        width={150}
        height={150}
        alt="写真"
        id={`${item.id}`}
      />
    </>
  );
};

export default ChoicePhoto;
