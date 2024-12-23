class Field {
  constructor() {
    this.width = 800;
    this.height = 600;
    this.goals = {
      left: { x: 0, y: 250, width: 10, height: 100 },
      right: { x: 790, y: 250, width: 10, height: 100 }
    };
  }

  checkBoundaries(object) {
    if (object.x - object.radius < 0) {
      object.x = object.radius;
      object.velocity.x *= -0.5;
    }
    if (object.x + object.radius > this.width) {
      object.x = this.width - object.radius;
      object.velocity.x *= -0.5;
    }
    if (object.y - object.radius < 0) {
      object.y = object.radius;
      object.velocity.y *= -0.5;
    }
    if (object.y + object.radius > this.height) {
      object.y = this.height - object.radius;
      object.velocity.y *= -0.5;
    }
  }

  checkGoal(ball) {
    if (ball.x < 10 && ball.y > 250 && ball.y < 350) return 2; // Gol equipo 2
    if (ball.x > 790 && ball.y > 250 && ball.y < 350) return 1; // Gol equipo 1
    return 0;
  }
}

module.exports = Field;
