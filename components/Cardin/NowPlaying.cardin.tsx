import Image from "next/image";

import useSWR from "swr";

import type { NowPlayingSong } from "../../@types/now-playing-song.type";
import { fetcher } from "../../lib/fetcher";

const SpotifyCard = () => {
  const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);

  return (
    <div className="mb-8 flex max-w-full flex-row items-center gap-x-2 rounded-md font-sen text-center text-lg text-gray-300">
      <Image src="/assests/spotify.svg" width={40} height={40} alt="Spotify icon" />
      {data?.isPlaying ? (
        <a href={data.songUrl} target="_blank" rel="noreferrer" className="truncate">
          Currently listening to <span className="text-white">{data.title}</span>.
        </a>
      ) : (
        <p>Not listening to anything on Spotify right now.</p>
      )}
    </div>
  );
};

export default SpotifyCard;
