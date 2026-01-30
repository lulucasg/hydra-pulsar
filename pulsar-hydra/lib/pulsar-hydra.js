'use babel';

import { CompositeDisposable } from 'atom';

const WS_PORT = 3000;
let socket;

function connectSocket() {
  socket = new WebSocket(`ws://localhost:${WS_PORT}`);

  socket.onopen = () => console.log("Pulsar: WS <<-->> Hydra");
  socket.onerror = (err) => {
    console.error("Error WebSocket:", err);
    setTimeout(connectSocket, 1000); // Reintenta la conexión
  };
  socket.onclose = () => {
    console.log("Pulsar WS cerrado, reintentando en 1s...");
    setTimeout(connectSocket, 1000);
  };
}

export default {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();


    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pulsar-hydra:toggle': () => this.toggle(),
      'pulsar-hydra:send-selection': () => this.sendSelection(),
      'pulsar-hydra:send-block': () => this.sendBlock()
    }));

    // Conectar al WebSocket
    connectSocket();
  },

  deactivate() {
    this.subscriptions.dispose();

    if (socket) {
      socket.close();
      socket = null;
    }
  },

  serialize() {
    return {};
  },

  toggle() {
    console.log("Pulsar-Hydra active!");
  },

  sendSelection() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const text = editor.getSelectedText();
    console.log("Send selection:", text);

    if (text.length > 0 && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(text);
    }
  },

  sendBlock() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    let text = editor.getSelectedText();

    if (!text) {
      const cursor = editor.getCursorBufferPosition();
      const buffer = editor.getBuffer();
      let endLine = cursor.row;

      while (endLine < buffer.getLineCount() && buffer.lineForRow(endLine).trim() !== '') {
        endLine++;
      }

      text = buffer.getTextInRange([[cursor.row, 0], [endLine, buffer.lineLengthForRow(endLine - 1)]]);
    }

    console.log("Send Block:", text);

    if (text.length > 0 && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(text);
    }
  }
};
