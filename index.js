const express = require("express");
const axios = require("axios");

const app = express();

const URL = "https://trungnamhub-server.onrender.com/health";

// endpoint để service khác ping lại
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

async function ping() {
  try {
    const res = await axios.get(URL);
    console.log("Ping main server:", res.status, new Date().toISOString());
  } catch (err) {
    if (err.response) {
      console.log("Ping failed:", err.response.status);
    } else {
      console.log("Ping error:", err.message);
    }
  }
}

// chạy ngay khi start
ping();

// ping mỗi 5 phút
setInterval(ping, 1 * 60 * 1000);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Ping service running on port " + PORT);
});