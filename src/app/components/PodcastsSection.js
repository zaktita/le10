'use client';

import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import ReactPlayer from 'react-player';
import GridVideoCard from './GridVideoCard';
import Link from 'next/link';

const fetcher = (url) => {
  console.log('fetch')
  return fetch(url).then((res) => res.json());
};

function getBestThumbnail(thumbs) {
  return (
    thumbs.maxres?.url ||
    thumbs.standard?.url ||
    thumbs.high?.url ||
    thumbs.medium?.url ||
    thumbs.default?.url
  );
}

export default function PodcastsSection() {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  // modify this code with a normal fetch
  const { data: ytData, error } = useSWR('/api/youtube', fetcher);

  const featuredVideo = ytData?.items?.[0];
  const gridVideos = ytData?.items?.slice(0) || [];

  const featuredThumbUrl = featuredVideo ? getBestThumbnail(featuredVideo.snippet.thumbnails) : null;

  return (
    <section className="relative bg-black py-20 ">
      {/* Section Title */}
      <div className="flex items-center gap-8 mb-24 container mx-auto px-6 pt-12 sm:pt-16 md:pt-20 lg:pt-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex-shrink-0">
              Podcasts
            </h1>
            <div className="flex-1 border-t border-dotted border-gray-600"></div>
            <Link href="https://www.youtube.com" passHref target='_blank'>
            <button
              variant="outline"
              className="bg-transparent cursor-pointer border-white text-white hover:bg-white hover:text-black transition-colors duration-300 px-6 py-2 rounded-full flex-shrink-0"
            >
              Tout Voir
            </button>
            </Link>
          </div>

      {/* Conditional Loading/Error/Content Display */}
      {error ? (
        <div className="min-h-[500px] flex items-center justify-center bg-gray-900 text-red-500">Failed to load YouTube videos.</div>
      ) : !ytData ? (
        <div className="min-h-[500px] flex items-center justify-center bg-gray-900 text-white">Loading YouTube videos...</div>
      ) : (
        <>
          {/* Featured Video */}
          <div className=" mx-auto px-6 mb-12">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-cover bg-center">
              {/* ReactPlayer for the featured video - always mounted, URL and playing prop controlled */}
              {featuredVideo && (
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
              )}

              {/* Custom Overlay for Title, Tag, and Play Button (when not playing) */}
              {!isPlayingFeatured && featuredVideo && (
                <div 
                  className="absolute inset-0 z-20 flex p-6 md:p-12 py-12 md:py-24"
                  style={{backgroundImage: `url(${featuredThumbUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} // Background image here
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>
                  {/* Content Container - Ensure this is above the dark overlay */}
                  <div className="relative z-10 flex items-end justify-between w-full"> {/* Added relative z-10 for content */}
                    {/* Title and Tag */}
                    <div className="max-w-2xl">
                      <span className="inline-block bg-yellow-500 text-black px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm mb-2 md:mb-4">VIDEO</span>
                      <h3 className="text-white text-xl md:text-3xl lg:text-5xl">{featuredVideo.snippet.title}</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Grid */}
          <div className="container mx-auto px-6 md:-mt-24 relative z-1000">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gridVideos.map((item) => (
                <GridVideoCard key={item.id.videoId} videoItem={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
} 