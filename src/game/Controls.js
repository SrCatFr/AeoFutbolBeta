class Controls {
  constructor(element) {
    this.element = element;
    this.active = false;
    this.center = { x: 0, y: 0 };
    this.current = { x: 0, y: 0 };
    this.movement = { x: 0, y: 0 };
  }

  start(e) {
    const touch = e.touches[0];
    const rect = this.element.getBoundingClientRect();

    this.active = true;
    this.center.x = touch.clientX;
    this.center.y = touch.clientY;
    this.current = { ...this.center };
  }

  move(e) {
    if (!this.active) return;

    const touch = e.touches[0];
    this.current.x = touch.clientX;
    this.current.y = touch.clientY;

    const dx = this.current.x - this.center.x;
    const dy = this.current.y - this.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 50;

    if (distance > maxDistance) {
      this.movement.x = (dx / distance);
      this.movement.y = (dy / distance);
    } else {
      this.movement.x = dx / maxDistance;
      this.movement.y = dy / maxDistance;
    }
  }

  end() {
    this.active = false;
    this.movement = { x: 0, y: 0 };
  }

  getMovement() {
    return this.movement;
  }
}

module.exports = Controls;
