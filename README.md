# hydra-pulsar
Send code to hydra via websocket

Requeriments:

Hydra running locally. Download repo:

https://github.com/hydra-synth/hydra

then run it from console:

...\github\hydra> npm run dev

Instructions:

- Copy "pulsar-hydra" folder into users\user\.pulsar\packages
- Install dependencies:

...\hydra-pulsar\server> npm install

- Run the server:

...\hydra-pulsar\server> node server.js

- Copy "hydra-wrapper.html" to the folder hydra\public\
- On google chrome copy this link: http://localhost:5173/hydra-wrapper.html

- Open Pulsar and go to packages->toggle and click it
- Select a portion of hydra code and press alt+enter to send it!