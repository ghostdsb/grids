import FpsText from '../objects/fpsText'
import Square from '../objects/square';
import Grid from '../objects/grid';
import Snake from '../objects/snake';
import { CELL_SIZE } from '../game';
import Food from '../objects/food';

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  square: Square;
  snake: Snake
  grid: Grid
  food: Food
  score: number = 0
  direction: {x: number, y: number} = {x: 0, y: 0}
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.grid = new Grid(this, 0,0)
    this.fpsText = new FpsText(this)
    this.square = new Square(this, 0, 0);
    this.snake = new Snake(this)
    this.food = new Food(this, CELL_SIZE*6, CELL_SIZE*6);
  }

  update(time, delta) {
    
    if(this.cursorKeys.up.isDown){
      this.direction = {x: 0, y: -1};
    }
    else if(this.cursorKeys.down.isDown){
      this.direction = {x: 0, y: 1};
    }
    else if(this.cursorKeys.left.isDown){
      this.direction = {x: -1, y: 0};
    }
    else if(this.cursorKeys.right.isDown){
      this.direction = {x: 1, y: 0};
    }else{
      // this.direction = {x: 0, y: 0};
    }
    
    if(time >= this.snake.moveTime && this.direction){
      if(this.snake){
        // this.direction = this.botControls()
        this.snake.move(time, this.direction)
        let head = this.snake.getHead();
        if(head.x == this.food.x && head.y == this.food.y){
          this.snake.addSquare(this)
          this.food.displace()
          this.score += 1
        }
        this.fpsText.update(`score: ${this.score}`)
      }
    }
  }
}
