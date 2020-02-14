import { assert } from "../utils/asserts";

export function interfaces() {
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

        processPerson({
            first: "Erik",
            last: "Sharp",
            age: 43,
            city: "London"
        });
    })();

    // https://www.typescriptlang.org/docs/handbook/interfaces.html#function-types
    (function functionTypes() {
        //You can tell that this is a function type as there is no name for the function inside
        interface SearchFunc {
            (source: string, subString: string): boolean;
        }

        let mySearch: SearchFunc = (source: string, subString: string) => {
            return true;
        };

        //The names don't have to match
        let mySearch2: SearchFunc = (foo: string, bar: string) => {
            return true;
        };

        //Type inference
        let mySearch3: SearchFunc = (foo, bar) => {
            // let a = foo * 3; //the compiler complains at a string used like a number
            return true;
        };
    })();

    // https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types
    (function indexableTypes() {
        interface StringArray {
            [index: number]: String;
        }

        let myArray: StringArray;
        myArray = ["Erik", "Sharp"];

        let first = myArray[0];

        //I have declared the indexer as a readonly union
        interface NumberOrStringDictionary {
            readonly [index: string]: number | string;
            length: number; // ok, length is a number
            name: string; // ok, name is a string
        }

        let myDictionary: NumberOrStringDictionary;
        myDictionary = {
            name: "Erik",
            length: 193
        };
        //notice that result is a union
        let result = myDictionary[0];
        // myDictionary[1] = 4; //readonly
    })();

    // https://www.typescriptlang.org/docs/handbook/interfaces.html#class-types
    (function classTypes() {
        interface ClockInterface {
            currentTime: Date;
            setTime(d: Date): void;
        }

        class Clock implements ClockInterface {
            currentTime = new Date();

            setTime(newTime: Date) {
                this.currentTime = newTime;
            }
        }

        let myClock: ClockInterface;
        myClock = new Clock();
        myClock.setTime(new Date());
    })();

    (function interfaceExtension() {
        interface Person {
            first: string;
            last: string;
        }

        interface Employee extends Person {
            employeeId: number;
        }

        interface Manager extends Employee {
            reports: Employee[];
        }

        interface Crime {
            guiltyOf: string;
        }

        //can extend more than one
        interface Executive extends Manager, Crime {
            title: string;
        }

        let dBagNo1: Executive = {
            first: "Martin",
            last: "Shkreli",
            employeeId: 1,
            reports: [
                {
                    first: "Jane",
                    last: "Doe",
                    employeeId: 2
                }
            ],
            guiltyOf: "Securities Fraud",
            title: "Douche Bag"
        };
    })();

    // https://www.typescriptlang.org/docs/handbook/interfaces.html#hybrid-types
    (function hybridTypes() {
        interface Counter {
            (start: number): string;
            interval: number;
            reset(): void;
        }

        function getCounter(): Counter {
            let counter = function(start: number) {} as Counter;
            counter.interval = 123;
            counter.reset = function() {};
            return counter;
        }

        //notice that the interface specifies that c is a function as well as an object
        //When interacting with 3rd-party JavaScript, you may need to use patterns like the above to fully describe the shape of the type
        let c = getCounter();
        let result = c(10);
        c.reset();
        c.interval = 5.0;
    })();
}
