import { assert } from "../utils/asserts";

// https://www.typescriptlang.org/docs/handbook/classes.html
export function classes() {
    (function simpleClases() {
        class Greeter {
            greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }
            greet() {
                return `Hello ${this.greeting}`;
            }
        }

        let greeter = new Greeter("World");
        assert(greeter.greet() === "Hello World");
        //properies are public by default
        assert(greeter.greeting === "World");
    })();

    (function inheritance() {
        class Animal {
            weight: number;
        }

        class Dog extends Animal {
            getBreed() {
                return "Whippet";
            }
        }

        //You should be careful using const here as it makes you think that ada in immutable which it is not
        const ada = new Dog();
        //ada = new Dog(); //this is the only thing that const prevents us from doing
        ada.weight = 40;
        assert(ada.weight === 40);
        assert(ada.getBreed() === "Whippet");
    })();

    (function inheritanceDetails() {
        class Animal {
            name: string;
            constructor(theName: string) {
                this.name = theName;
            }
            getMoveString(distance: number = 0, moveType: string) {
                //notice that the call to getFullName goes to the method override
                return `${this.getFullName()} ${moveType} ${distance} meters`;
            }
            getFullName() {
                return this.name;
            }
        }

        class Snake extends Animal {
            poisoinous: boolean;
            //Since Snake has a constructor it must call super
            constructor(name: string) {
                // this.poisoinous = true; //cannot use this until after calling super
                super(name);
                this.poisoinous = false;
            }
            getMoveString(distance: number = 2) {
                return super.getMoveString(distance, "slithered");
            }
            //this method is overriding the base
            getFullName() {
                return `${super.getFullName()} the ${
                    this.poisoinous ? "poisonous" : "happy"
                } snake`;
            }
        }

        let sammy = new Snake("Sammy");
        assert(
            sammy.getMoveString() === "Sammy the happy snake slithered 2 meters"
        );
    })();

    (function modifiers() {
        class Animal {
            name: string; //public by default
            // #weight: number; //Typescript 3.8 will support the JavaScript private field syntax (prefex #)
            private weight: number;
            protected color = "grey";

            //Automatic creation of properties with a default in the constructor
            //A class with a protected constructor means that the class is abstract
            protected constructor(public quickAndEasy: boolean = true) {
                this.weight = 5;
            }
        }

        class Dog extends Animal {
            constructor() {
                super();
            }

            print() {
                assert(this.name === "Ada");
                assert(this.color === "grey");
            }
        }

        // let dog = new Animal(); //cannot instantiate as the constructor in protected
        let dog = new Dog();
        dog.name = "Ada";
        assert(dog.name === "Ada");
        //dog.weight = 2; //cannot access
        assert(dog.quickAndEasy);
    })();

    (function typeScriptIsStructural() {
        class Animal {
            constructor(public name: string) {}
        }
        class Employee {
            name: string;
        }

        let fido = new Animal("Fido");
        let jim: Employee;
        jim = fido; //WTF?!
        //This demonstrates that TypeScript checks the structure to determine if types are compatible
        //and in this case they are
        assert(jim.name === "Fido");
    })();
}
