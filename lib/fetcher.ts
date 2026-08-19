/** Minimal JSON fetcher for SWR. Uses the platform `fetch`, no extra runtime dependency. */
const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with ${response.status}`);
  }

  return (await response.json()) as T;
};

export { fetcher };
