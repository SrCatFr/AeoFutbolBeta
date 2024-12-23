class Ball {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.radius = 10;
    this.velocity = { x: 0, y: 0 };
    this.friction = 0.98;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Aplicar fricción
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
  }

  kick(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + this.radius) {
      const power = 15;
      this.velocity.x = (dx / distance) * power;
      this.velocity.y = (dy / distance) * power;
    }
  }
}

module.exports = Ball;
