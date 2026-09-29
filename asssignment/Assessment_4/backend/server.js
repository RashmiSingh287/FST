import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// ES Module me __dirname banane ke liye
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// JSON file path
const filePath = path.join(__dirname, "requests.json");

// Read requests from JSON file
const readRequests = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Write requests to JSON file
const writeRequests = (requests) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(requests, null, 2)
  );
};

// Home route
app.get("/", (req, res) => {
  res.send("Campus Request API is running...");
});

// GET all requests
app.get("/api/requests", (req, res) => {
  const requests = readRequests();
  res.json(requests);
});

// GET single request by ID
app.get("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const request = requests.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  res.json(request);
});

// POST - Create new request
app.post("/api/requests", (req, res) => {
  const requests = readRequests();

  const newRequest = {
    id: Date.now(),
    studentName: req.body.studentName,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority,
  };

  requests.push(newRequest);

  writeRequests(requests);

  res.status(201).json(newRequest);
});

// PUT - Update request
app.put("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const id = Number(req.params.id);

  const index = requests.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  requests[index] = {
    ...requests[index],
    studentName: req.body.studentName,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority,
  };

  writeRequests(requests);

  res.json(requests[index]);
});

// DELETE - Delete request
app.delete("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const id = Number(req.params.id);

  const filteredRequests = requests.filter(
    (item) => item.id !== id
  );

  if (requests.length === filteredRequests.length) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  writeRequests(filteredRequests);

  res.json({
    message: "Request deleted successfully",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});