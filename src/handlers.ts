import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const SPOTIFY_API = "https://api.spotify.com/v1";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
let ACCESS_TOKEN = "";

// 🎵 Function: Get Spotify Access Token
export async function getSpotifyToken(): Promise<string> {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    ACCESS_TOKEN = response.data.access_token;
    return ACCESS_TOKEN;
  } catch (error) {
    throw new Error("Error getting Spotify token");
  }
}

// 🔍 Function: Search for Songs on Spotify
export async function searchSpotify(query: string) {
  if (!ACCESS_TOKEN) await getSpotifyToken();
  
  try {
    const response = await axios.get(`${SPOTIFY_API}/search`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      params: { q: query, type: "track", limit: 10 },
    });

    return response.data.tracks.items.map((track: any) => ({
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      album: track.album.name,
      uri: track.uri,
    }));
  } catch (error) {
    throw new Error("Error searching Spotify");
  }
}

// ▶️ Function: Play Music (Mock Response)
export async function playMusic(songUri: string) {
  if (!ACCESS_TOKEN) await getSpotifyToken();

  // 🚀 Real implementation would require Spotify Premium & User Authentication
  return { message: `Playing song: ${songUri} (Mock Response - Requires User Token)` };
}
