import { assert } from "../../utils/asserts.js";

export function basicTypes() {
    //numbers
    {
        let decimal: number = 6;
        let hex: number = 0xf00d;
        let binary: number = 0b1010;
        let octal: number = 0o744;
    }

    //strings
    {
        let color: string = "orange";
        let name = "Erik"; //implicitely picked up the type
        let favoriteColor = `${name}'s favorite color is ${color}`;
        assert(favoriteColor === "Erik's favorite color is orange");
    }

    //arrays
    {
        let list: number[] = [1, 2, 3];
        let letters: string[] = ["a", "b", "c"];
        let alternate: Array<string> = ["a", "b", "c"];
        let differentStuff: any[] = [1, true, "what?"];
        assert(differentStuff[0] === 1);
        differentStuff[0] = false;
        assert(!differentStuff[0]);
    }

    //tuples
    {
        // defined as an array with a fixed number of elements that don't all have to be the same type
        let person: [string, number];
        person = ["Erik", 43];
        assert(person[0] === "Erik");
        //assert(person[2] === undefined); //just detects a static issue, but it works
    }

    //enums
    {
        //starts numbering from zero
        enum Color {
            Red,
            Green,
            Blue
        }
        let c: Color = Color.Green;
        assert(c === 1);

        //you can set the values
        enum CountryCodes {
            UK = 44,
            USA = 1,
            Austria = 43,
            Bermuda = 809
        }

        let code: CountryCodes = CountryCodes.Bermuda;
        assert(code === 809);
        assert(CountryCodes[809] === "Bermuda");

        //set the starting number
        enum Alphabet {
            A = 1,
            B,
            C,
            D,
            E
        }

        assert(Alphabet.B === 2);
    }

    //any
    {
        let notSure: any = 4;
        notSure.toFixed(4); //This might error at runtime if the type was not a number
        notSure = "Some different type";
        notSure = false;
        assert(!notSure);
    }

    //void
    {
        function action(): void {
            console.log("I return nothing");
        }
    }

    //never
    {
        function error(message: string): never {
            throw new Error(message);
        }

        // Inferred return type is never
        function fail() {
            return error("boom!");
        }

        function neverEnds(): never {
            while (true) {
                console.log("This is the song that doesn't end...");
            }
        }
    }
}
