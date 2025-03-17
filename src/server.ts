import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getSpotifyToken, searchSpotify, playMusic } from "./handlers.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// 🎵 Route: Authenticate & Get Spotify Token
app.get("/auth", async (req, res) => {
  try {
    const token = await getSpotifyToken();
    res.json({ access_token: token });
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate with Spotify" });
  }
});

// 🔍 Route: Search for Songs
app.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) res.status(400).json({ error: "Query is required" });

  try {
    const results = await searchSpotify(query as string);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// ▶️ Route: Play a Song (Mock Response for Now)
app.post("/play", async (req, res) => {
  const { songUri } = req.body;
  if (!songUri) res.status(400).json({ error: "Song URI required" });

  try {
    const response = await playMusic(songUri);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to play song" });
  }
});

app.listen(PORT, () => {
  console.log(`🎧 Spotify MCP Server running on http://localhost:${PORT}`);
});
