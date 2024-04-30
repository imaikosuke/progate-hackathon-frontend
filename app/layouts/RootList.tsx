import RootListItems from "../components/RootListItems";

const data = [
  { number: 1, address: "東京都板橋区hoge" },
  { number: 2, address: "東京都渋谷区hoge" },
  { number: 3, address: "東京都新宿区hoge" },
  { number: 4, address: "東京都中野区hoge" },
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