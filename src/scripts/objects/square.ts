import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

export default class Square extends Phaser.GameObjects.Rectangle{
    
    tickDelay: number = 100;
    moveTime: number = 0;

    constructor(scene, x, y){
        super(scene, x, y)
        scene.add.existing(this)
        this.setOrigin(0,0)
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
        this.setFillStyle(0x0000ff, 1)
    }

    public move(time, direction: {x: number, y: number}){
        this.x += direction.x * CELL_SIZE
        this.y += direction.y * CELL_SIZE

        if(this.x > DEFAULT_WIDTH){
            this.x = 0
        }

        if(this.y > DEFAULT_HEIGHT){
            this.y = 0
        }

        if(this.x < 0) {
            this.x = DEFAULT_WIDTH-CELL_SIZE
        }

        if(this.y < 0){
            this.y = DEFAULT_HEIGHT-CELL_SIZE
        }

        this.moveTime = time + this.tickDelay;
    }

    public nextPos(direction: {x: number, y: number}){
        let x = this.x + direction.x * CELL_SIZE;
        let y = this.y + direction.y * CELL_SIZE; 

        if(x > DEFAULT_WIDTH){
            x = 0
        }

        if(y > DEFAULT_HEIGHT){
            y = 0
        }

        if(x < 0) {
            x = DEFAULT_WIDTH-CELL_SIZE
        }

        if(y < 0){
            y = DEFAULT_HEIGHT-CELL_SIZE
        }

        return {x, y}

    }

    public moveTo(time: number, x: number,y: number){
        this.x = x;
        this.y = y;
    }


    public getPos(){
        return {x: this.x, y: this.y}
    }
}