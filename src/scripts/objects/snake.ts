import { CELL_SIZE } from "../game";
import Square from "./square";

export default class Snake{
    body: Square[] = []
    speed: number = 1;
    moveTime: number = 0;

    constructor(scene){
        let s1 = new Square(scene, CELL_SIZE*3, CELL_SIZE*3);
        let s2 = new Square(scene, CELL_SIZE*2, CELL_SIZE*3);
        let s3 = new Square(scene, CELL_SIZE*1, CELL_SIZE*3);
        s1.fillColor = 0x00ff00
        this.body.push(s1);
        this.body.push(s2);
        this.body.push(s3);
    }

    public move(time: number, direction: {x: number, y: number}){
        let pos: {x: number, y: number}[] = []
        for(let i=0; i<this.body.length; i++){
            if(i==0){
                pos.push(this.body[i].nextPos(direction));
            }else{
                pos.push({x: this.body[i-1].x, y: this.body[i-1].y})
            }
        }

        for(let i=0; i<this.body.length; i++){
            this.body[i].moveTo(time, pos[i].x, pos[i].y)
        }

        this.moveTime = time + this.speed;
    }

    public getHead(){
        return this.body[0]
    }

    public addSquare(scene){
        let tail = this.getTail()
        let s1 = new Square(scene, tail.x, tail.y);
        this.body.push(s1)
    }

    public getPos(){
        let head = this.body[0]
        return head.getPos()
    }

    private getTail(){
        return this.body[this.body.length-1]
    }

}