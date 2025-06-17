'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';

function getBestThumbnail(thumbs) {
  return (
    thumbs.maxres?.url ||
    thumbs.standard?.url ||
    thumbs.high?.url ||
    thumbs.medium?.url ||
    thumbs.default?.url
  );
}

export default function GridVideoCard({ videoItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = getBestThumbnail(videoItem.snippet.thumbnails);

  return (
    <div className="group">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        {videoItem && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoItem.id.videoId}`}
            controls
            width="100%"
            height="100%"
            className="absolute inset-0"
            playing={isPlaying}
            light={thumbnailUrl}
            playIcon={
              <button 
                className="bg-yellow-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity z-99"
                onClick={() => setIsPlaying(true)}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
              </button>
            }
            onPlay={() => setIsPlaying(true)}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
      <h4 className="text-white text-lg mt-4">{videoItem.snippet.title}</h4>
    </div>
  );
} 