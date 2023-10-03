import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";
import Square from "./square";

export default class Food extends Square{
    constructor(scene, x, y){
        super(scene, x, y)
        this.fillColor = 0;
        this.setFillStyle(0xff0000, 1)
    }

    displace(){
        this.x = (Math.floor(Math.random() * DEFAULT_WIDTH/CELL_SIZE)) * CELL_SIZE
        this.y = (Math.floor(Math.random() * DEFAULT_HEIGHT/CELL_SIZE)) * CELL_SIZE
    }
}