import GoogleMaps from './layouts/GoogleMap';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import RootList from './layouts/RootList';

const googleMapDemoData = [
  { lat: 35.7100627, lng: 139.8107004 }, // Tokyo Skytree
  { lat: 35.710318, lng: 139.810764 },   // Sumida Aquarium
  // { lat: 35.711258, lng: 139.796736 },    // Kaminarimon (Thunder Gate)
  // { lat: 35.711742, lng: 139.796574 },   // Asakusa Culture Tourist Information Center
  // { lat: 35.696312, lng: 139.792806 },   // Edo-Tokyo Museum
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow">
        <div className='w-2/5 border-r border-gray-300'>
          <RootList />
        </div>
        <div className='w-3/5 p-4'>
          <GoogleMaps locations={googleMapDemoData}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
