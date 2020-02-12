import { assert } from "../Utils/asserts";

export function course() {
    type Person = {
        name: string;
        age: number;
    };

    function getPerson(): Person {
        return {
            name: "Erik",
            age: 43
        };
    }

    //The ! means that we are telling compiler that this will never be null
    //Then we are type casting to Person (even this could have been inferred)
    const erik = getPerson()! as Person;

    assert(erik.age === 43);
}
