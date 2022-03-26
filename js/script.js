window.addEventListener('load', () => {
  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas1'));
  const ctx = canvas.getContext('2d');
  const snail = document.getElementById('snail');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let fftSize = 512;
  const microphone = new Microphone(fftSize);
  let bars = [];

  function drawText() {
    ctx.font = '16px Verdana';
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop('0', ' red');
    gradient.addColorStop('0.2', 'yellow');
    gradient.addColorStop('0.4', 'green');
    gradient.addColorStop('0.6', 'cyan');
    gradient.addColorStop('0.8', 'blue');
    gradient.addColorStop('1.0', 'magenta');

    ctx.fillStyle = gradient;
    ctx.fillText('A animação reage ao som capturado pelo microfone. Favor autorizar a captura de áudio e espero que goste!', 30, 90);
    ctx.font = '12px Verdana';
    ctx.fillText('Desenvolvido em vanilla js, html e css por @camaraxcodes, baseado no tutorial de Frank\'s Laboratory', 30, 115);
  }

  function createBars() {
    for (let i = 1; i < (fftSize / 2); i++) {
      let color = `hsl(${i * 2}, 100%, 50%)`;
      bars.push(new Bar(0, i * 0.9, 1, 0, color, i));
    }
  }


  let softVolume = 0;
  function animate() {
    if (microphone.initialized) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawText();

      const samples = microphone.getSamples();
      const volume = microphone.getVolume();

      ctx.save();

      ctx.translate(canvas.width / 2 - 70, canvas.height / 2 + 50);

      bars.forEach((bar, index) => {
        bar.update(samples[index]);
        bar.draw(ctx, volume);
      });

      ctx.restore();

      softVolume = softVolume * 0.9 + volume * 0.1;
      snail.style.transform = 'translate(-50%, -50%) scale(' + (1 + softVolume), (1 + softVolume) + ')';
    }

    requestAnimationFrame(animate);
  }

  drawText();
  createBars();
  animate();
});
