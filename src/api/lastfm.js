import axios from "axios";

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export const searchTracks = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: "track.search",
        track: query,
        api_key: API_KEY,
        format: "json",
      },
    });
    return response.data.results.trackmatches.track;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};
