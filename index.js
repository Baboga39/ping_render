const express = require("express");
const axios = require("axios");

const app = express();

const URL = "https://trungnamhub-server.onrender.com/health";

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

let isRunning = false;

async function ping() {
  if (isRunning) return;
  isRunning = true;

  try {
    const res = await axios.get(URL, {
      timeout: 5000,
    });

    console.log("✅ Ping success:", res.status, new Date().toISOString());
  } catch (err) {
    console.error("❌ Ping error:", {
      message: err.message,
      status: err.response?.status,
    });
  } finally {
    isRunning = false;
  }
}

// chạy sau khi server start (best practice)
function startPing() {
  ping(); // chạy ngay

  setInterval(ping, 5 * 60 * 1000); // 5 phút
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Ping service running on port " + PORT);
  startPing();
});