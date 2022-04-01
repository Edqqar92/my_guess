import {compare} from '../src/js/code';

it("Hello jest", () => {
    expect("jest").toBe("jest");
});

describe("code", () => {
    describe("compare", () => {
        it("returns expected properties", () => {
            const result = compare([1,2,3,3,2], [3,4,2,3,2]);
            expect(Object.keys(result)).toStrictEqual(["exact", "correct"]);
        });

        it("returns only numbers", () => {
            const result = compare([2,3,0,2,1], [3,0,2,1,2]);
            expect(typeof result.exact).toBe("number");
            expect(typeof result.correct).toBe("number");
        });

        it("has all correct but not exact", () => {
            const result = compare([2,3,0,2,1], [3,0,2,1,2]);
            expect(result.exact).toBe(0);
            expect(result.correct).toBe(5);
        });

        it("has all exact", () => {
            const result = compare([2,3,0,2,1], [2,3,0,2,1]);
            expect(result.exact).toBe(5);
            expect(result.correct).toBe(5);
        });

        it("has some correct and exact", () => {
            const result = compare([2,3,0,2,1], [2,3,0,1,0]);
            expect(result).toEqual({exact: 3, correct: 4});
        });

        it("Array should be lenght 5", () => {
            const code = [2,4,1,2,3];
            const result = compare(code , [2,4,0,0,2]);
            expect(code.length).toBe(5);
        });
    });
});

