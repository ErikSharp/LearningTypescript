import { assert } from "../utils/asserts";

export function generics() {
    (function identityFunction() {
        function identity<T>(arg: T): T {
            return arg;
        }

        //using the type argument
        let someNum = identity<number>(4);
        //now the shorthand with inference
        let someString = identity("erik");

        //at runtime the types are checked
        assert(typeof someNum === "number");
        assert(typeof someString === "string");

        function add5(x: number) {
            return x + 5;
        }

        add5(someNum);
        // add5(someString); //nope
    })();

    (function moreSpecificTyping() {
        //we are constraining it to an array
        function getLength<T>(arg: T[]): number {
            return arg.length;
        }

        assert(getLength("erik".split("")) === 4);
        assert(getLength([1, 2, 3]) === 3);
    })();

    (function specifyGenericTypes() {
        function identity<T>(arg: T): T {
            return arg;
        }

        let alias: <U>(foo: U) => U;
        alias = identity;

        //We can also write the generic type as a call signature of an object literal type:
        //This is similar to how we can describe functions with interfaces
        let alias2: { <T>(bar: T): T };
        alias2 = identity;
    })();

    (function genericInterfaces() {
        interface GenericIdentityFunc {
            <T>(arg: T): T;
        }

        interface GenericInInterfaceTop<T> {
            (arg: T): T;
        }

        function identity<T>(arg: T): T {
            return arg;
        }

        let alias: GenericIdentityFunc = identity;

        //Here we have to lock in the type
        let alias2: GenericInInterfaceTop<number> = identity;

        alias2(3); //only works with numbers
        // alias2('nope'); //nope
    })();

    //https://www.typescriptlang.org/docs/handbook/generics.html#generic-classes
    (function genericClasses() {
        //generic classes are only generic on their instance side
        class GenericNumber<T> {
            //static someStatic: T; //nope, statics cannot be generic
            _zeroValue: T;
            add: (x: T, y: T) => T;

            set zeroValue(val: T) {
                this._zeroValue = val;
            }
        }

        let myGenericNumberObj = new GenericNumber<number>();
        myGenericNumberObj.zeroValue = 0;
        myGenericNumberObj.add = (x, y) => x + y;
        assert(myGenericNumberObj.add(5, 4) === 9);

        let myGenericNumberObj2 = new GenericNumber<string>();
        myGenericNumberObj2.zeroValue = "";
        myGenericNumberObj2.add = (x, y) => x + y;
        assert(myGenericNumberObj2.add("foo", "bar") === "foobar");

        interface NameAge {
            name: string;
            age: number;
        }

        let myGenericNumberObj3 = new GenericNumber<NameAge>();
        myGenericNumberObj3.zeroValue = null;
        myGenericNumberObj3.add = (a, b) => {
            return {
                name: `${a.name} - ${b.name}`,
                age: a.age + b.age
            };
        };
        let result = myGenericNumberObj3.add(
            { name: "Erik", age: 43 },
            { name: "Lynsey", age: 39 }
        );

        assert(result.name === "Erik - Lynsey");
        assert(result.age === 82);
    })();

    //https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints
    (function genericConstraints() {
        interface Lengthwise {
            length: number;
        }

        class Vector2d {
            constructor(private horizontal: number, private vertical: number) {}

            get length(): number {
                return Math.sqrt(
                    Math.pow(this.horizontal, 2) + Math.pow(this.vertical, 2)
                );
            }
        }

        function getLengthSquared<T extends Lengthwise>(arg: T): number {
            return arg.length * arg.length;
        }

        //anything with length
        assert(getLengthSquared([1, 2]) === 4);
        let vector = new Vector2d(2, 3);
        let vectorSquared = getLengthSquared(vector);
        assert(Math.ceil(vectorSquared) === 13);
        assert(getLengthSquared("erik") === 16);
    })();

    (function typeParamsInGenericConstraints() {
        function getProperty<T, K extends keyof T>(obj: T, key: K) {
            return obj[key];
        }

        let someObj = {
            name: "Erik",
            age: 43
        };

        //notice that we even have intellisense on name and age - that's rad
        assert(getProperty(someObj, "name") === "Erik");
        //getProperty(someObj, "foo"); //nope - compiler picks it in design time
    })();

    (function genericFactory() {
        function create<T>(c: { new (): T }): T {
            return new c();
        }

        class Person {
            name = "Erik";
        }

        assert(create(Person).name === "Erik");
    })();

    (function coolExample() {
        class BeeKeeper {
            hasMask = true;
        }

        class ZooKeeper {
            nametag = "Joe";
        }

        class Animal {
            numLegs: number;
        }

        class Bee extends Animal {
            keeper = new BeeKeeper();
        }

        class Lion extends Animal {
            keeper = new ZooKeeper();
        }

        function createInstance<A extends Animal>(c: new () => A): A {
            return new c();
        }

        //typing all the way through!!
        assert(createInstance(Lion).keeper.nametag === "Joe");
        assert(createInstance(Bee).keeper.hasMask);
    })();
}
