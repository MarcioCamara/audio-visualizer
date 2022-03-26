class Bar {
  constructor(x, y, width, height, color, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.index = index;
  }

  update(micInput) {
    const sound = micInput * 700;

    if (sound > this.height) {
      this.height = sound;
    } else {
      this.height -= this.height * 0.03;
    }
  }

  draw(context, volume) {
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.save();

    context.rotate(this.index * 0.043);
    context.beginPath();
    context.bezierCurveTo(this.x / 2, this.y / 2, this.height * -0.5 - 150, this.height + 50, this.x, this.y);
    context.stroke();

    if (this.index > 100) {
      context.beginPath();
      context.arc(this.x, this.y + 10 + this.height / 2, this.height * 0.1, this.height * 0.05, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x, this.y + this.height / 2);
      context.stroke();
    }

    context.restore();
  }
}
