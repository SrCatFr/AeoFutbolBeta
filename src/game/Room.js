const Player = require('./Player');
const Ball = require('./Ball');
const Field = require('./Field');
const Physics = require('./Physics');

class Room {
  constructor(id) {
    this.id = id;
    this.players = new Map();
    this.ball = new Ball();
    this.field = new Field();
    this.score = { team1: 0, team2: 0 };
  }

  addPlayer(id) {
    const team = this.players.size % 2 + 1;
    const x = team === 1 ? 200 : 600;
    const y = 300;

    const player = new Player(id, x, y, team);
    this.players.set(id, player);
    return player;
  }

  removePlayer(id) {
    this.players.delete(id);
  }

  update() {
    // Actualizar pelota
    this.ball.update();

    // Comprobar colisiones
    Physics.resolveCollisions(Array.from(this.players.values()), this.ball);

    // Comprobar límites del campo
    this.field.checkBoundaries(this.ball);
    this.players.forEach(player => this.field.checkBoundaries(player));

    // Comprobar goles
    const goal = this.field.checkGoal(this.ball);
    if (goal > 0) {
      this.score[`team${goal}`]++;
      this.resetBall();
    }
  }

  resetBall() {
    this.ball = new Ball();
  }

  getState() {
    return {
      ball: {
        x: this.ball.x,
        y: this.ball.y,
        radius: this.ball.radius
      },
      players: Array.from(this.players.entries()).map(([id, player]) => ({
        id,
        x: player.x,
        y: player.y,
        team: player.team,
        radius: player.radius
      })),
      score: this.score
    };
  }
}

module.exports = Room;
