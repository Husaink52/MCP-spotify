import axios from "axios";

// Function to process Claude chatbot queries
export const handleClaudeQuery = async (userInput: string): Promise<string> => {
  const searchTypes = ["track", "artist", "album"];
  let type = "track"; // Default to song search

  // Determine the type based on user input
  if (userInput.toLowerCase().includes("artist")) {
    type = "artist";
  } else if (userInput.toLowerCase().includes("album")) {
    type = "album";
  }

  try {
    const response = await axios.get(`http://localhost:3000/search`, {
      params: { query: userInput, type: type },
    });

    // Extract the first result
    const results = response.data[type + "s"].items;
    if (results.length > 0) {
      return `Found ${type}: ${results[0].name} by ${results[0].artists?.[0]?.name || "Unknown Artist"}`;
    } else {
      return "No results found.";
    }
  } catch (error) {
    console.error("Error processing Claude's query:", error);
    return "There was an issue processing your request.";
  }
};
