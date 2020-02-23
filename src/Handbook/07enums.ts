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
}
