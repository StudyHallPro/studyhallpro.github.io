class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buf = new Float32Array(2048);
    this._pos = 0;
  }
  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0]) return true;
    const ch = input[0];
    for (let i = 0; i < ch.length; i++) {
      this._buf[this._pos++] = ch[i];
      if (this._pos >= this._buf.length) {
        this.port.postMessage(this._buf.slice(0));
        this._pos = 0;
      }
    }
    return true;
  }
}
registerProcessor('pcm-processor', PCMProcessor);
