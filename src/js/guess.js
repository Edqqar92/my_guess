import { RowsView } from "./view/rowsView.js";

class Game {
    constructor() {
        this.code = [];

        while (this.code.length < 5) {
            this.code.push(Math.floor(Math.random() * 5));
        } 

        const rowsView = new RowsView(10, this);
            
    }
}

const hola = new Game();
