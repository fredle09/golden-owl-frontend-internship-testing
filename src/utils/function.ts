export const fetcher = async (url: string) => {
  // Attempt to fetch from the cache only, no network request will be made
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache', // This ensures it will use only the cached data
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("An error occurred while fetching the data.");
    }

    const payload = await res.json();
    return payload.data;
  } catch (error) {
    console.error('Error fetching cached data:', error);
    // Handle case when the data is not in the cache or the network is unavailable
    return null;
  }
};
