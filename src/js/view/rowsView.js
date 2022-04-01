import {RowView} from "./rowView.js";

export class RowsView {
    constructor(rowCount, game) {
        this.dom = document.querySelector(".rows");
        this.rows = []; 
        this.index = 0;
        
        for (let x = 1; x <= rowCount; x++) {
            const rowView = new RowView(x, game, this._next.bind(this));
            this.dom.appendChild(rowView.dom);
            this.rows.push(rowView);
        }
        this._next();
    }
    _next() {
        this.rows[this.index].setActive(true);
        this.index += 1;
    }
}