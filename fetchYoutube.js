// pages/api/youtube.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;
  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?key=${YOUTUBE_API_KEY}` +
    `&channelId=${YOUTUBE_CHANNEL_ID}` +
    `&part=snippet,id` +
    `&order=date&maxResults=10&type=video`;

  const response = await fetch(url);
  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch YouTube data' });
  }
  const json = await response.json();
  res.status(200).json(json);
}
