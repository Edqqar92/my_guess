export function compare(code, guess) {
    let exact = 0;

    // Determine how many are exact
    // ...implementation
    for (let x = 0; x < code.length; x += 1) {
        if(code[x] === guess[x]) {
            exact += 1;
        } 
    }

    // Determine how many are correct
    // ...implementation

    const incorrectos = code.slice();
    for (let y = 0; y < guess.length; y += 1) {
        if(incorrectos.includes(guess[y])){
            const index = incorrectos.indexOf(guess[y]);
            incorrectos.splice(index, 1);
        }
    }
    const correct = code.length - incorrectos.length;

    return {exact, correct};
}
