const WebSocket = require('ws');

const PORT = 3000;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", ws => {
  console.log("server >>> connected");

  ws.on("message", msg => {
    console.log("server >>> mensaje recibido:", msg.toString());
    // reenviar a todos los clientes
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

console.log(`server >>> listening /localhost:${PORT}`);
