const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const agent = req.headers["user-agent"];

  const log = `${new Date().toISOString()} | IP: ${ip} | UA: ${agent}\n`;

  fs.appendFileSync("visitors.txt", log);

  res.send("Mire se vini!");
});

app.get("/logs", (req, res) => {
  if (fs.existsSync("visitors.txt")) {
    res.send("<pre>" + fs.readFileSync("visitors.txt", "utf8") + "</pre>");
  } else {
    res.send("Ska vizita ende.");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
