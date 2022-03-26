class Microphone {
  constructor(fftSize) {
    this.initialized = false;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        this.audioContext = new AudioContext();
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = fftSize;

        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        this.microphone.connect(this.analyser);

        this.initialized = true;
      })
      .catch((error) => {
        alert(error);
      });
  }

  getSamples() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSample = [...this.dataArray].map(element => element / 128 - 1);

    return normSample;
  }

  getVolume() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSample = [...this.dataArray].map(element => element / 128 - 1);
    let sum = 0;

    for (let i = 0; i < normSample.length; i++) {
      sum += normSample[i] * normSample[i];
    }

    let volume = Math.sqrt(sum / normSample.length);

    return volume;
  }
}
