import type { NextComponentType } from "next";
import type { NowPlayingSong } from "../../@types/now-playing-song.type";

import Image from "next/image";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

const SpotifyCard: NextComponentType = () => {
  const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);

  return (
    <div className="font-sen mb-8 flex max-w-full flex-row items-center gap-x-2 rounded-md text-center text-lg text-gray-300">
      <Image
        src="/assests/spotify.svg"
        width={40}
        height={40}
        alt="spotify icon"
      />
      {data?.isPlaying ? (
        <a
          href={data.songUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate"
        >
          I&apos;m currently listening to{" "}
          <span className="text-white">{data.title}</span>.
        </a>
        ) : (
        <p>I&apos;m currently not listening to anything.</p>
      )}
    </div>
  );
};

export default SpotifyCard;
