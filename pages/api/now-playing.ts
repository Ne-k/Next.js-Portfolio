import type { NextApiRequest, NextApiResponse } from "next";

import type { NowPlayingSong } from "../../@types/now-playing-song.type";
import { getNowPlaying } from "../../lib/spotify";

type NotPlaying = { isPlaying: false };

type SpotifyArtist = { name: string };

type SpotifyResponse = {
  is_playing: boolean;
  item: {
    name: string;
    artists: SpotifyArtist[];
    album: { name: string; images: { url: string }[] };
    external_urls: { spotify: string };
  } | null;
};

const NOT_PLAYING: NotPlaying = { isPlaying: false };

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<NowPlayingSong | NotPlaying>,
) {
  // Cache at the edge so a burst of visitors does not hammer the Spotify API.
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");

  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status >= 400) {
      return res.status(200).json(NOT_PLAYING);
    }

    const song = (await response.json()) as SpotifyResponse;

    if (!song.item) {
      return res.status(200).json(NOT_PLAYING);
    }

    return res.status(200).json({
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url ?? "",
      artist: song.item.artists.map((artist) => artist.name).join(", "),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
    });
  } catch (error) {
    console.error("Now playing lookup failed:", error);

    return res.status(200).json(NOT_PLAYING);
  }
}
