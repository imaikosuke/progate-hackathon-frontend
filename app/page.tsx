// progate-hackathon-frontend/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center">
        <img alt="Image 1" src="/logo.svg" width={600} height={400} />
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Travel Root Optimization</h1>
        <div className="mt-4">
          <Link href="/search-location">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Let's Start!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
