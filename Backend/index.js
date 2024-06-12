const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const connectToSockets = require("./Socket/socket");

// essentials
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


// Create sockets
connectToSockets(io);

app.get("/", (req, res) => res.send("<h1>Hello</h1>"));

// Start server
server.listen(PORT, () => console.log("Server started at", PORT));
