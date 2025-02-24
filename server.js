import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));

app.get("/api/search", async (req, res) => {
  const { track } = req.query;
  const API_KEY = process.env.LASTFM_API_KEY;

  try {
    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "track.search",
        track,
        api_key: API_KEY,
        format: "json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching tracks from Last.fm:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
