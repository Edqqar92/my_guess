import {createHints, createElement} from "../utils";

const COLORS = ["red", "blue", "green", "yellow", "orange"];

export class GuessesView {
    constructor(rowView) {
        this.code = [];

        this.dom = createElement("ul", "guesses");
        const hints = createHints(this.dom);
        hints.forEach((hint, index) => {
        let x = 0;    
            hint.addEventListener("click", () => {
                if (rowView.active) { 
                    this.code[index] = x;
                    hint.style.background = COLORS[x];
                    x = (x + 1) % 5;
                }
            });
        });
    }
}
