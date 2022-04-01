import {GuessesView} from "./guessesView";
import {AnswersView} from "./answersView";
import {createElement, appendChildren} from "../utils";
import {compare} from "../code";

export class RowView {
    constructor(number, game, done) {
        this.dom = createElement("div", "row");
        const numberLine = createElement("div", "numbers", number);
        const buttonBlock = createElement("div", "button_block");
        const button = createElement("button", undefined, "OK");
        
        const guessesView = new GuessesView(this);
        const answersView = new AnswersView();
        
        appendChildren(this.dom, numberLine, guessesView.dom, buttonBlock);
        appendChildren(buttonBlock, answersView.dom, button);
        
        this.setActive(false);
        
        button.addEventListener("click", () => {
            this.setActive(false);    
            done();
            this.result = compare(game.code, guessesView.code);
            console.log(this.result);
            answersView.check(this.result);
        });
        
    }

    setActive(value) {

        // if (value) { 
        //     this.dom.classList.remove("inactive"); 
        // } else {
        //     this.dom.classList.add("inactive");
        // }
        
        this.dom.classList.toggle("inactive", !value);
        this.active = value;
    }
}
