const axios = require("axios");

const URL = "https://trungnamhub-server.onrender.com/health";

async function ping() {
  try {
    const res = await axios.get(URL);
    console.log("Ping success:", res.status, new Date().toISOString());
  } catch (err) {
    if (err.response) {
      console.log("Ping failed:", err.response.status);
    } else {
      console.log("Ping error:", err.message);
    }
  }
}

// 5 phút
setInterval(ping, 5 * 60 * 1000);

console.log("Ping service started...");