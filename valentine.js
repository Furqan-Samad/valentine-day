const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'database.json');

function ensureDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ memories: [], responses: [] }, null, 2));
  }
}
ensureDB();

/* Get Love Message */
app.get("/message", (req, res) => {
  res.json({
    message: "From the moment you came into my life, everything became magical ❤️"
  });
});

/* Classic valentine endpoint (keeps older clients working) */
app.get('/valentine', (req, res) => {
  res.json({ message: "Happy Valentine's Day My Love ❤️ You make my world beautiful and my life complete!" });
});

/* Save Proposal Answer */
app.post("/save", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  db.responses.push(req.body);
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  res.json({ status: "saved", totalResponses: db.responses.length });
});

/* Save Memory Vault */
app.post("/memory", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  db.memories.push(req.body);
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  res.json({ status: "memory saved", totalMemories: db.memories.length });
});

// serve static assets (optional)
app.use(express.static(path.join(__dirname)));

// only start server when run directly (enables tests)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
