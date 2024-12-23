class Physics {
  static checkCollision(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = obj1.radius + obj2.radius;

    if (distance < minDistance) {
      // Calcular dirección de rebote
      const angle = Math.atan2(dy, dx);
      const speed = Math.sqrt(
        obj1.velocity.x * obj1.velocity.x + 
        obj1.velocity.y * obj1.velocity.y
      );

      return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };
    }

    return null;
  }

  static resolveCollisions(players, ball) {
    players.forEach(player => {
      const collision = this.checkCollision(player, ball);
      if (collision) {
        ball.velocity.x = collision.x;
        ball.velocity.y = collision.y;
      }
    });
  }
}

module.exports = Physics;
