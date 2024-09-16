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
const networking = require("@needle-tools/networking");
networking.startServerExpress(app, { server: server, endpoint: websocketEndpoint });

/**
 * @type {string|undefined|number}
 */
let port = process.env.PORT;
if (!port?.length) port = 9001;
const listener = server.listen(port, function () {
  const address = listener.address();
  if (!address) {
    console.error("Failed to start server");
    return;
  }
  if (typeof address === "string") {
    console.log("Listening on " + address);
    return;
  }
  const port = address.port;
  console.log("Server started on https://localhost" + ":" + port);
  console.log("Websocket runs on wss://localhost:" + port + " using endpoint: " + websocketEndpoint);
});