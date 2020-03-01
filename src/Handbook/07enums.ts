import { assert } from "../utils/asserts";

//https://www.typescriptlang.org/docs/handbook/enums.html
export function enums() {
    (function numericEnums() {
        //can set the start or is zero by default
        enum Direction {
            Up = 1,
            Down,
            Left,
            Right
        }

        assert(Direction.Down === 2);

        interface Coordinates {
            x: number;
            y: number;
        }

        function moveDirection(
            coords: Coordinates,
            distance: number,
            direction: Direction
        ): Coordinates {
            switch (direction) {
                case Direction.Up:
                    coords.y -= distance;
                    break;
                case Direction.Down:
                    coords.y += distance;
                    break;
                case Direction.Left:
                    coords.x -= distance;
                    break;
                case Direction.Right:
                    coords.x += distance;
                    break;
            }

            return coords;
        }

        let result = moveDirection({ x: 1, y: 2 }, 2, Direction.Right);
        assert(result.x === 3 && result.y === 2);
    })();

    (function initializeValues() {
        enum E {
            B = getValue(),
            //because the value above isn't already initialized, those that come after
            //must have their values set - you can't take away the 1
            A = 1
        }

        function getValue() {
            return 2;
        }

        assert(E.B === 2);
    })();

    (function stringEnums() {
        //these are helpful when you are debugging as there will a name that you will understand
        enum Direction {
            Up = "UP",
            Down = "DOWN",
            Left = "LEFT",
            Right = "RIGHT"
        }

        function goSomewhere(direction: Direction) {
            //if you break here you'll have a name and not a number
            return 4;
        }

        goSomewhere(Direction.Right);
    })();

    (function computedEnums() {
        //these constant expressions are all evaluated at compile time
        enum Bits {
            One = 1,
            Two = 1 << 1,
            Three = 3,
            Four = 1 << 2,
            Seven = One | Two | Four,
            Eight = 1 << 3
        }

        let num = Bits.Seven;

        enum PostCodeLengths {
            UK = "RG22 5BY".length,
            USA = "92104".length
        }

        function getLocation(postCode: string) {
            switch (postCode.length) {
                case PostCodeLengths.UK:
                    return "UK";
                case PostCodeLengths.USA:
                    return "USA";
                default:
                    return "Unknown";
            }
        }

        assert(getLocation("92342") === "USA");
    })();

    (function memberTypes() {
        //These are enum members that become their own types!
        //notice that there is no intialization
        //none must be initialized
        enum ShapeKind {
            Circle,
            Square
        }

        interface Circle {
            kind: ShapeKind.Circle;
            radius: number;
        }

        interface Square {
            kind: ShapeKind.Square;
            sideLength: number;
        }

        let c: Circle = {
            //This cannot be Square here
            kind: ShapeKind.Circle,
            radius: 100
        };
    })();

    (function unionTypes() {
        enum E {
            Foo,
            Bar
        }

        function f(x: E) {
            //Typescript knows that this isn't possible as the types have no overlop
            // if (x !== E.Foo || x !== E.Bar) {
            // }
        }
    })();

    (function enumsAtRuntime() {
        enum E {
            X,
            Y,
            Z
        }

        function f(obj: { X: number }) {
            return obj.X;
        }

        assert(typeof E === "object");
        assert(f(E) === 0);
    })();

    (function enumsAtCompileTime() {
        enum LogLevel {
            Debug,
            Info,
            Warn,
            Error
        }

        /*
        This is equivalent to:
        type LogLevelStrings = 'Debug' | 'Info' | 'Warn' | 'Error'
        */
        type LogLevelStrings = keyof typeof LogLevel;

        function printImportant(key: LogLevelStrings, message: string) {
            const num = LogLevel[key];

            if (num >= LogLevel.Warn) {
                return {
                    key: `Log level key is: ${key}`,
                    num: `Log level value is: ${num}`,
                    message: `Log level message is: ${message}`
                };
            }
        }

        // printImportant("Erik", "asdf"); //nope, compiler knows that this string wont work
        let result = printImportant("Warn", "This is my turf");
        assert(result.key === "Log level key is: Warn");
        assert(result.num === "Log level value is: 2");
        assert(result.message === "Log level message is: This is my turf");
    })();

    (function reverseMapping() {
        enum Foo {
            A
        }

        let a = Foo.A;
        assert(Foo[a] === "A");
    })();

    (function constEnums() {
        //const enums are inlined and so they are faster
        //they don't have the additional indirection
        const enum Direction {
            Up,
            Down,
            Left,
            Right
        }

        let value = Direction.Left;
        assert(typeof value !== "object");
        assert(typeof value === "number");
        assert(value === 2);
    })();
}
