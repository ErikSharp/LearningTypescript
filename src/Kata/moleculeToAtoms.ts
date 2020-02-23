import { assert } from "../utils/asserts";

export function kataMoleculeToAtoms() {
    function parseMolecule(formula: string): any {
        let inGrouping = false;
        let currentAtom = "";
        let inAtom = false;
        let groupStartChars = ["{", "[", "("];
        let groupEndChars = ["}", "]", ")"];

        function isGroupChar(char: string): boolean {
            return false;
        }

        function isGroupStart(char: string): boolean {
            let re = /[{[(]/;
            return re.test(char);
        }

        function isGroupEnd(char: string): boolean {
            let re = /[}])]/;
            return re.test(char);
        }

        function isUpper(char: string): boolean {
            let re = /[A-Z]/;
            return re.test(char);
        }

        function isLower(char: string): boolean {
            let re = /[a-z]/;
            return re.test(char);
        }

        function isDigit(char: string): boolean {
            let re = /[0-9]/;
            return re.test(char);
        }

        let result: any = {};

        for (let index = 0; index < formula.length; index++) {
            let char = formula[index];

            if (isGroupStart(char)) {
            } else if (isGroupEnd(char)) {
            } else if (isUpper(char)) {
                inAtom = true;
                currentAtom = char;
            } else if (isLower(char)) {
                inAtom = false;
            } else if (isDigit(char)) {
            }
        }
    }

    let re = /[A-Z][a-z]/;

    assert(re.test("Mg"));
    assert(!re.test("O"));

    let water = "H2O";
    let result = parseMolecule(water); // return {H: 2, O: 1}
    assert(result.H === 2);
    assert(result.O === 1);

    var magnesiumHydroxide = "Mg(OH)2";
    parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}
    assert(result.Mg === 1);
    assert(result.O === 2);
    assert(result.H === 2);

    var fremySalt = "K4[ON(SO3)2]2";
    parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}
    assert(result.K === 4);
    assert(result.O === 14);
    assert(result.N === 2);
    assert(result.S === 4);
}
