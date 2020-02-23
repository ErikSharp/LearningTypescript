import { assert } from "../utils/asserts";

export function functions() {
    (function typingFunctions() {
        let z = 100;

        //notice that we didn't have specify the return type as it figured it out
        function addToZ(x: number, y: number) {
            return x + y + z;
        }

        assert(addToZ(1, 2) === 103);

        //let's declare the function type manually
        let myAdd: (baseValue: number, incrementBy: number) => number = addToZ;
        assert(myAdd(1, 2) === 103);
    })();

    (function optionalParameters() {
        //optional parameters must follow required parameters!
        function buildName(firstName: string, lastName?: string) {
            if (lastName) {
                return `${firstName} ${lastName}`;
            } else {
                return firstName;
            }
        }

        //now we can omit the lastName
        assert(buildName("Erik") === "Erik");
        assert(buildName("Erik", "Sharp") === "Erik Sharp");
    })();

    (function defaultParamters() {
        function getPerson(name: string, male = true) {
            return {
                name: name,
                male: male
            };
        }

        let typedOut: (
            a: string,
            b?: boolean
        ) => { name: string; male: boolean };

        typedOut = getPerson;

        assert(!getPerson("Lynsey", false).male);
        assert(typedOut("Erik").male);

        //it's easier to have optional parameters at the end so that the function
        //can be called with the optional being specified otherwise you have to do this
        function foo(name = "Erik", age: number) {
            return 4;
        }

        foo(undefined, 4);
    })();

    (function restParameters() {
        function recordScores(name: string, ...scores: number[]) {
            return "recorded";
        }

        let alias: (a: string, ...b: number[]) => string;
        alias = recordScores;

        assert(recordScores("Erik") === "recorded");
        assert(recordScores("Erik", 1, 2, 3, 4) === "recorded");
    })();

    //https://www.typescriptlang.org/docs/handbook/functions.html#this
    (function thisKeyword() {
        let objA = {
            name: "Erik",
            createHelloFunc() {
                //regular functions do not capture this, so it will be the dynamic object context
                return function() {
                    return this && this.name ? `Hello ${this.name}` : "no name";
                };
            }
        };

        assert(objA.createHelloFunc()() === "no name");

        //Create an object to set this
        let makeItWork = {
            name: "Lynsey",
            hello: objA.createHelloFunc()
        };

        assert(makeItWork.hello() === "Hello Lynsey");

        //use an arrow function to capture this when the function is created
        //notice that 'this' is of type any - we'll fix this next
        let objB = {
            name: "Erik",
            createHelloFunc() {
                return () => {
                    //everything in here is of type any
                    return this.name ? `Hello ${this.name}` : "no name";
                };
            }
        };

        assert(objB.createHelloFunc()() === "Hello Erik");

        //fixing this: any
        //https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters
        interface NameGenerator {
            name: string;
            createHelloFunc: () => () => string;
        }

        let objC: NameGenerator = {
            name: "Erik",
            createHelloFunc(this: NameGenerator) {
                return () => {
                    //everything here has a type
                    return this.name ? `Hello ${this.name}` : "no name";
                };
            }
        };
    })();

    //https://www.typescriptlang.org/docs/handbook/functions.html#overloads
    (function functionOverloading() {
        interface Something {
            name: string;
        }

        //different inputs - different returns
        //You put the most specific at the top
        function getPerson(x: Something): number;
        function getPerson(x: string): string;
        function getPerson(x: any): any {
            if (typeof x === "object") {
                return 4;
            } else {
                return "erik";
            }
        }

        //the compiler will understand someNum to be a number
        let someNum = getPerson({ name: "Erik" });
        assert(someNum === 4);
        assert(getPerson("Erik") === "erik");

        //getPerson({ age: 42 }); //nope
    })();
}
