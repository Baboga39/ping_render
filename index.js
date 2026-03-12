const axios = require("axios");
const cron = require("node-cron");

const URL = "https://trungnamhub-server.onrender.com";

cron.schedule("*/5 * * * *", async () => {
  try {
    const res = await axios.get(URL);
    console.log("Ping success:", res.status);
  } catch (err) {
    console.log("Ping error:", err.message);
  }
});

console.log("Ping service started...");