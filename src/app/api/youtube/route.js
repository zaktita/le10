import { NextResponse } from 'next/server';

export async function GET() {
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;
  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?key=${YOUTUBE_API_KEY}` +
    `&channelId=${YOUTUBE_CHANNEL_ID}` +
    `&part=snippet,id` +
    `&order=date&maxResults=5&type=video` +
    `&videoDuration=long`

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch YouTube data: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return NextResponse.json({ error: 'Failed to fetch YouTube data' }, { status: 500 });
  }
} 