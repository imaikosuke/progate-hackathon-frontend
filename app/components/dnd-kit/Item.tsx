"use client";
import { UniqueIdentifier } from "@dnd-kit/core";
import Image from "next/image";
import { supabase } from "@/utils/supabase/server";
import axios from "axios";
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
    <div className="max-w-96 h-[50px] flex items-center justify-center my-2.5 border border-black rounded-lg mx-auto">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={imageUrl ? imageUrl : ""} // Await the fetchData() function call
        width={30}
        height={30}
        alt={""}
        className="max-w-full"
      />
    </div>
  );
};
export default Item;
