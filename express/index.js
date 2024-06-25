import express from "express";
import { existsSync, readFileSync } from "fs";
import http from "http";
import cors from 'cors';
import https from "https";

const app = express();
app.use(cors({
  origin: '*'
}))
app.use(express.static('public'))

let server = null;

const hasCertificate = existsSync("./.certs/key.pem");
if (hasCertificate) {
  const key = readFileSync("./.certs/key.pem");
  const cert = readFileSync("./.certs/cert.pem");
  server = https.createServer({ key, cert }, app)
}
else {
  server = http.createServer(app)
}


const websocketEndpoint = "/socket";
import * as networking from "@needle-tools/networking";
networking.startServerExpress(app, { server: server, endpoint: websocketEndpoint });

let port = process.env.PORT;
if (!port) port = 9001;
const listener = server.listen(port, function () {
  console.log("Listening on port " + listener.address()?.port);
  console.log("Websocket runs on wss://localhost:" + listener.address()?.port + " using endpoint: " + websocketEndpoint);
});