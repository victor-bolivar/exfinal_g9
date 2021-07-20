// Servidor express
const express = require('express')
const app = express()
const port = 3001

// Socket.io
const http = require("http");
const socketIO = require("socket.io");
let servidorHttp = http.Server(app);
let socketio = socketIO(servidorHttp);

// Rutas
app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))
app.listen(port, () => console.log(`Example app listening on port port!`))