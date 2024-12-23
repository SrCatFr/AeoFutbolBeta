class Player {
  constructor(id, x, y, team) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.team = team;
    this.radius = 15;
    this.speed = 5;
    this.velocity = { x: 0, y: 0 };
  }

  move(dx, dy) {
    this.velocity.x = dx * this.speed;
    this.velocity.y = dy * this.speed;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

module.exports = Player;
