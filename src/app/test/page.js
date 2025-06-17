// components/SocialFeed.js
'use client';
import useSWR from 'swr';
import ReactPlayer from 'react-player';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TestPage() {
  const { data: ytData, error } = useSWR('/api/youtube', fetcher);

  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">Failed to load YouTube videos.</div>;
  if (!ytData) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading YouTube videos...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">YouTube Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ytData.items.map((item) => (
          <div key={item.id.videoId} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              controls
              width="100%"
              height="auto"
              className="aspect-video"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{item.snippet.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
