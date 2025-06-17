'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube'; // For YouTube videos
import thumbnailUrl from '../../assets/le10.jpg'
function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);

  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Placeholder video URL
//   const thumbnailUrl = '/assets/le10.jpg'; // Placeholder thumbnail

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <section className="relative flex justify-center py-16 px-4 md:px-8 lg:px-16">
      <div
        className="relative w-full max-w-6xl aspect-video bg-gray-300 rounded-lg overflow-hidden cursor-pointer shadow-lg"
        onClick={openModal}
      >
        <Image
          src={thumbnailUrl}
          alt="Video Thumbnail"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <button className="p-6 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300">
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.2281 14.5429L2.83548 0.540108C2.55392 0.378959 2.21325 0.288086 1.86178 0.289196C1.51032 0.290306 1.16972 0.383321 0.888506 0.546327C0.320448 0.871927 0 1.50346 0 2.18958V29.8104C0 30.4965 0.320448 31.1281 0.888506 31.4537C1.45656 31.7793 2.20367 31.7793 2.77173 31.4537L27.1643 17.451C27.4459 17.2898 27.6806 17.0494 27.8483 16.7584C28.0161 16.4674 28.1121 16.1345 28.1293 15.7915C28.1465 15.4485 28.0845 15.1091 27.9482 14.7952C27.8118 14.4813 27.5991 14.2001 27.3207 13.9772L27.2281 14.5429Z" fill="#1A202C"/>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
          <ReactPlayer
                  url={isPlayingFeatured ? `https://www.youtube.com/watch?v=${featuredVideo.id.videoId}` : null}
                  controls
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  playing={isPlayingFeatured}
                  light={featuredThumbUrl} // Use the best thumbnail here
                  playIcon={
                    // Simple play button for ReactPlayer's light mode
                    <button 
                      className="bg-yellow-500 rounded-full p-4 md:p-6 hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-4 md:ml-8"
                      onClick={() => setIsPlayingFeatured(true)}
                    >
                      <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                      </svg>
                    </button>
                  }
                  onPlay={() => setIsPlayingFeatured(true)}
                  onEnded={() => setIsPlayingFeatured(false)}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, controls: 0 }
                    }
                  }}
                />
          </div>
        </div>
      )}
    </section>
  );
}

export default VideoSection; 