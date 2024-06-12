const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");
const connectToSockets = require("./Socket/socket");

// essentials
const app = express();
const PORT = 3000;
const mongoURL = "mongodb://127.0.0.1:27017/bingo";
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// MongoDB connection
mongoose
    .connect(mongoURL)
    .then(() => console.log("MongoDB connection established"))
    .catch((err) => console.log("MongoDB connection error:", err));


// Create sockets
connectToSockets(io);

app.get("/", (req, res) => res.send("<h1>Hello</h1>"));

// Start server
server.listen(PORT, () => console.log("Server started at", PORT));
