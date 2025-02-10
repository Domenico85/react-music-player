import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;
const API_KEY = process.env.LASTFM_API_KEY; // Now process.env works!

app.use(cors());

app.get("/api/search", async (req, res) => {
  const { track } = req.query;

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
    res.status(500).json({ error: "API request failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
