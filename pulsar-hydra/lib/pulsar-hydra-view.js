'use babel';

export default class PulsarHydraView {
  constructor(serializedState) {
    // Crear el elemento principal del panel
    this.element = document.createElement('div');
    this.element.style.padding = '10px';
    this.element.style.background = '#1e1e1e';
    this.element.style.color = '#ffffff';
    this.element.style.height = '300px';
    this.element.style.width = '100%';
    this.element.style.boxSizing = 'border-box';

    // Crear un editor embebido
    this.editorElement = document.createElement('atom-text-editor');
    this.editorElement.setAttribute('mini', 'false'); // editor completo
    this.element.appendChild(this.editorElement);

    // Obtener el modelo del editor para manipular texto desde el main
    this.editor = this.editorElement.getModel();

    // Restaurar estado guardado
    if (serializedState && serializedState.text) {
      this.editor.setText(serializedState.text);
    }
  }

  getElement() {
    return this.element;
  }

  serialize() {
    return {
      text: this.editor ? this.editor.getText() : ''
    };
  }

  destroy() {
    if (this.editorElement) this.editorElement.remove();
    if (this.element) this.element.remove();
  }

  // Función auxiliar para obtener la selección actual
  getSelectedText() {
    return this.editor ? this.editor.getSelectedText() : '';
  }

  // Función auxiliar para obtener el bloque de código desde el cursor
  getBlockText() {
    if (!this.editor) return '';

    let text = this.getSelectedText();
    if (text.length > 0) return text;

    const cursor = this.editor.getCursorBufferPosition();
    const buffer = this.editor.getBuffer();
    let endLine = cursor.row;

    while (endLine < buffer.getLineCount() && buffer.lineForRow(endLine).trim() !== '') {
      endLine++;
    }

    text = buffer.getTextInRange([[cursor.row, 0], [endLine, buffer.lineLengthForRow(endLine - 1)]]);
    return text;
  }
}
