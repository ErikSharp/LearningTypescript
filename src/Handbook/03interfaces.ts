import { assert } from "../utils/asserts";

export function interfaces() {}

(function basicInterfaces() {
    interface LabeledValue {
        label: string;
    }

    //notice that the object has more than the interface
    let myObj = { age: 42, label: "Erik" };

    function checkLabel(labeledObj: { label: string }) {
        assert(labeledObj.label === "Erik");
    }

    checkLabel(myObj);

    //The interface lets us define and resuse this structure
    //notice that our object (myObj) was not declared to implement the interface - only the shape matters
    function checkLabelWithInterface(labeledObj: LabeledValue) {
        assert(labeledObj.label === "Erik");
    }

    checkLabelWithInterface(myObj);
})();

(function optionalProperties() {
    //this is a pattern known as an option bag
    interface CommandLineArgs {
        watch?: string;
        output?: string;
        files?: string[];
    }

    function applyCommandLineArgs(args: CommandLineArgs) {
        //this is that old convert to boolean trick
        assert(!!args.watch);
        assert(!args.output);
        assert(args.files.length === 2);
    }

    //notice that output is not present
    let args = {
        watch: "--watch",
        files: ["index.html", "index.css"]
    };

    applyCommandLineArgs(args);
})();

(function readonlyProperties() {
    //Just remember that properties use readonly and variables use const
    interface Point {
        readonly x: number;
        readonly y: number;
    }

    function translate(point: Point) {
        //compiler picks this up as an error
        //point.x = 5;

        //can only set in object creation
        let newPoint = {
            x: point.x + 2,
            y: point.y + 3
        };

        return newPoint;
    }

    let startPoint = { x: 2, y: 2 };
    let newPoint = translate(startPoint);
    assert(newPoint.x === 4);
    assert(newPoint.y === 5);
    assert(startPoint.x === 2);
    assert(startPoint.y === 2);

    //Readonly Array
    let mutableArray = [1, 2, 3, 4];
    let readonlyArray: ReadonlyArray<number> = mutableArray;
    // readonlyArray[2] = 4; //compiler error
    // readonlyArray.push(4); //compiler error

    let newArray = [];
    //newArray = readonlyArray; //compiler error
    newArray = readonlyArray as number[]; //this works
})();

// https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks
(function excessPropertyChecks() {
    interface Square {
        width?: number;
        height?: number;
        // [propName: string]: any;
    }

    function getAreaOrDefault(x: Square) {
        assert(x.width === 4);
        assert(x.height === undefined);
        assert((x as any).hieght === 3);
    }

    //notice that height is mispelled
    let mySquare = {
        width: 4,
        hieght: 3
    };

    //Because the interface properties are optional and mySquare is a variable, this slips through
    getAreaOrDefault(mySquare);

    //if the argument is an object literal then it is rejected as a compiler error
    // getAreaOrDefault({width: 4, hieght: 3})

    interface SomeKnownThingsAndThenAnythingElse {
        first: string;
        last: string;
        [propName: string]: any; //allows any number of additional properties with ANY type
    }

    function processPerson(x: SomeKnownThingsAndThenAnythingElse) {
        assert(x.first === "Erik");
        assert(x.age === 43);
        assert(x.huh === undefined);
    }

    processPerson({ first: "Erik", last: "Sharp", age: 43, city: "London" });
})();
