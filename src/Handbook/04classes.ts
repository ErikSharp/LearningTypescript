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
            private readonly cantChange = true;
            protected readonly onlyConstructor: boolean;
            readonly publicImmutable = true;

            //Automatic creation of properties with a default in the constructor
            //A class with a protected constructor means that the class is abstract
            protected constructor(public quickAndEasy: boolean = true) {
                this.weight = 5;
                // this.cantChange = false; //cannot as was already set
                this.onlyConstructor = true;
                let canOnlyReadHere = this.cantChange;
            }
        }

        class Dog extends Animal {
            constructor(private readonly privateReadonly: boolean) {
                super();
            }

            print() {
                assert(this.name === "Ada");
                assert(this.color === "grey");
                assert(this.onlyConstructor);
                assert(this.privateReadonly);
            }
        }

        // let dog = new Animal(); //cannot instantiate as the constructor in protected
        let dog = new Dog(true);
        dog.name = "Ada";
        // dog.publicImmutable = false; //readonly
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

    //ECMAScript 3 is not supported
    (function accessors() {
        const fullNameMaxLength = 10;

        class Employee {
            private _fullName: string;
            getCount = 0;
            private _age = 43;

            //since there is no setter, this is readonly
            get age(): number {
                return this._age;
            }

            get fullName(): string {
                this.getCount++;
                return this._fullName;
            }

            set fullName(newName: string) {
                if (newName && newName.length > fullNameMaxLength) {
                    throw new Error("Too big");
                }

                this._fullName = newName;
            }
        }

        let employee = new Employee();
        let errorThrown = false;

        try {
            employee.fullName = "Biggus Dickus";
        } catch (error) {
            errorThrown = true;
            assert(error.message === "Too big");
        }

        assert(errorThrown);

        if (!employee.fullName) {
            employee.fullName = "Brian";
        }
        assert(employee.fullName === "Brian");
        assert(employee.getCount === 2);

        // employee.age = 42; //compiler says no
    })();

    (function staticStuff() {
        class SomeClass {
            static someValue: string;

            private constructor() {}

            static factory() {
                return new SomeClass();
            }
        }

        SomeClass.someValue = "As you wish";
        // let foo = new SomeClass(); //nope
        let foo = SomeClass.factory();
    })();

    (function abstractClasses() {
        abstract class SomeOfIt {
            getAge(): number {
                return 43;
            }

            abstract getName(): string; //you have to implement this
        }

        class TheRestOfIt extends SomeOfIt {
            getName() {
                return "Erik";
            }
        }

        // let foo = new SomeOfIt(); //nope
        let foo = new TheRestOfIt();
        assert(foo.getAge() === 43);
        assert(foo.getName() === "Erik");
    })();
}
