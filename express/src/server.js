const express = require("express");
const { existsSync, readFileSync } = require("fs");
// const http = require("http");
const https = require("https");

const key = existsSync("./key.pem") ? readFileSync("./key.pem") : undefined;
const cert = existsSync("./cert.pem") ? readFileSync("./cert.pem") : undefined;
const app = express();

const cors = require('cors')
app.use(cors({
  origin: '*'
}))

app.get("/", (request, response) => {
  console.log("GET /");
  response.send("OK");
});
const server = https.createServer({ key, cert }, app)
// const server = http.createServer(this.express)

const websocketEndpoint = "/socket";

const networking = require("@needle-tools/needle-tiny-networking-ws");
networking.startServerExpress(app, { server: server, endpoint: websocketEndpoint });

let port = process.env.PORT;
if (!port) port = 9001;
const listener = server.listen(port, function () {
  console.log("Listening on port " + listener.address().port);
  console.log("Websocket endpoint is wss://localhost:" + listener.address().port + websocketEndpoint);
});