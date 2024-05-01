import RootListItems from "../components/RootListItems";

const data = [
  { number: 1, address: "東京スカイツリー" },
  { number: 2, address: "すみだ水族館" },
  { number: 3, address: "雷門" },
  { number: 4, address: "浅草文化観光センター" },
  { number: 5, address: "江戸東京博物館" },
];

const RootList = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">ルート一覧</h2>
      <RootListItems items={data} />
    </div>
  );
}

export default RootList;