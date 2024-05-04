"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Contaienr from "../components/dnd-kit/Cotainer";
import { getID } from "../../utils/API/getData";

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
