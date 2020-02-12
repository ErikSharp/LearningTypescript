import { assert } from "../../utils/asserts";

export function variableDeclarations() {
    //They go over var, let, const which I have already done in LearningJavascript
    //There is nothing new here in TypeScript

    //array destructuring
    let input = [1, 2];
    let [first, second] = input;
    assert(first === 1);
    assert(second === 2);
    assert(input[1] === 2); //the normal way with index

    //swap variables
    [first, second] = [second, first];
    assert(second === 1);
    assert(first === 2);

    //destructure parameters
    function f([a, b]: [number, number]) {
        assert(a === 1);
        assert(b === 2);
    }

    f([1, 2]);

    let [line1, ...rest] = [
        "123 maple street",
        "Little Pickling",
        "CAMBS",
        "CB8 4EH"
    ];
    assert(line1 === "123 maple street");
    assert(rest.length === 3);

    let [firstElement] = ["only me", "don't care", "don't care", "don't care"];

    assert(firstElement === "only me");

    let numbers = [1, 2, 3, 4];
    let [, b, c] = numbers;
    assert(b === 2);
    assert(c === 3);

    //Tuple destructuring
    let tuple: [number, string, boolean] = [7, "hello", true];
    let [a, b, c] = tuple;
    assert(typeof a === "number");
    assert(typeof b === "string");
    let [d, ...ef] = tuple;
    assert(d === 7);
    assert(ef.length === 2);
    assert(ef[1] === true);
    let [g] = tuple;
    assert(g === 7);
    let [, h] = tuple;
    assert(h === "hello");

    //Object destructuring
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };

    let { a, b } = o;
    assert(a === "foo");

    let { c, ...theRest } = o;
    assert(c === "bar");
    assert(theRest.a === "foo");
    assert(theRest.b === 12);

    //renaming
    const { a: newName1, b: newName2 } = o; // these are new names and not type declarations
    assert(newName2 === 12);

    //renaming with specifying the types
    const { a: newName3, c: newName4 }: { a: string; c: string } = o;
    assert(c === "bar");

    //default values
    o.b = undefined;
    const { a: newName5, b: newName6 = 42 } = o;
    assert(newName6 === 42);

    //Function destructuring
    type C = { a: string; b?: number };
    function f({ a, b }: C): void {
        assert(a.substr(1) === "rik");
        assert(b === undefined);
    }

    f({ a: "Erik" });

    //default values
    function f2({ a = "default", b = 42 } = {}): void {
        assert(a === "default");
        assert(b === 5);
    }

    f2({ b: 5 });

    //Spread
}
