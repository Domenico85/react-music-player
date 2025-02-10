import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000; // Backend port

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL (for Vite)
  methods: "GET",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions)); // Enable CORS

// Define the /api/search route
app.get("/api/search", async (req, res) => {
  const { track } = req.query;
  const API_KEY = process.env.LASTFM_API_KEY;

  try {
    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "track.search",
        track, // The search term (track name)
        api_key: API_KEY,
        format: "json",
      },
    });
    res.json(response.data); // Send data back to frontend
  } catch (error) {
    console.error("Error fetching tracks from Last.fm:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
