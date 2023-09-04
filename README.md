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


## Hosting

### Google Cloud

- Go to https://console.cloud.google.com/run/create  
  ![](./documentation/gcloud_01.webp)  
- Select `Continuously deploy new revisions from a source repository`  
  ![](./documentation/gcloud_02.webp)  
- Click the `SET UP WITH CLOUD BUILD` button
- Select your source repository (it can be this repository or a fork)    
  ![](./documentation/gcloud_03.webp)  
- Click `NEXT`
- Optionally change the branch that should trigger a build. By default it uses your main branch.
- Select in `Build Type`the second options `Go, Node, ... Google Cloud's buildpacks`
- Enter the directory where the server is located. In this case `/express`  
  ![](./documentation/gcloud_04.webp)
- Click `SAVE`
- Select a `Region` where your server should run
- Modify the Autoscaling options to your liking
- Enable `Allow unauthorized invocations`  
  ![](./documentation/gcloud_05.webp)
- Click `CREATE`
- You can now go to the [google cloud builds page](https://console.cloud.google.com/cloud-build/builds) to see your server being deployed and it should shortly after be available on [your cloud run URL](https://console.cloud.google.com/run)


Afterwards you can then enter your new server URL in the Needle Engine Networking component:  
![](./documentation/networking_hosted.webp)
