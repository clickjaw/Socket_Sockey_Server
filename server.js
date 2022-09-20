const express = require("express");
const app = express();
const cors = require("cors");
const { emit } = require("process");
require("dotenv").config();



const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client Connected");

  socket.emit("join", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnect");

    socket.broadcast.emit("Call ended");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on('answerCall', (data)=>{
    io.to(data.to).emit('callAccepted', data.signal)
  })
});

io.listen(process.env(PORT)

