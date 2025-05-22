const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' (or your frontend build folder)
app.use(express.static(path.join(__dirname, "public")));

// Your API route
app.get("/quotes", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes/");
    if (!response.ok) throw new Error("Failed to fetch from ZenQuotes");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch quotes", details: err.message });
  }
});

// Catch-all to serve index.html for any other route (for SPAs)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Quote generator running at http://localhost:${PORT}`);
});
