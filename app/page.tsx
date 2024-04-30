import Footer from './layouts/Footer';
import Header from './layouts/Header';
import RootList from './layouts/RootList';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow">
        <div className='w-2/5 border-r border-gray-300'>
          <RootList />
        </div>
        <div className='w-3/5 p-4'>
          <h1 className="text-4xl font-bold">Hello, Progate</h1>
          <p>Here is Google Map Component</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
