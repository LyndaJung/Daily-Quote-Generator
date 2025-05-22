const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (for development; restrict in production)
app.use(cors());

app.get("/quotes", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes/");
    if (!response.ok) throw new Error("Failed to fetch from ZenQuotes");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

app.listen(PORT, () => {
  console.log(`Quote proxy server running at http://localhost:${PORT}/quotes`);
});
