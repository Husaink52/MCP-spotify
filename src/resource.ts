import axios from "axios";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

let accessToken = "";
let refreshToken = "";

// Function to get a new access token
export const getAccessToken = async (code: string): Promise<void> => {
  try {
    const response = await axios.post(
      SPOTIFY_ACCOUNTS_URL,
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
  } catch (error) {
    console.error("Error getting access token:", error);
  }
};

// Function to refresh the access token
export const refreshAccessToken = async (): Promise<void> => {
  try {
    const response = await axios.post(
      SPOTIFY_ACCOUNTS_URL,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    accessToken = response.data.access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};

// Function to search for songs, artists, or albums
export const searchSpotify = async (query: string, type: string): Promise<any> => {
  if (!accessToken) {
    throw new Error("Access token is missing. Authenticate first.");
  }

  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { q: query, type: type, limit: 5 },
    });

    return response.data;
  } catch (error) {
    console.error("Spotify search error:", error);
    throw new Error("Failed to fetch data from Spotify");
  }
};
