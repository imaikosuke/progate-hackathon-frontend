"use client";
import { UniqueIdentifier } from "@dnd-kit/core";
import Image from "next/image";
import { supabase } from "@/utils/supabase/server";
import { useEffect, useState } from "react";

export const getData = async (id: UniqueIdentifier) => {
  try {
    const response = await supabase
      .from("address")
      .select("*")
      .eq("id", id)
      .single();
    console.log(response.data.image_url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Item = ({ id }: { id: UniqueIdentifier }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(id);
        setImageUrl(response.image_url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className=" flex items-center justify-center my-2.5 rounded-lg">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={imageUrl ? imageUrl : ""} // Await the fetchData() function call
        width={180}
        height={180}
        alt={""}
        className="max-w-full"
      />
    </div>
  );
};
export default Item;
