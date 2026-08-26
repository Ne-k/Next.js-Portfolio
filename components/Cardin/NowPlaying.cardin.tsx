import Image from "next/image";

import useSWR from "swr";

import type { NowPlayingSong } from "../../@types/now-playing-song.type";
import { fetcher } from "../../lib/fetcher";

const NowPlaying = () => {
  const { data, isLoading } = useSWR<NowPlayingSong>(
    "/api/now-playing",
    fetcher,
    {
      // The endpoint is cached for 60s upstream; match it instead of polling harder.
      refreshInterval: 60_000,
      revalidateOnFocus: false,
    },
  );

  const playing = data?.isPlaying === true;

  return (
    <div className="border-t border-rule pt-4">
      <p className="label flex items-center gap-2.5 text-ink-faint">
        <span
          aria-hidden="true"
          className={`inline-block h-1.5 w-1.5 ${playing ? "bg-signal" : "bg-rule"}`}
        />
        {playing ? "Now playing" : "Spotify"}
      </p>

      {playing && data ? (
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 flex min-w-0 items-center gap-3"
        >
          {data.albumImageUrl ? (
            <Image
              src={data.albumImageUrl}
              alt={`Album art for ${data.album}`}
              width={40}
              height={40}
              className="shrink-0 border border-rule"
              unoptimized
            />
          ) : null}

          <span className="min-w-0">
            <span className="block truncate text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-signal">
              {data.title}
            </span>
            <span className="block truncate text-sm text-ink-faint">
              {data.artist}
            </span>
          </span>
        </a>
      ) : (
        <p className="mt-3 text-[0.9375rem] text-ink-faint">
          {isLoading ? "Checking…" : "Nothing playing right now"}
        </p>
      )}
    </div>
  );
};

export default NowPlaying;
