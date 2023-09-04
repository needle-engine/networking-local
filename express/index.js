const express = require("express");
const { existsSync, readFileSync } = require("fs");
const http = require("http");

const app = express();
const cors = require('cors')
app.use(cors({
  origin: '*'
}))
app.use(express.static('public'))

let server = null;

const hasCertificate = existsSync("./.certs/key.pem");
if (hasCertificate) {
  const https = require("https");
  const key = readFileSync("./.certs/key.pem");
  const cert = readFileSync("./.certs/cert.pem");
  server = https.createServer({ key, cert }, app)
}
else {
  server = http.createServer(app)
}


const websocketEndpoint = "/socket";
const networking = require("@needle-tools/needle-tiny-networking-ws");
networking.startServerExpress(app, { server: server, endpoint: websocketEndpoint });

let port = process.env.PORT;
if (!port) port = 9001;
const listener = server.listen(port, function () {
  console.log("Listening on port " + listener.address().port);
  console.log("Websocket runs on wss://localhost:" + listener.address().port + " using endpoint: " + websocketEndpoint);
});