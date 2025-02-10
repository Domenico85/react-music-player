export const searchTracks = async (query) => {
  console.log(`Fetching tracks for: ${query}`);

  try {
    const response = await fetch(
      `http://localhost:5000/api/search?track=${query}`
    );
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    console.log("Fetched data:", data); // Log the fetched data
    return data.results.trackmatches.track || [];
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};
