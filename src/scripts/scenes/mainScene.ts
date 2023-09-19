import FpsText from '../objects/fpsText'
import Square from '../objects/square';
import Grid from '../objects/grid';
import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../game';
export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  private snake: Square[] = [];
  private food: Square;
  grid: Grid;
  direction: { x: number; y: number } = { x: 0, y: 0 };
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  moveTime: number = 0;
  tickDelay: number = 200;
  private score: number = 0;
  private isGameRunnig = true;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.grid = new Grid(this, 0, 0);
    this.fpsText = new FpsText(this);
    this.snake.push(new Square(this, 0, 0, true));
    this.generateFood();
  }

  update(time: number) {
    if (this.cursorKeys.up.isDown) {
      this.direction = { x: 0, y: -1 };
    } else if (this.cursorKeys.down.isDown) {
      this.direction = { x: 0, y: 1 };
    } else if (this.cursorKeys.left.isDown) {
      this.direction = { x: -1, y: 0 };
    } else if (this.cursorKeys.right.isDown) {
      this.direction = { x: 1, y: 0 };
    }
    if (time >= this.moveTime + this.tickDelay && this.direction && this.isGameRunnig) {
      this.moveSnake(time);
    }
    
  }

  private moveSnake(time: number) {
    if(this.checkCollision()){
      this.isGameRunnig = false;
      return;
    }
    const newHeadX = this.snake[0].x + this.direction.x * CELL_SIZE;
    const newHeadY = this.snake[0].y + this.direction.y * CELL_SIZE;
    if (newHeadX === this.food.x && newHeadY === this.food.y) {
      this.generateFood();
      this.snake.unshift(new Square(this, newHeadX, newHeadY, true));
      this.score++;
      console.log("Score : ", this.score);
    } else {
      const removedSegment = this.snake.pop();
      if (removedSegment) {
        removedSegment.destroy();
      }
      this.snake.unshift(new Square(this, newHeadX, newHeadY, true));

      
    }
    this.moveTime = time;
  }

  private generateFood() {
    this.food && this.food.destroy();
    let x, y;
    do {
      x = Phaser.Math.Between(0, DEFAULT_WIDTH / CELL_SIZE - 1) * CELL_SIZE;
      y = Phaser.Math.Between(0, DEFAULT_HEIGHT / CELL_SIZE - 1) * CELL_SIZE;
    } while (this.snake.some(segment => segment.x === x && segment.y === y));

    this.food = new Square(this, x, y, false);
  }

  private checkCollision(): boolean {
    const head = this.snake[0];
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        return true;
      }
    }

    return false;
  }

 
}