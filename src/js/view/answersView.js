import {createHints, createElement} from "../utils";

export class AnswersView {
    constructor() {
        this.dom = createElement("ul", "answers");
        this._hints = createHints(this.dom); 
    }
    check({exact, correct}) {

        this._hints.forEach((hint, index) => {
            if (exact > index) {
                hint.classList.add("exact");
            } else if (correct > index) {
                hint.classList.add("correct");
            }
        });
    };
}
