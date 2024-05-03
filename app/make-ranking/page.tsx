"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Contaienr from "../components/dnd-kit/Cotainer";
import axios from "axios";

const getID = async (lon: string, lat: string) => {
  try {
    const response = await axios.post("http://localhost:8000/get_narrow", {
      data: {
        longitude: lon,
        latitude: lat,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Page = () => {
  const searchParams = useSearchParams();
  const lon = searchParams.get("lon") as string;
  const lat = searchParams.get("lat") as string;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getID(lon, lat);
      setData(result);
    };
    fetchData();
  }, [lon, lat]);

  return <div>{data && <Contaienr data={data} />}</div>;
};

export default Page;
