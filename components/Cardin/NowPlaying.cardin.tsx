import Image from "next/image";

import useSWR from "swr";

import { BsSpotify } from "../Misc/Icons.collection";
import type { NowPlayingSong } from "../../@types/now-playing-song.type";
import { fetcher } from "../../lib/fetcher";

const NowPlaying = () => {
  const { data, isLoading } = useSWR<NowPlayingSong>("/api/now-playing", fetcher, {
    // The endpoint is cached for 60s upstream; match it instead of polling harder.
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  });

  const playing = data?.isPlaying === true;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/8 bg-white/[0.04] text-lg ${
          playing ? "text-[#1DB954]" : "text-slate-400"
        }`}
      >
        <BsSpotify aria-hidden="true" />
      </span>

      {playing && data ? (
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-0 items-center gap-3"
        >
          {data.albumImageUrl ? (
            <Image
              src={data.albumImageUrl}
              alt={`Album art for ${data.album}`}
              width={40}
              height={40}
              className="hidden rounded-md sm:block"
              unoptimized
            />
          ) : null}

          <span className="min-w-0">
            <span className="block truncate font-jost text-sm font-medium text-white group-hover:text-accent-300">
              {data.title}
            </span>
            <span className="block truncate text-xs text-slate-400">{data.artist}</span>
          </span>
        </a>
      ) : (
        <span className="min-w-0 font-jost text-sm text-slate-400">
          {isLoading ? "Checking Spotify…" : "Nothing playing right now"}
        </span>
      )}
    </div>
  );
};

export default NowPlaying;
