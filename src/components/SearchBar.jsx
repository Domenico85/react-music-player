import { useState } from "react";
import { searchTracks } from "../api/lastfm";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const results = await searchTracks(query);
    setTracks(results);
  };

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ul className="list-group">
        {tracks.map((track, index) => (
          <li key={index} className="list-group-item">
            {track.name} - {track.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
