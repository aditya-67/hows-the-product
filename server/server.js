const express = require("express");
const http = require("http");
const cors = require("cors");
const db = require("./database.js");
const socketIO = require("socket.io");

const HTTP_PORT = 8000;

let app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server);

// Create a socket connection to emit and receive events
io.on("connection", (socket) => {
  socket.on("received-review", (data) => {
    if (data != undefined) {
      io.emit("send-review", data);
    }
  });
  socket.on("disconnect", (socket) => {
    io.emit("user", "Disconnect");
  });
});

// Start server
server.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

// Route to get all reviews
app.get("/api/reviews", (req, res, next) => {
  let sql = "select * from reviews";
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Route to post a review
app.post("/api/review/", (req, res, next) => {
  let errors = [];
  if (!req.body.review) {
    errors.push("No review specified");
  }
  if (!req.body.rating) {
    errors.push("No rating specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  let data = {
    rating: req.body.rating,
    review: req.body.review,
  };
  let sql = "INSERT INTO reviews (review, rating) VALUES (?,?)";
  let params = [data.review, data.rating];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
    });
  });
});

// Delete a review
app.delete("/api/review/:id", (req, res, next) => {
  db.run(
    "DELETE FROM reviews WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", rows: this.changes });
    }
  );
});

// Root path
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});
