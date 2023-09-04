# Needle Engine 
## Local Networking Test Server

### Starting the server
- Option A: Run `START_EXPRESS.bat`  
- Option B: Open the express folder and run `npm i` and then `npm run dev`

### Using the local server
1) Start the server using one of the options above
2) The server console should print a message like `Websocket endpoint is wss://localhost:9001/socket`
3) Copy the base websocket URL and paste it into the Needle Engine **Networking component**: `wss://localhost:9001` in the the *Localhost* field
4) When you now start your Needle Engine local server the browser console should contain a log like `Connected to networking backend wss://localhost:9001/socket`

![image](https://github.com/needle-engine/networking-local/assets/5083203/92a54825-4ef8-4a86-ad53-80e89e3986b7)
