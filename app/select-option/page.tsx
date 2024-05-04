"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const SelectOption = () => {
  const [time, setTime] = useState("1");
  const [transportation, setTransportation] = useState("1");
  const [mainPlaceTime, setMainPlaceTime] = useState("1");
  const searchParams = useSearchParams();
  const lon = searchParams.get("lon") as string;
  const lat = searchParams.get("lat") as string;
  const name = searchParams.get("name") as string;

  const handleSubmit = async (e) => {
    e.preventDefault();

    window.location.href = `/make-ranking?time=${time}&transportation=${transportation}&mainPlaceTime=${mainPlaceTime}&lon=${lon}&lat=${lat}&name=${name}`;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">所要時間：</label>
          <select
            value={time}
            size={1}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="1">1時間</option>
            <option value="1.5">1時間30分</option>
            <option value="2">2時間</option>
            <option value="2.5">2時間30分</option>
            <option value="3">3時間</option>
            <option value="3.5">3時間30分</option>
            <option value="4">4時間</option>
            <option value="4.5">4時間30分</option>
            <option value="5">5時間</option>
            <option value="5.5">5時間30分</option>
            <option value="6">6時間</option>
            <option value="6.5">6時間30分</option>
            <option value="7">7時間</option>
            <option value="7.5">7時間30分</option>
            <option value="8">8時間</option>
            <option value="8.5">8時間30分</option>
            <option value="9">9時間</option>
            <option value="9.5">9時間30分</option>
            <option value="10">10時間</option>
            <option value="10.5">10時間30分</option>
            <option value="11">11時間</option>
            <option value="11.5">11時間30分</option>
            <option value="12">12時間</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">交通手段：</label>
          <select
            value={transportation}
            size={1}
            onChange={(e) => setTransportation(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="1">車</option>
            <option value="0">徒歩</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">メインの場所の所要時間：</label>
          <select
            value={mainPlaceTime}
            size={1}
            onChange={(e) => setMainPlaceTime(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="1">1時間</option>
            <option value="1.5">1時間30分</option>
            <option value="2">2時間</option>
            <option value="2.5">2時間30分</option>
            <option value="3">3時間</option>
            <option value="3.5">3時間30分</option>
            <option value="4">4時間</option>
            <option value="4.5">4時間30分</option>
            <option value="5">5時間</option>
            <option value="5.5">5時間30分</option>
            <option value="6">6時間</option>
            <option value="6.5">6時間30分</option>
            <option value="7">7時間</option>
            <option value="7.5">7時間30分</option>
            <option value="8">8時間</option>
            <option value="8.5">8時間30分</option>
            <option value="9">9時間</option>
            <option value="9.5">9時間30分</option>
            <option value="10">10時間</option>
            <option value="10.5">10時間30分</option>
            <option value="11">11時間</option>
            <option value="11.5">11時間30分</option>
            <option value="12">12時間</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default SelectOption;
